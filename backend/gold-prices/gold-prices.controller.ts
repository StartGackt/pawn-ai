import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoldPricesService } from './gold-prices.service';
import { CreateGoldPriceDto } from './dto/create-gold-price.dto';
import { UpdateGoldPriceDto } from './dto/update-gold-price.dto';

@Controller('gold-prices')
export class GoldPricesController {
  constructor(private readonly goldPricesService: GoldPricesService) {}

  @Post()
  create(@Body() createGoldPriceDto: CreateGoldPriceDto) {
    return this.goldPricesService.create(createGoldPriceDto);
  }

  @Get()
  findAll() {
    return this.goldPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goldPricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoldPriceDto: UpdateGoldPriceDto) {
    return this.goldPricesService.update(+id, updateGoldPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goldPricesService.remove(+id);
  }
}
