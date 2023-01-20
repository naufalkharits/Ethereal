import { Composer } from "grammy"

const composer = new Composer()

composer.hears(/^\/cancel\b/i, async (ctx) => {
  await ctx.conversation.exit()
  await ctx.reply("CANCELLED!")
})

export default composer
