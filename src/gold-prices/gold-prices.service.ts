import { Injectable } from '@nestjs/common';
import { CreateGoldPriceDto } from './dto/create-gold-price.dto';
import { UpdateGoldPriceDto } from './dto/update-gold-price.dto';

@Injectable()
export class GoldPricesService {
  create(createGoldPriceDto: CreateGoldPriceDto) {
    return 'This action adds a new goldPrice';
  }

  findAll() {
    return `This action returns all goldPrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goldPrice`;
  }

  update(id: number, updateGoldPriceDto: UpdateGoldPriceDto) {
    return `This action updates a #${id} goldPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} goldPrice`;
  }
}
