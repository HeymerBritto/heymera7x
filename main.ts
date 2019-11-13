import { KoaServer } from "./core/api/koa/koa-api";
import { usersController } from "./core/auth/users/users-controller";
import { mongoConn } from "./core/db/mongodb/mongo";

//Run Commands to Create a Project

// - npm init -y
// - tsc --init
// - change tsconfig.json -> "outDir": "dist"

// - npm config set save=true
// - npm config set save-exact=true

// npm run test 

export const koaServer = new KoaServer();

koaServer.applyRoutes([usersController]);
koaServer.init();

mongoConn.createConnection().then(() => {
    console.log('vai toma no cu')
})