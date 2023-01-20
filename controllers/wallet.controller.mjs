export async function upsertAddresses(client, data) {
  const db = client.db("ethereal")
  const collection = db.collection("wallets")

  await collection.updateOne(
    { _id: data._id },
    { $addToSet: { address: { $each: data.addresses } } },
    {
      upsert: true,
    }
  )

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
