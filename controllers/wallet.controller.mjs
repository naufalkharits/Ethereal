export async function upsertAddress(client, data) {
  const db = client.db("ethereal")
  const collection = db.collection("wallets")

  await collection.updateOne(
    { _id: data._id },
    { $addToSet: { address: { $each: data.addresses } } },
    {
      upsert: true,
    }
  )
}
