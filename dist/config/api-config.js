"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../core/db/mongodb/mongo");
exports.config = {
    koa: {
        port: process.env.PORT || 5001,
        prefix: process.env.PREFIX || '/api',
        debug: process.env.DEBUG || true,
        secret: process.env.SECRET || 'a7x'
    },
    firebird: {
        host: '127.0.0.1',
        port: 3050,
        database: 'D:\\Teste.fdb',
        user: 'SYSDBA',
        password: 'masterkey',
        lowercase_keys: false,
        role: undefined,
        pageSize: 4096,
    },
    mongo: {
        url: process.env.DB_URL || 'mongodb://localhost/my-node-restfull'
    },
    myConn: mongo_1.mongoConn
};
