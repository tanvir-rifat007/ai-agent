import { generateImageToolDefinition } from './generateImage.js'
import { redditToolDefinition } from './reddit.js'
import { dadJokeToolDefinition } from './dadJoke.js'
import { resumeToolDefinition } from './resume.js'

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  resumeToolDefinition,
]
