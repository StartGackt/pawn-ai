import { ApiProperty } from '@nestjs/swagger';

export class SpotRateDetailDto {
  @ApiProperty({ example: 'Spot', description: 'Rate period (Spot, 1 Week, 1 Month, etc.)' })
  period: string;

  @ApiProperty({ example: '33.85', description: 'Bid rate' })
  bid: string;

  @ApiProperty({ example: '33.95', description: 'Offer rate' })
  offer: string;
}

export class DataSourceDto {
  @ApiProperty({ example: 'Reuters', description: 'Data source in English' })
  source_of_data_eng: string;

  @ApiProperty({ example: 'รอยเตอร์', description: 'Data source in Thai' })
  source_of_data_th: string;
}

export class RemarkDto {
  @ApiProperty({ 
    example: 'Forward exchange rate can be derived from the addition of spot rate and swap point.',
    description: 'Remark in English' 
  })
  report_remark_eng: string;

  @ApiProperty({ 
    example: 'อัตราแลกเปลี่ยนล่วงหน้าคำนวณได้จากอัตราแลกเปลี่ยนทันที และ SWAP POINT',
    description: 'Remark in Thai' 
  })
  report_remark_th: string;
}

export class DataHeaderDto {
  @ApiProperty({ example: 'Spot Rate and Swap Point', description: 'Report name in English' })
  report_name_eng: string;

  @ApiProperty({ example: 'Spot Rate and Swap Point', description: 'Report name in Thai' })
  report_name_th: string;

  @ApiProperty({ example: '', description: 'Unit of quantity name in English' })
  report_uoq_name_eng: string;

  @ApiProperty({ example: '', description: 'Unit of quantity name in Thai' })
  report_uoq_name_th: string;

  @ApiProperty({ type: [DataSourceDto], description: 'Data sources' })
  report_source_of_data: DataSourceDto[];

  @ApiProperty({ type: [RemarkDto], description: 'Report remarks' })
  report_remark: RemarkDto[];
}

export class SpotRateDataDto {
  @ApiProperty({ type: DataHeaderDto, description: 'Data header information' })
  data_header: DataHeaderDto;

  @ApiProperty({ type: [SpotRateDetailDto], description: 'Spot rate details' })
  data_detail: SpotRateDetailDto[];
}

export class SpotRateResultDto {
  @ApiProperty({ example: 'Spot Rate USD/THB (Percent per annum)', description: 'API name' })
  api: string;

  @ApiProperty({ example: '2024-11-20 16:35:09', description: 'Data timestamp' })
  timestamp: string;

  @ApiProperty({ type: SpotRateDataDto, description: 'Spot rate data' })
  data: SpotRateDataDto;
}

export class SpotRateResponseDto {
  @ApiProperty({ type: SpotRateResultDto, description: 'API result' })
  result: SpotRateResultDto;
}

export class CurrentRateResponseDto {
  @ApiProperty({ example: 33.90, description: 'Current USD/THB exchange rate (average of bid and offer)' })
  rate: number;

  @ApiProperty({ example: '2024-11-20T10:30:00Z', description: 'Timestamp of the rate' })
  timestamp: string;
}
