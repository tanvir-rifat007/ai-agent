import { z } from 'zod'
import { queryPdf } from '../rag/query.js'

export const resumeToolDefinition = {
  name: 'resume',
  parameters: z.object({
    query: z.string().describe('The query to search for in the resume'),
  }),
  description: 'Get my resume',
}

export const resumeTool = async ({ toolArgs }) => {
  const { query } = toolArgs
  const results = await queryPdf(query)

  const formattedResults = results.map((result) => {
    const { metadata, data } = result
    return { ...metadata, description: data }
  })

  return JSON.stringify(formattedResults, null, 2)
}
