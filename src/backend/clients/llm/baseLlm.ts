export type ChatRole = 'user' | 'model';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type LlmConstructorOption = {
  basePrompt?: string;
};

export type LlmChatOption = {
  chatPrompt?: string;
};

export abstract class BaseLlm {
  protected readonly apiKey: string;
  protected readonly modelName: string;
  protected readonly basePrompt: string | undefined;

  constructor(apiKey: string, modelName: string, options?: LlmConstructorOption) {
    if (!apiKey) throw new Error('API key is required.');

    this.apiKey = apiKey;
    this.modelName = modelName;

    this.basePrompt = options?.basePrompt;
  }

  public abstract chat(messages: ChatMessage[], options?: LlmChatOption): AsyncIterable<string>;
}
