import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ForfeitedAssetsService } from './forfeited-assets.service';
import { CreateForfeitedAssetDto } from './dto/create-forfeited-asset.dto';
import { UpdateForfeitedAssetDto } from './dto/update-forfeited-asset.dto';

@ApiTags('forfeited-assets')
@Controller('forfeited-assets')
export class ForfeitedAssetsController {
  constructor(private readonly forfeitedAssetsService: ForfeitedAssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new forfeited asset record' })
  @ApiResponse({ status: 201, description: 'Forfeited asset record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createForfeitedAssetDto: CreateForfeitedAssetDto) {
    return this.forfeitedAssetsService.create(createForfeitedAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all forfeited asset records' })
  @ApiResponse({ status: 200, description: 'Return all forfeited asset records' })
  findAll() {
    return this.forfeitedAssetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a forfeited asset record by ID' })
  @ApiParam({ name: 'id', description: 'Forfeited asset record ID' })
  @ApiResponse({ status: 200, description: 'Return the forfeited asset record' })
  @ApiResponse({ status: 404, description: 'Forfeited asset record not found' })
  findOne(@Param('id') id: string) {
    return this.forfeitedAssetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a forfeited asset record' })
  @ApiParam({ name: 'id', description: 'Forfeited asset record ID' })
  @ApiResponse({ status: 200, description: 'Forfeited asset record updated successfully' })
  @ApiResponse({ status: 404, description: 'Forfeited asset record not found' })
  update(@Param('id') id: string, @Body() updateForfeitedAssetDto: UpdateForfeitedAssetDto) {
    return this.forfeitedAssetsService.update(+id, updateForfeitedAssetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a forfeited asset record' })
  @ApiParam({ name: 'id', description: 'Forfeited asset record ID' })
  @ApiResponse({ status: 200, description: 'Forfeited asset record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Forfeited asset record not found' })
  remove(@Param('id') id: string) {
    return this.forfeitedAssetsService.remove(+id);
  }
}
