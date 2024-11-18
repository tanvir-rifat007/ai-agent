import { z } from 'zod'
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
}

export const reddit = async () => {
  const { data } = await fetch(`https://www.reddit.com/r/nsfw.json`).then(
    (res) => res.json()
  )
  const relevantInfo = data.children.map((child) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
