import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PawnsService } from './pawns.service';
import { CreatePawnDto } from './dto/create-pawn.dto';
import { UpdatePawnDto } from './dto/update-pawn.dto';

@Controller('pawns')
export class PawnsController {
  constructor(private readonly pawnsService: PawnsService) {}

  @Post()
  create(@Body() createPawnDto: CreatePawnDto) {
    return this.pawnsService.create(createPawnDto);
  }

  @Get()
  findAll() {
    return this.pawnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pawnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePawnDto: UpdatePawnDto) {
    return this.pawnsService.update(+id, updatePawnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pawnsService.remove(+id);
  }
}
