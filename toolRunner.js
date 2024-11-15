import OpenAI from 'openai'

const getWeather = () => {
  return 'The weather is sunny'
}

export const runTool = async (toolCall, userMessage) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather()
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
