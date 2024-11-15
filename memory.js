import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'

const defaultData = {
  messages: [],
}

// for saving database
// so we add some metadata to the data

export const addMetadata = (message) => {
  return {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...message,
  }
}

export const getDB = async () => {
  const db = await JSONFilePreset('db.json', defaultData)
  return db
}

export const addMessages = async (messages) => {
  const db = await getDB()
  // adding metadata befor saving
  const messagesWithMetadata = messages.map(addMetadata)

  db.data.messages.push(...messagesWithMetadata)

  await db.write()
}

export const getMessages = async () => {
  const db = await getDB()
  return db.data.messages
}

export const saveToolResponse = async (toolCallId, toolResponse) => {
  return addMessages([
    {
      role: 'tool',
      content: toolResponse,
      tool_call_id: toolCallId,
    },
  ])
}
