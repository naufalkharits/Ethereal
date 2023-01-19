import dotenv from "dotenv"
import moralis from "moralis"

dotenv.config()
const Moralis = moralis.default

export async function startMoralis() {
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  })
}

export default Moralis
