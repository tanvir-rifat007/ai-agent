import { z } from 'zod'
import { runAgent } from './agent.js'
import { runLLM } from './llm.js'
import { addMessages, getMessages } from './memory.js'
import { tools } from './tools/index.js'

const args = process.argv[2]

if (!args) {
  console.error('Please provide a prompt')
  process.exit(1)
}

;(async () => {
  await runAgent({ userMessage: args, tools: tools })
})()
