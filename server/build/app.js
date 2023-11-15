"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./src/routes/user");
const song_1 = require("./src/routes/song");
dotenv_1.default.config();
const MONGO_CONN = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.MONGO_CONN) || '';
const app = (0, express_1.default)();
const version = '0.0.1';
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.locals.JWT_SECRET = ((_b = process.env) === null || _b === void 0 ? void 0 : _b.JWT_SECRET) || '';
mongoose_1.default.connect(MONGO_CONN);
app.get('/health', (req, res) => res.json({ status: 'OK' }));
app.get('/version', (req, res) => res.json({ version }));
app.use('/user', user_1.userRouter);
app.use('/song', song_1.songRouter);
exports.default = app;
