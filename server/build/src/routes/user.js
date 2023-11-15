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
exports.userRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
dotenv_1.default.config();
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username = '', password = '', email = '' } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield user_1.UserModel.findOne({ username });
        if (user)
            return res.status(400).json({ success: false, message: 'User already exists.' });
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.UserModel({ username, email, password: hashedPass });
        yield newUser.save();
        return res.json({ success: true, message: 'Registered successfully' });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username = '', password = '' } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield user_1.UserModel.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, message: 'Failed to authenticate.' });
        const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordIsValid)
            return res.status(400).json({ success: false, message: 'Failed to authenticate.' });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, ((_a = req.app.locals) === null || _a === void 0 ? void 0 : _a.JWT_SECRET) || '');
        return res.json({ token, userId: user._id });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
}));
