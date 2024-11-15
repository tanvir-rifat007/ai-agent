import { z } from 'zod'
import { runAgent } from './agent.js'
import { runLLM } from './llm.js'
import { addMessages, getMessages } from './memory.js'

const args = process.argv[2]

if (!args) {
  console.error('Please provide a prompt')
  process.exit(1)
}

;(async () => {
  const weatherTool = {
    name: 'get_weather',
    description: 'Get the weather for a location',
    parameters: z.object({
      reasoning: z.string().describe('why did you pick this tool?'),
    }),
  }

  await runAgent({ userMessage: args, tools: [weatherTool] })
})()
