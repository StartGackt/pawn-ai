import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MlService } from './ml.service';

@ApiTags('ml')
@Controller('ml')
export class MlController {
  constructor(private readonly mlService: MlService) {}
}
