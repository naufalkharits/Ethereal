import dotenv from "dotenv"
import express from "express"

import bot from "./utils/grammy.mjs"

dotenv.config()
const app = express()

// middlewares
app.use(express.json())

app.post("/wallet", (req, res) => {
  console.log(req)
})

bot.launch()

const server = app.listen(process.env.PORT, () =>
  console.log(`listening on port ${server.address().port}`)
)
