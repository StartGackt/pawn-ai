import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PawnsService } from './pawns.service';
import { CreatePawnDto } from './dto/create-pawn.dto';
import { UpdatePawnDto } from './dto/update-pawn.dto';

@ApiTags('pawns')
@Controller('pawns')
export class PawnsController {
  constructor(private readonly pawnsService: PawnsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pawn transaction' })
  @ApiResponse({ status: 201, description: 'Pawn transaction created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPawnDto: CreatePawnDto) {
    return this.pawnsService.create(createPawnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pawn transactions' })
  @ApiResponse({ status: 200, description: 'Return all pawn transactions' })
  findAll() {
    return this.pawnsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pawn transaction by ID' })
  @ApiParam({ name: 'id', description: 'Pawn transaction ID' })
  @ApiResponse({ status: 200, description: 'Return the pawn transaction' })
  @ApiResponse({ status: 404, description: 'Pawn transaction not found' })
  findOne(@Param('id') id: string) {
    return this.pawnsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pawn transaction' })
  @ApiParam({ name: 'id', description: 'Pawn transaction ID' })
  @ApiResponse({ status: 200, description: 'Pawn transaction updated successfully' })
  @ApiResponse({ status: 404, description: 'Pawn transaction not found' })
  update(@Param('id') id: string, @Body() updatePawnDto: UpdatePawnDto) {
    return this.pawnsService.update(+id, updatePawnDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pawn transaction' })
  @ApiParam({ name: 'id', description: 'Pawn transaction ID' })
  @ApiResponse({ status: 200, description: 'Pawn transaction deleted successfully' })
  @ApiResponse({ status: 404, description: 'Pawn transaction not found' })
  remove(@Param('id') id: string) {
    return this.pawnsService.remove(+id);
  }
}
