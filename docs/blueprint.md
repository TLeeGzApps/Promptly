# **App Name**: Promptly

## Core Features:

- Prompt Generation: Guided prompt builder that generates model-optimized prompts using defined goals, roles, constraints, output formats, and optional few-shot examples. Optimized per selected AI model ruleset.
- Plain Text to Prompt Conversion: Transforms unstructured plain-text intent into structured, model-specific prompts with explicit role instructions, task definitions, constraints, and output formatting.
- Prompt Translation: Translates prompts between different AI models (e.g., OpenAI ↔ Anthropic ↔ Gemini ↔ Universal format), preserving intent while applying provider-specific conventions.
- Text Paraphrasing: Supports Basic, Advanced, and Complex paraphrasing modes. Adapts output to selected AI models while preserving or enhancing tone, with optional length control (shorter / same / expanded).
- Prompt Scoring & Analysis: Evaluates prompt and paraphrase quality based on: Semantic clarity, Ambiguity detection, Missing constraints, Token efficiency, Model compatibility. Returns numeric scores and human-readable improvement suggestions using an LLM as an analysis tool.
- User Authentication: Secure user accounts via Firebase Authentication with: Email/password, OAuth providers (Google, GitHub), Plan-aware feature access
- Data Storage & Versioning: Stores prompts, paraphrases, versions, scores, and user metadata in Firestore with: Timestamps, Version history, Secure, role-based access rules

## Style Guidelines:

- App background: #0A0B0E
- Section background: #0F1116
- Cards / panels: #141821
- Hover / elevated surfaces: #1B2030
- Subtle borders only: #23293A
- Primary text: #E6E9F2
- Secondary text: #B7BDD1
- Muted / metadata: #7F869E
- Disabled text: #4C5165
- Primary accent (actions, links): #4FD1C5 (cold cyan / teal)
- Secondary accent (focus states): #6B7CFF (indigo)
- Success: #5DE4A2
- Warning: #F6C177
- Error: #FF6B6B
- Primary UI Font: Inter (sans-serif) - Used for: Headings, Body text, Forms, Navigation. Chosen for high legibility and neutral, professional tone
- Monospace / Prompt Editor Font: JetBrains Mono - Used for: Prompt editors, Paraphrase outputs, Translation views, Scoring diagnostics. Ensures clear character distinction and comfort for dense text
- Headings: 16–24px, weight 600
- Body text: 14–15px, weight 400
- Small / metadata: 12–13px
- Code / prompt text: 13–14px
- Line height: Body: ~1.55
- Line height: Code / prompts: ~1.6
- Desktop-first, responsive layout
- Grid-based alignment for consistency
- Cards and panels use background contrast + shadow, not borders
- Prompt editors should feel like private terminals, not forms
- Diff views for paraphrasing and translation should use clear visual separation
- Minimalist icons with thin strokes
- Neutral, functional iconography
- Avoid decorative icons
- Subtle and purposeful only: Hover state transitions, Loading indicators, State changes (success / error)
- No flashy motion; prioritize smoothness and clarity