import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LlmService } from './llm.service';

@ApiTags('llm')
@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}
}
