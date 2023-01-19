import { isAddress } from "../evm.mjs"
import { upsertAddresses } from "../controllers/wallet.controller.mjs"
import isAddress from "../utils/evm.mjs"
import client from "../utils/mongodb.mjs"

export default async function wallet(conversation, ctx) {
  await ctx.reply("What is your wallet address?")

  const { message } = await conversation.wait()
  const addresses = isAddress(message.text)

  if (!addresses) return wallet(conversation, ctx)

  try {
    await client.connect()
    await upsertAddresses(client, { _id: message.from.id.toString(), addresses })
    await ctx.reply("ADDED!")
  } catch (error) {
    console.error(error)
  } finally {
    await client.close()
  }
}
