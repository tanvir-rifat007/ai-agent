import { runLLM } from './llm.js'

const args = process.argv[2]

if (!args) {
  console.error('Please provide a prompt')
  process.exit(1)
}

;(async () => {
  const response = await runLLM(args)
  console.log(response)
})()
