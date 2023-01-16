import dotenv from "dotenv"
import express from "express"
import { Telegraf } from "telegraf"

import { isAddress } from "./utils/evm.mjs"

dotenv.config()
const app = express()
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

// middlewares
app.use(express.json())
bot.use((ctx, next) => {
  // ctx.message.text = { origin: ctx.message.text, modified: ctx.message.text.toLowerCase() }
  ctx.message.text = ctx.message.text.toLowerCase()

  return next(ctx)
})

bot.command("start", (ctx) => ctx.reply(`Hello, ${ctx.message.from.first_name}!`))

bot.command("wallet", (ctx) => {
  const address = isAddress(ctx.message.text.replace("/wallet ", ""))

  if (!address) return ctx.reply("WRONG ADDRESS!")

  return ctx.reply(address)
})

bot.launch()

const server = app.listen(process.env.PORT, () =>
  console.log(`listening on port ${server.address().port}`)
)
