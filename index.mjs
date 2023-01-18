import { conversations } from "@grammyjs/conversations"
import dotenv from "dotenv"
import express from "express"
import { Bot, session } from "grammy"
import moralis from "moralis"

import { isAddress } from "./utils/evm.mjs"

dotenv.config()
const app = express()
const bot = new Bot(process.env.TELEGRAM_TOKEN)
const Moralis = moralis.default
Moralis.start({
  apiKey: process.env.MORALIS_KEY,
})

// middlewares
app.use(express.json())
bot
  .use(async (ctx, next) => {
    ctx.message.text = ctx.message.text.toLowerCase()

    await next()
  })
  .use(session({ initial: () => ({}) }))
  .use(conversations())

app.post("/wallet", (req, res) => {
  console.log(req)
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
