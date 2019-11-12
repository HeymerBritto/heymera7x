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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_config_1 = require("../../../config/api-config");
exports.authMethod = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ctx.headers.authorization) {
        ctx.throw(403, 'No token.');
    }
    const token = ctx.headers.authorization.split(' ')[1];
    try {
        ctx.request.jwtPayload = jsonwebtoken_1.default.verify(token, api_config_1.config.koa.secret);
    }
    catch (err) {
        ctx.throw(err.status || 403, err.text);
    }
    yield next();
});
exports.loginMethod = (ctx, next) => {
    var user = {
        userId: "bibhas",
        name: "Bibhas B"
    };
    ctx.body = {
        token: jsonwebtoken_1.default.sign(user, api_config_1.config.koa.secret, { expiresIn: '10h' })
    };
    next();
};
