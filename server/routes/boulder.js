import express from 'express'

import { createBoulder, deleteBoulder, editBoulder, getBoulderList } from '../controllers/boulderController.js'

var router = express.Router()

router.post("/create", createBoulder)

router.post('/edit', editBoulder)

router.post("/delete", deleteBoulder)

router.get("/list", getBoulderList)

export default router