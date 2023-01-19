import { upsertAddresses } from "../controllers/wallet.controller.mjs"
import isAddress from "../utils/evm.mjs"
import client from "../utils/mongodb.mjs"
import Moralis, { startMoralis } from "../utils/moralis.mjs"

export default async function wallet(conversation, ctx) {
  await ctx.reply("What is your wallet address?")

  const { message } = await conversation.wait()
  const addresses = isAddress(message.text)

  if (!addresses) return wallet(conversation, ctx)

  await startMoralis()
  for (let x = 0; x < addresses.length; x++) {
    const address = addresses[x]
    console.log(address)
    await Moralis.Streams.addAddress({
      id: "65b6215a-f76a-44fd-aec8-a44e02aa4761",
      address,
    })
  }

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
