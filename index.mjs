import { conversations, createConversation } from "@grammyjs/conversations"
import dotenv from "dotenv"
import express from "express"
import { Bot, session } from "grammy"
import moralis from "moralis"

import wallet from "./utils/conversations/wallet.mjs"

dotenv.config()
const app = express()
const bot = new Bot(process.env.TELEGRAM_TOKEN)
const Moralis = moralis.default
Moralis.start({
  apiKey: process.env.MORALIS_KEY,
})

// middlewares
app.use(express.json())
bot.use(session({ initial: () => ({}) })).use(conversations())


app.post("/wallet", (req, res) => {
  console.log(req)
})

bot.hears(/^\/start\b/i, async (ctx) => await ctx.reply(`Hello, ${ctx.message.from.first_name}!`))

bot.hears(/^\/cancel\b/i, async (ctx) => {
  await ctx.conversation.exit()
  await ctx.reply("CANCELLED!")
})

bot.use(createConversation(wallet)).hears(/^\/wallet\b/i, async (ctx) => {
  await ctx.conversation.enter("wallet")
})

bot.launch()

const server = app.listen(process.env.PORT, () =>
  console.log(`listening on port ${server.address().port}`)
)
