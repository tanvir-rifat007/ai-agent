import { runLLM } from './llm.js'
import { addMessages, getMessages } from './memory.js'
import { showLoader, logMessage } from './ui.js'

export const runAgent = async ({ userMessage, tools }) => {
  // user message
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('Running agent...')

  const messages = await getMessages()

  const response = await runLLM({ messages, tools })

  // agent response
  await addMessages([response])

  logMessage(response)

  loader.stop()
}
