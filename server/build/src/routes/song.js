"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRouter = void 0;
const express_1 = require("express");
const song_1 = require("../models/song");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = (0, express_1.Router)();
exports.songRouter = router;
router.get("/mine", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID = '' } = res.locals;
        if (!userID)
            return res.status(400).json({ success: false, message: 'Unauthenticated.' });
        const songs = yield song_1.SongModel.find({ userID });
        return res.json({ songs });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
}));
router.post("/new", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID = '' } = res.locals;
        const { name = '' } = req.body;
        if (!userID) {
            return res.status(400).json({ success: false, message: 'Unauthenticated.' });
        }
        const newSong = new song_1.SongModel({ userID, name });
        yield newSong.save();
        return res.json({ success: true });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
}));
