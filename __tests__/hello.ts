import request from "supertest";
import { KoaServer } from "../core/api/koa/koa-api";
import { usersController } from "../core/auth/users/users-controller";
import { config } from "../config/api-config";

var koa = new KoaServer();
var server: any;

beforeAll(() => {

    config.koa.debug = false;
    config.koa.port = 5005;

    koa.applyRoutes([usersController]);
    server = koa.init();
})

describe("GET/status", () => {
    it("API Request for status", async () => {

        var result = await request(server).get("/status");
        var obj = JSON.parse(result.text);

        expect(obj.result).toEqual(true);
        expect(obj.data).toEqual("Servidor Online");
        expect(result.status).toEqual(200);
    });
});

afterAll(() => {
    server.close();
})