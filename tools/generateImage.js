import { z } from 'zod'
import { openai } from '../ai.js'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        `prompt for the image. Be sure to consider the user's original message when making the prompt. If you are unsure, then as the user to provide more details.`
      ),
  }),
  description: 'generate an image',
}

export const generateImage = async ({ toolArgs }) => {
  console.log('toolarags', toolArgs)
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })

  return response.data[0].url
}
