import { PartialType } from '@nestjs/mapped-types';
import { CreatePawnDto } from './create-pawn.dto';

export class UpdatePawnDto extends PartialType(CreatePawnDto) {}
