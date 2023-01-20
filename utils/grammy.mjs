import { conversations } from "@grammyjs/conversations"
import dotenv from "dotenv"
import { Bot, session } from "grammy"

import commands from "../commands/index.mjs"

dotenv.config()
const bot = new Bot(process.env.TELEGRAM_TOKEN)

bot
  .use(session({ initial: () => ({}) }))
  .use(conversations())
  .use(commands)

export default bot
