import express from "express"

import walletRoutes from "./wallet.route.mjs"

const router = express.Router()

router.use("/wallet", walletRoutes)

export default router
