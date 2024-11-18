import { dadJoke, dadJokeToolDefinition } from './tools/dadJoke.js'
import {
  generateImage,
  generateImageToolDefinition,
} from './tools/generateImage.js'
import { reddit, redditToolDefinition } from './tools/reddit.js'
import { resumeTool, resumeToolDefinition } from './tools/resume.js'

export const runTool = async (toolCall, userMessage) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input)

    case redditToolDefinition.name:
      return reddit(input)

    case dadJokeToolDefinition.name:
      return dadJoke(input)

    case resumeToolDefinition.name:
      return resumeTool(input)

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`
  }
}
