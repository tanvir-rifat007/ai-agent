import { openai } from './ai.js'

export const runLLM = async (messages) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
  })

  return response.choices[0].message.content
}
