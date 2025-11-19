import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForfeitedAssetsService } from './forfeited-assets.service';
import { CreateForfeitedAssetDto } from './dto/create-forfeited-asset.dto';
import { UpdateForfeitedAssetDto } from './dto/update-forfeited-asset.dto';

@Controller('forfeited-assets')
export class ForfeitedAssetsController {
  constructor(private readonly forfeitedAssetsService: ForfeitedAssetsService) {}

  @Post()
  create(@Body() createForfeitedAssetDto: CreateForfeitedAssetDto) {
    return this.forfeitedAssetsService.create(createForfeitedAssetDto);
  }

  @Get()
  findAll() {
    return this.forfeitedAssetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forfeitedAssetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForfeitedAssetDto: UpdateForfeitedAssetDto) {
    return this.forfeitedAssetsService.update(+id, updateForfeitedAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forfeitedAssetsService.remove(+id);
  }
}
