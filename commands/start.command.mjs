import { Composer } from "grammy"

const composer = new Composer()

composer.hears(/^\/start\b/i, async (ctx) => await ctx.reply(`Hello, ${ctx.from.first_name}!`))

export default composer
