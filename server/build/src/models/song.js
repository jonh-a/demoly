"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongModel = void 0;
const mongoose_1 = require("mongoose");
const SongSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userID: { type: String, required: true },
});
exports.SongModel = (0, mongoose_1.model)("song", SongSchema);
