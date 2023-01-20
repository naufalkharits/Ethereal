import bot from "../utils/grammy.mjs"
import client from "../utils/mongodb.mjs"
import Moralis, { startMoralis } from "../utils/moralis.mjs"

export async function upsertAddresses(data) {
  const db = client.db("ethereal")
  const collection = db.collection("wallets")

  try {
    await client.connect()
    await collection.updateOne(
      { _id: data.from.id.toString() },
      { $addToSet: { address: { $each: data.addresses } } },
      {
        upsert: true,
      }
    )
  } catch (error) {
    console.error(error)
  } finally {
    await client.close()
  }
}

export async function addAddresses(data) {
  await startMoralis()
  for (let x = 0; x < data.length; x++) {
    const address = data[x]
    await Moralis.Streams.addAddress({
      id: "65b6215a-f76a-44fd-aec8-a44e02aa4761",
      address,
    })
  }
}

export async function webhook(req, res) {
  await bot.api.sendMessage(521603662, "New!")
}
