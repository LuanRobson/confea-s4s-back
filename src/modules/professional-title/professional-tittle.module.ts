import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProfessionalTittleController } from './professional-tittle.controller';
import { ProfessionalTittleService } from './professional-tittle.service';

@Module({
  controllers: [ProfessionalTittleController],
  providers: [ProfessionalTittleService, PrismaService],
})
export class ProfessionalTittleModule { }