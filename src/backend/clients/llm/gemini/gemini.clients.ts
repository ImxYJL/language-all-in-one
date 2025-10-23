import 'server-only';

import { serverEnv } from '@/validators/env';
import { UpstreamError } from '@/backend/error';
import { BaseLlm, ChatMessage, LlmChatOption, LlmConstructorOption } from '../baseLlm';
import { Content, GoogleGenAI } from '@google/genai';
import { PROMPT, GEMINI_MODEL } from './gemini.constants';

export class GeminiLlm extends BaseLlm {
  private llm: GoogleGenAI;

  constructor(apiKey: string, modelName: string = GEMINI_MODEL, options?: LlmConstructorOption) {
    super(apiKey, modelName, options);
    this.llm = new GoogleGenAI({ apiKey });
  }

  /**
   * BaseLlm이 추상화한 채팅 메세지 타입을 Gemini가 요구하는 Content[]로 변환
   */
  private convertToGeminiMessages(messages: ChatMessage[]): Content[] {
    return messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
  }

  public async *chat(messages: ChatMessage[], options?: LlmChatOption): AsyncIterable<string> {
    const combinedPrompt = [
      this.basePrompt, // 공통 (인스턴스 생성 시)
      options?.chatPrompt, // 채팅방 (chat 호출 시)
    ]
      .filter(Boolean) // null, undefined, 빈 문자열 제거
      .join('\n\n'); // 프롬프트 사이에 공백 추가

    const systemInstruction = combinedPrompt ? { role: 'user' as const, parts: [{ text: combinedPrompt }] } : undefined;
    const contents = this.convertToGeminiMessages(messages);

    try {
      const result = await this.llm.models.generateContentStream({
        model: this.modelName,
        contents: contents,
        config: {
          systemInstruction,
        },
      });

      for await (const chunk of result) {
        const text = chunk.text;

        if (text) yield text;
      }
    } catch (error) {
      console.error('Error during Gemini stream generation:', error);

      if (error instanceof Error) {
        throw new UpstreamError(502, 'Gemini API', `Gemini API stream failed: ${error.message}`, error.stack);
      }

      throw new UpstreamError(500, 'Gemini API', 'An unknown error occurred in GeminiLlm');
    }
  }
}

export const llm: BaseLlm = new GeminiLlm(serverEnv.GEMINI_API_KEY, GEMINI_MODEL, {
  basePrompt: PROMPT.base,
});
