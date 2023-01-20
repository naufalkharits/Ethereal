import { Composer } from "grammy"

import cancel from "./cancel.command.mjs"
import start from "./start.command.mjs"
import wallet from "./wallet.command.mjs"

const composer = new Composer()

composer.use(start)
composer.use(cancel)
composer.use(wallet)

export default composer
