"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa_api_1 = require("./core/api/koa/koa-api");
const users_controller_1 = require("./core/auth/users/users-controller");
const mongo_1 = require("./core/db/mongodb/mongo");
//Run Commands to Create a Project
// - npm init -y
// - tsc --init
// - change tsconfig.json -> "outDir": "dist"
// - npm config set save=true
// - npm config set save-exact=true
// npm run test 
exports.koaServer = new koa_api_1.KoaServer();
exports.koaServer.applyRoutes([users_controller_1.usersController]);
exports.koaServer.init();
mongo_1.mongoConn.createConnection().then(() => {
    console.log('vai toma no cu');
});
