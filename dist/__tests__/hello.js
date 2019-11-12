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
const supertest_1 = __importDefault(require("supertest"));
const koa_api_1 = require("../core/api/koa/koa-api");
const users_controller_1 = require("../core/auth/users/users-controller");
const api_config_1 = require("../config/api-config");
var koa = new koa_api_1.KoaServer();
var server;
beforeAll(() => {
    api_config_1.config.koa.debug = false;
    api_config_1.config.koa.port = 5005;
    koa.applyRoutes([users_controller_1.usersController]);
    server = koa.init();
});
describe("GET/status", () => {
    it("API Request for status", () => __awaiter(void 0, void 0, void 0, function* () {
        var result = yield supertest_1.default(server).get("/status");
        var obj = JSON.parse(result.text);
        expect(obj.result).toEqual(true);
        expect(obj.data).toEqual("Servidor Online");
        expect(result.status).toEqual(200);
    }));
});
afterAll(() => {
    server.close();
});
