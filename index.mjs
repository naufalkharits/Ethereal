import dotenv from "dotenv"
import express from "express"

dotenv.config()
const app = express()

// middlewares
app.use(express.json())

const server = app.listen(process.env.PORT, () =>
  console.log(`listening on port ${server.address().port}`)
)
