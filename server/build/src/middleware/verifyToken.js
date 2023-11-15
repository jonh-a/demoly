"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            /*
            const decoded = jwt.verify(authHeader, req.app.locals.JWT_SECRET, (err) => {
              if (err) return res.status(403).json({ success: false, message: 'Unauthenticated' })
            })
            */
            const decoded = jsonwebtoken_1.default.verify(authHeader, req.app.locals.JWT_SECRET);
            const userID = (decoded === null || decoded === void 0 ? void 0 : decoded.id) || '';
            res.locals.userID = userID;
            return next();
        }
        return res.status(403).json({ success: false, message: 'Unauthenticated' });
    }
    catch (e) {
        return res.status(403).json({ success: false, message: 'Unauthenticated' });
    }
};
