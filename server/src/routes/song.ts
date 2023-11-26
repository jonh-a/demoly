import { Router, Request, Response } from 'express';
import { SongModel } from '../models/song';
import verifyToken from '../middleware/verifyToken';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'

dotenv.config()

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env?.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env?.AWS_SECRET_ACCESS_KEY || ''
  }
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'demoly-takes',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, 'audio/webm;codecs=opus')
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

const router = Router();

export interface RequestWithFile extends Request {
  file: any
}

router.get('/mine', verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    if (!userID) return res.status(403).json({ success: false, message: 'Unauthenticated.' });
    const songs = await SongModel.find({ userID });
    return res.json({ success: true, items: songs });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
});

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    if (!userID) return res.status(403).json({ success: false, message: 'Unauthenticated.' });

    const { id = '' } = req.params;
    const song = await SongModel.findOne({ _id: id, userID });

    if (song) return res.json({ success: true, items: song });
    else return res.status(403).json({ success: false, message: 'Unauthenticated.' });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
});

router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    if (!userID) return res.status(403).json({ success: false, message: 'Unauthenticated.' });

    const { id = '' } = req.params;
    const { content = '', notes = '', name = '' } = req.body;
    const song = await SongModel.findOneAndUpdate({ _id: id, userID }, { content, notes, name, updatedAt: new Date().toISOString() });
    await song.save();

    return res.json({ success: true, items: song });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
});

router.put('/:id/take', verifyToken, upload.single('file'), async (req: RequestWithFile, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    if (!userID) return res.status(403).json({ success: false, message: 'Unauthenticated.' });

    const { id = '' } = req.params;
    const file = req?.file;
    if (!file) {
      return res.json({ success: false, message: 'No files were uploaded.' });
    }

    const s3FileLocation = file?.location;

    if (!s3FileLocation) {
      console.log('failed to upload file to s3')
      return res.status(500).json({ success: false, message: 'Failed to upload take.' })
    }

    const song = await SongModel.findOneAndUpdate(
      { _id: id, userID, },
      { audio: s3FileLocation },
    )
    await song.save()

    return res.json({ success: true, items: song });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
});

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    if (!userID) return res.status(403).json({ success: false, message: 'Unauthenticated.' });

    const { id = '' } = req.params;
    const song = await SongModel.findOneAndDelete({ _id: id, userID });
    if (song) return res.json({ success: true });
    return res.status(403).json({ sucess: false });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
});

router.post('/new', verifyToken, async (req: Request, res: Response) => {
  try {
    const { userID = '' } = res.locals;
    const { name = '' } = req.body;
    if (!userID) return res.status(403).json({ success: false, message: 'Unauthenticated.' });

    const newSong = new SongModel({
      userID,
      name,
      notes: ' ',
      content: ' ',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    await newSong.save();

    return res.json({ success: true, id: newSong?._id || '' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
});

export { router as songRouter };