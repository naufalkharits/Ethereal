import { conversations } from "@grammyjs/conversations"
import dotenv from "dotenv"
import { Bot, session } from "grammy"

import commands from "../commands/index.command.mjs"

dotenv.config()
const bot = new Bot(process.env.TELEGRAM_TOKEN)

bot
  .use(session({ initial: () => ({}) }))
  .use(conversations())
  .use(commands)

await bot.api.setMyCommands([
  { command: "menu", description: "Main menu" },
  { command: "cancel", description: "Cancel action" },
  { command: "wallet", description: "Wallet menu" },
  { command: "cointoken", description: "Coin / token menu" },
])

export default bot
