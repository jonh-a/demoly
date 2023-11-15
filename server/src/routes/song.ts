import { Router, Request, Response } from "express";
import { SongModel, ISong } from "../models/song";
import verifyToken from '../middleware/verifyToken'

const router = Router()

router.get("/mine", verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    if (!userID) return res.status(400).json({ success: false, message: 'Unauthenticated.' })

    const songs = await SongModel.find({ userID })
    return res.json({ songs })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
})

router.post("/new", verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    const { name = '' } = req.body;
    if (!userID) {
      return res.status(400).json({ success: false, message: 'Unauthenticated.' });
    }

    const newSong = new SongModel({ userID, name })
    await newSong.save()

    return res.json({ success: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
})

export { router as songRouter }