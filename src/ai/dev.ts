import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-prompt-quality.ts';
import '@/ai/flows/generate-initial-prompt.ts';
import '@/ai/flows/translate-prompt-between-models.ts';