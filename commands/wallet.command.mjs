import { createConversation } from "@grammyjs/conversations"
import { Composer } from "grammy"

import wallet from "../conversations/wallet.conversation.mjs"

const composer = new Composer()

composer
  .use(createConversation(wallet))
  .hears(/^\/wallet\b/i, async (ctx) => await ctx.conversation.enter("wallet"))

export default composer
