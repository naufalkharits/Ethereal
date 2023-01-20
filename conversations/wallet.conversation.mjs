import { addAddresses, upsertAddresses } from "../controllers/wallet.controller.mjs"
import isAddress from "../utils/evm.mjs"

export default async function wallet(conversation, ctx) {
  await ctx.reply("What is your wallet address?")

  const { from, message } = await conversation.wait()
  const addresses = isAddress(message.text)

  if (!addresses) return wallet(conversation, ctx)

  // mongodb
  await upsertAddresses({ from, addresses })

  // moralis
  await addAddresses(addresses)

  await ctx.reply("ADDED!")
}
