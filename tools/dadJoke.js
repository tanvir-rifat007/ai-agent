import { z } from 'zod'
import fetch from 'node-fetch'

export const dadJokeToolDefinition = {
  name: 'dad_joke',
  parameters: z.object({}),
  description: 'Generate a dad joke',
}

export const dadJoke = async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  const data = await response.json()
  return data.joke
}
