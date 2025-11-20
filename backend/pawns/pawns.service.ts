import { Injectable } from '@nestjs/common';
import { CreatePawnDto } from './dto/create-pawn.dto';
import { UpdatePawnDto } from './dto/update-pawn.dto';

@Injectable()
export class PawnsService {
  create(createPawnDto: CreatePawnDto) {
    return 'This action adds a new pawn';
  }

  findAll() {
    return `This action returns all pawns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pawn`;
  }

  update(id: number, updatePawnDto: UpdatePawnDto) {
    return `This action updates a #${id} pawn`;
  }

  remove(id: number) {
    return `This action removes a #${id} pawn`;
  }
}
