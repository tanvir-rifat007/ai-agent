import { openai } from './ai.js'
import { zodFunction } from 'openai/helpers/zod'
import { systemPrompt } from './systemprompt.js'

export const runLLM = async ({ messages, tools }) => {
  const formattedTools = tools.map(zodFunction)

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}
