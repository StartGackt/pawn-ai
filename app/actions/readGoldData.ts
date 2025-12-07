'use server';

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface GoldDataRow {
  [key: string]: string | number | null;
}

export async function getGoldDataFromExcel(): Promise<GoldDataRow[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'ราคาทองประจำปี68.xlsx');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return [];
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer', cellDates: false });

    // Get the first sheet name or a specific sheet if known
    // The user mentioned "sheet New", let's try to find that or default to first
    let sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('new'));
    if (!sheetName) {
      sheetName = workbook.SheetNames[0];
    }
    
    console.log(`Reading sheet: ${sheetName}`);

    const worksheet = workbook.Sheets[sheetName];
    // Use raw: true to get raw values (numbers for dates), defval for empty cells
    const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { 
      raw: true, 
      defval: null 
    });
    
    // Convert all values to plain serializable types (string | number | null)
    const serializedData: GoldDataRow[] = jsonData.map(row => {
      const plainRow: GoldDataRow = {};
      for (const [key, value] of Object.entries(row)) {
        if (value === null || value === undefined) {
          plainRow[key] = null;
        } else if (typeof value === 'string' || typeof value === 'number') {
          plainRow[key] = value;
        } else if (typeof value === 'boolean') {
          plainRow[key] = value ? 1 : 0;
        } else {
          // For any object (including Date), convert to string
          plainRow[key] = String(value);
        }
      }
      return plainRow;
    });
    
    return serializedData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
}
