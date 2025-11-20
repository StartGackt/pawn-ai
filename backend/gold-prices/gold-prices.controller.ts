import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GoldPricesService } from './gold-prices.service';
import { CreateGoldPriceDto } from './dto/create-gold-price.dto';
import { UpdateGoldPriceDto } from './dto/update-gold-price.dto';

@ApiTags('gold-prices')
@Controller('gold-prices')
export class GoldPricesController {
  constructor(private readonly goldPricesService: GoldPricesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gold price record' })
  @ApiResponse({ status: 201, description: 'Gold price record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createGoldPriceDto: CreateGoldPriceDto) {
    return this.goldPricesService.create(createGoldPriceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all gold price records' })
  @ApiResponse({ status: 200, description: 'Return all gold price records' })
  findAll() {
    return this.goldPricesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a gold price record by ID' })
  @ApiParam({ name: 'id', description: 'Gold price record ID' })
  @ApiResponse({ status: 200, description: 'Return the gold price record' })
  @ApiResponse({ status: 404, description: 'Gold price record not found' })
  findOne(@Param('id') id: string) {
    return this.goldPricesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a gold price record' })
  @ApiParam({ name: 'id', description: 'Gold price record ID' })
  @ApiResponse({ status: 200, description: 'Gold price record updated successfully' })
  @ApiResponse({ status: 404, description: 'Gold price record not found' })
  update(@Param('id') id: string, @Body() updateGoldPriceDto: UpdateGoldPriceDto) {
    return this.goldPricesService.update(+id, updateGoldPriceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gold price record' })
  @ApiParam({ name: 'id', description: 'Gold price record ID' })
  @ApiResponse({ status: 200, description: 'Gold price record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Gold price record not found' })
  remove(@Param('id') id: string) {
    return this.goldPricesService.remove(+id);
  }
}
