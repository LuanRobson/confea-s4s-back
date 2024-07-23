import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { HealthModule } from './modules/health/health.module';
import { ProfessionalTittleModule } from './modules/professional-title/professional-tittle.module';
import { TosModule } from './modules/tos/tos.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ChatbotModule, ProfessionalTittleModule, TosModule, HealthModule],
  providers: [PrismaService]
})
export class AppModule { }