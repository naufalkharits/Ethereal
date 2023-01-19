import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config()
const client = new MongoClient(process.env.MONGODB_URI)

export default client
