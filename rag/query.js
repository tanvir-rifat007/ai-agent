import { Index as UpstashIndex } from '@upstash/vector'
import ora from 'ora'

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
})

export const queryPdf = async (query) => {
  const spinner = ora('Querying resume data...').start()

  try {
    console.log(query)

    // return an array:
    const results = await index.query({
      data: query,
      topK: 1,
      includeMetadata: true,
      includeData: true,
    })

    console.log(results)

    spinner.succeed('Retrieved relevant data!')

    return results
  } catch (e) {
    spinner.fail('Error retrieving data')
    console.error(e)
    return ''
  }
}
