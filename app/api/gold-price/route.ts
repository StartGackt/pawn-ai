import { NextResponse } from "next/server";

interface ApiResponse {
  status: string;
  response: {
    date: string;
    update_time: string;
    price: {
      gold: { buy: string; sell: string };
      gold_bar: { buy: string; sell: string };
      change: { compare_previous: string; compare_yesterday: string };
    };
  };
}

export interface GoldPriceData {
  date: string;
  updateTime: string;
  data: {
    name: string;
    buy: string;
    sell: string;
  }[];
}

export async function GET() {
  try {
    const response = await fetch("https://api.chnwt.dev/thai-gold-api/latest", {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch gold price");
    }

    const apiData: ApiResponse = await response.json();

    // Transform the API response to match our expected format
    const data: GoldPriceData = {
      date: apiData.response.date,
      updateTime: apiData.response.update_time,
      data: [
        {
          name: "ทองคำแท่ง 96.5%",
          buy: apiData.response.price.gold_bar.buy,
          sell: apiData.response.price.gold_bar.sell,
        },
        {
          name: "ทองรูปพรรณ 96.5%",
          buy: apiData.response.price.gold.buy,
          sell: apiData.response.price.gold.sell,
        },
      ],
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return NextResponse.json(
      { error: "Failed to fetch gold price" },
      { status: 500 }
    );
  }
}
