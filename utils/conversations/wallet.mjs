import { isAddress } from "../evm.mjs"

async function wallet(conversation, ctx) {
  await ctx.reply("What is your wallet address?")

  const { message } = await conversation.wait()
  const address = isAddress(message.text)

  if (!address) return wallet(conversation, ctx)
  await ctx.reply(address)
}

export default wallet
