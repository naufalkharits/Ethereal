import { upsertAddresses } from "../controllers/wallet.controller.mjs"
import isAddress from "../utils/evm.mjs"
import client from "../utils/mongodb.mjs"
import Moralis, { startMoralis } from "../utils/moralis.mjs"

export default async function wallet(conversation, ctx) {
  await ctx.reply("What is your wallet address?")

  const { from, message } = await conversation.wait()
  const addresses = isAddress(message.text)

  if (!addresses) return wallet(conversation, ctx)


  try {
    await client.connect()
    await upsertAddresses(client, { _id: from.id.toString(), addresses })
    await ctx.reply("ADDED!")
  } catch (error) {
    console.error(error)
  } finally {
    await client.close()
  }
  // moralis
  await addAddresses(addresses)
}
