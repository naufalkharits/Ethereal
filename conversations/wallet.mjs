import { isAddress } from "../evm.mjs"

export default async function wallet(conversation, ctx) {
  await ctx.reply("What is your wallet address?")

  const { message } = await conversation.wait()
  const address = isAddress(message.text)

  if (!address) return wallet(conversation, ctx)
  await ctx.reply(address)
}

