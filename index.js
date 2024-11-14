import { runLLM } from './llm.js'
import { addMessages, getMessages } from './memory.js'

const args = process.argv[2]

if (!args) {
  console.error('Please provide a prompt')
  process.exit(1)
}

;(async () => {
  // user input added to the message:

  addMessages([{ role: 'user', content: args }])

  const messages = await getMessages()

  const response = await runLLM(messages)

  addMessages([{ role: 'assistant', content: response }])

  console.log(response)
})()
