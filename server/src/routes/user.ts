import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel, IUser } from "../models/user";
import session from 'express-session';
import dayjs from 'dayjs'

dotenv.config()

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username = '', password = '', email = '' } = req?.body;

    const user = await UserModel.findOne({ username })

    if (user) return res.status(400).json({ success: false, message: 'User already exists.' })

    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = new UserModel({ username, email, password: hashedPass })
    await newUser.save();

    return res.json({ success: true, message: 'Registered successfully' })
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
})

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username = '', password = '' } = req?.body;
    const user: IUser = await UserModel.findOne({ username })

    if (!user) return res.status(400).json({ success: false, message: 'Failed to authenticate.' })

    const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) return res.status(400).json({ success: false, message: 'Failed to authenticate.' })

    const sessionData = {
      id: user._id,
    }

    res.cookie("access_token", JSON.stringify(sessionData), {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
    })

    // res.header('Access-Control-Allow-Origin', 'localhost');

    // const token = jwt.sign({ id: user._id }, req.app.locals?.JWT_SECRET || '')
    res.json({ success: true })

    return res.send()
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
})

export { router as userRouter }