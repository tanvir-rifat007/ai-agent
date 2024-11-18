import 'dotenv/config'
import { Index as UpstashIndex } from '@upstash/vector'
import fs from 'node:fs'
import pdf from 'pdf-parse-debugging-disabled'
import ora from 'ora'

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
})

const indexPDFDATA = async () => {
  const spinner = ora('Indexing PDF Data').start()

  const pdfPath = new URL('./resume.pdf', import.meta.url).pathname
  console.log(pdfPath)

  const pdfBuffer = fs.readFileSync(pdfPath)

  const pdfData = await pdf(pdfBuffer)

  const text = pdfData.text

  spinner.text = 'Indexing PDF data...'

  try {
    await index.upsert({
      id: 'resume',
      data: text,
      metadata: {
        filename: 'resume.pdf',
        pageCount: pdfData.numpages,
        textLength: text.length,
      },
    })

    spinner.succeed('PDF data indexed successfully!')
  } catch (e) {
    spinner.fail('Error indexing PDF data')
    console.error(e)
  }
}
indexPDFDATA()
