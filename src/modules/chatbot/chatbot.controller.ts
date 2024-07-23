import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post()
  suggestion(@Body('message') message: string) {
    return this.chatbotService.suggestion({ message })
  }
}