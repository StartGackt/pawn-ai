import { Injectable } from '@nestjs/common';
import { CreateForfeitedAssetDto } from './dto/create-forfeited-asset.dto';
import { UpdateForfeitedAssetDto } from './dto/update-forfeited-asset.dto';

@Injectable()
export class ForfeitedAssetsService {
  create(createForfeitedAssetDto: CreateForfeitedAssetDto) {
    return 'This action adds a new forfeitedAsset';
  }

  findAll() {
    return `This action returns all forfeitedAssets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forfeitedAsset`;
  }

  update(id: number, updateForfeitedAssetDto: UpdateForfeitedAssetDto) {
    return `This action updates a #${id} forfeitedAsset`;
  }

  remove(id: number) {
    return `This action removes a #${id} forfeitedAsset`;
  }
}
