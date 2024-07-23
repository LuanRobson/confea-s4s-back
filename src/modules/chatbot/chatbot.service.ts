import { Injectable } from '@nestjs/common';
import { ClientOptions, OpenAI } from 'openai';
import { sleep } from 'openai/core';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { CUSTOM_MODEL_ID, OPENAI_API_KEY } from 'src/constants/environment';
import { logger } from 'src/helpers/logger';
import { chatbotPrompt } from 'src/utils/chatbotPrompt';

const configuration: ClientOptions = {
  apiKey: OPENAI_API_KEY,
}
export const openai = new OpenAI(configuration)
const CUSTOM_MODEL = CUSTOM_MODEL_ID

@Injectable()
export class ChatbotService {
  async suggestion({ message }: { message: string }) {
    const result = await this.descriptionSuggestion(
      [
        { role: 'system', content: chatbotPrompt.systemGreeting },
        { role: 'user', content: message },
      ]
    )

    return result.choices[0].message.content
  }

  async descriptionSuggestion(
    messages: ChatCompletionMessageParam[],
  ): Promise<ChatCompletion> {
    try {
      const completion = await openai.chat.completions.create({
        model: CUSTOM_MODEL,
        temperature: 0.2,
        max_tokens: 256,
        messages,
      })
      return completion
    } catch (error) {
      logger.error(error)
      if (error?.code === 'rate_limit_exceeded') {
        logger.debug('⚠️ Rate limit exceeded')
        logger.debug('🕐 Waiting for 25 seconds and running again')
        await sleep(25 * 1000)
        logger.debug('🏃‍♀️ running again')
      }
      throw error
    }
  }
}