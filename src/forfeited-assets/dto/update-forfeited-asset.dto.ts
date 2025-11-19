import { PartialType } from '@nestjs/mapped-types';
import { CreateForfeitedAssetDto } from './create-forfeited-asset.dto';

export class UpdateForfeitedAssetDto extends PartialType(CreateForfeitedAssetDto) {}
