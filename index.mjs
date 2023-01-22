import dotenv from "dotenv"
import express from "express"

import router from "./routes/index.route.mjs"
import bot from "./utils/grammy.mjs"

dotenv.config()
const app = express()

// middlewares
app.use(express.json()).use(router)

bot.launch()

const server = app.listen(process.env.PORT, async () => {
  console.log(`listening on port ${server.address().port}`)
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  })
})
