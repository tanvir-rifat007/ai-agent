import { runLLM } from './llm.js'
import { addMessages, getMessages, saveToolResponse } from './memory.js'
import { runTool } from './toolRunner.js'
import { showLoader, logMessage } from './ui.js'

export const runAgent = async ({ userMessage, tools }) => {
  // user message
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('Running agent...')

  // agent loop

  while (true) {
    const history = await getMessages()
    const response = await runLLM({ messages: history, tools })

    // assistant message(ai response)
    await addMessages([response])

    // if we get final result from the agent
    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    // if we get a tool call from the agent
    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`executing: ${toolCall.function.name}`)

      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`done: ${toolCall.function.name}`)
    }
  }
}
