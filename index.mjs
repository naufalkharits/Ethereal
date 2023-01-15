import dotenv from "dotenv"
import express from "express"
import { Telegraf } from "telegraf"

dotenv.config()
const app = express()
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

// middlewares
app.use(express.json())
bot.use((ctx, next) => {
  console.log(ctx)
  ctx.message.text = ctx.message.text.toLowerCase()

  return next(ctx)
})

bot.command("start", (ctx) => ctx.reply(`Hello, ${ctx.message.from.first_name}!`))

bot.launch()

const server = app.listen(process.env.PORT, () =>
  console.log(`listening on port ${server.address().port}`)
)
