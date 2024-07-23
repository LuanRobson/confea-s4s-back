import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TosController } from './tos.controller';
import { TosService } from './tos.service';

@Module({
  controllers: [TosController],
  providers: [TosService, PrismaService],
})
export class TosModule { }