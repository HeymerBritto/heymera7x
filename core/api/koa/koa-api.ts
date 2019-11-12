import Koa from 'koa'
import jwt from 'koa-jwt'
import KoaRouter from 'koa-router'
import { config } from '../../../config/api-config';
import { GenericResponse } from '../api-response/generic-response';
import { IGenericController } from '../../generic/controller/generic-controller';
import { Server } from 'http';

const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');

export class KoaServer {

    public app: Koa;
    private router: KoaRouter;

    constructor() {

        this.app = module.exports = new Koa();

        this.app.use(cors());
        this.app.use(koaBody());
        this.app.use(koaLogger());

        // middleware
        this.app.use(async (ctx, next) => {
            try {

                await next();
            } catch (err) {
                ctx.status = err.status || 500
                ctx.body = new GenericResponse(false, undefined, err.message);
                ctx.app.emit('error', err, ctx)
            }
        })

        this.app.on('error', async (err, ctx) => {

            /* centralized error handling:
             *   console.log error
             *   write error to log file
             *   save error and request information to database if ctx.request match condition
             *   ...
            */

            if (config.koa.debug) {
                console.log('koa middleware - error -> ');
                console.log(err);
            }
        });

        // Custom 401 handling if you don't want to expose koa-jwt errors to users
        this.app.use(async (ctx, next) => {
            return next().catch((err) => {
                if (401 == err.status) {
                    ctx.status = 401;
                    ctx.body = 'Protected resource, use Authorization header to get access\n';
                } else {
                    throw err;
                }
            });
        });

        // Middleware below this line is only reached if JWT token is valid
        this.app.use(jwt({ secret: config.koa.secret }).unless({ path: [/^\/api\/login/, /^\/api\/status/] }));

        this.router = new KoaRouter();

        this.router.prefix(config.koa.prefix);
        this.router.get('/status', async (ctx: any, next: any) => {
            ctx.body = new GenericResponse(true, 'Servidor Online', undefined);
            next();
        });
    }

    applyRoutes(controllers: IGenericController[]) {

        for (let controller of controllers) {
            controller.applyRoutes(this.router);
        }

        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

        if (config.koa.debug) {

            console.log()
            console.log('Rotas Disponiveis')
            console.log('- - - - - - - - - - - - - - - - - - - - ')
            console.log()

            this.router.stack.map((i: KoaRouter.Layer) => console.log(`http://localhost:${config.koa.port}` + i.path));
            console.log()
        }
    }

    init(): Server {

        var server = this.app.listen(config.koa.port);

        if (config.koa.debug) {
            console.log(`Koa Online:`)
            console.log(server.address())
        }

        return server;
    }
}