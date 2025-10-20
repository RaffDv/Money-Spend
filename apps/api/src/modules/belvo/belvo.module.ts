import { Module } from '@nestjs/common';
import { BelvoService } from './belvo.service';
import { BelvoController } from './belvo.controller';

@Module({
  controllers: [BelvoController],
  providers: [BelvoService],
})
export class BelvoModule {}
