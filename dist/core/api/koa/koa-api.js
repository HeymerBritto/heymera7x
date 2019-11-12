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
const koa_1 = __importDefault(require("koa"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const koa_router_1 = __importDefault(require("koa-router"));
const api_config_1 = require("../../../config/api-config");
const generic_response_1 = require("../api-response/generic-response");
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
class KoaServer {
    constructor() {
        this.app = module.exports = new koa_1.default();
        this.app.use(cors());
        this.app.use(koaBody());
        this.app.use(koaLogger());
        // middleware
        this.app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield next();
            }
            catch (err) {
                ctx.status = err.status || 500;
                ctx.body = new generic_response_1.GenericResponse(false, undefined, err.message);
                ctx.app.emit('error', err, ctx);
            }
        }));
        this.app.on('error', (err, ctx) => __awaiter(this, void 0, void 0, function* () {
            /* centralized error handling:
             *   console.log error
             *   write error to log file
             *   save error and request information to database if ctx.request match condition
             *   ...
            */
            if (api_config_1.config.koa.debug) {
                console.log('koa middleware - error -> ');
                console.log(err);
            }
        }));
        // Custom 401 handling if you don't want to expose koa-jwt errors to users
        this.app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            return next().catch((err) => {
                if (401 == err.status) {
                    ctx.status = 401;
                    ctx.body = 'Protected resource, use Authorization header to get access\n';
                }
                else {
                    throw err;
                }
            });
        }));
        // Middleware below this line is only reached if JWT token is valid
        this.app.use(koa_jwt_1.default({ secret: api_config_1.config.koa.secret }).unless({ path: [/^\/api\/login/, /^\/api\/status/] }));
        this.router = new koa_router_1.default();
        this.router.prefix(api_config_1.config.koa.prefix);
        this.router.get('/status', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new generic_response_1.GenericResponse(true, 'Servidor Online', undefined);
            next();
        }));
    }
    applyRoutes(controllers) {
        for (let controller of controllers) {
            controller.applyRoutes(this.router);
        }
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
        if (api_config_1.config.koa.debug) {
            console.log();
            console.log('Rotas Disponiveis');
            console.log('- - - - - - - - - - - - - - - - - - - - ');
            console.log();
            this.router.stack.map((i) => console.log(`http://localhost:${api_config_1.config.koa.port}` + i.path));
            console.log();
        }
    }
    init() {
        var server = this.app.listen(api_config_1.config.koa.port);
        if (api_config_1.config.koa.debug) {
            console.log(`Koa Online:`);
            console.log(server.address());
        }
        return server;
    }
}
exports.KoaServer = KoaServer;
