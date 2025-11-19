import { Module } from '@nestjs/common';
import { WebsocGateway } from './websoc/websoc.gateway';

@Module({
  providers: [WebsocGateway]
})
export class WebsocketModule {}
