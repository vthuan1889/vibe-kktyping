import fs from 'fs';

interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  modelId?: string;
}

/**
 * ElevenLabs Text-to-Speech API client
 * Generates MP3 audio from text using specified voice
 */
export class ElevenLabsClient {
  private apiKey: string;
  private voiceId: string;
  private modelId: string;

  constructor(config: ElevenLabsConfig) {
    this.apiKey = config.apiKey;
    this.voiceId = config.voiceId;
    this.modelId = config.modelId || 'eleven_monolingual_v1';
  }

  async generateAudio(text: string, outputPath: string): Promise<void> {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: this.modelId,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
  }
}
