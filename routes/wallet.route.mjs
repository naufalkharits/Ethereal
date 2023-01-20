import express from "express"

import { webhook } from "../controllers/wallet.controller.mjs"

const router = express.Router()

router.post("/", webhook)

export default router
