import KoaRouter from 'koa-router'
import { IUser, User } from './users-model';
import { isNullOrUndefined } from 'util';
import { authMethod, loginMethod } from '../jwt/authenticated';
import { OkResponse } from '../../api/api-response/ok-response';
import { GenericController } from "../../generic/controller/generic-controller";

class UsersController extends GenericController<IUser> {

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {

        koaRouter.get('/users/getall', authMethod, (ctx: any, next: any) => {

            this.conn.createConnection().then(async (db: any) => {

                ctx.body = new OkResponse(await User.find({}));
                await this.conn.disconnect();
                next();

            }).catch((error) => {

                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: error.message
                };
                next();
            });
        });

        koaRouter.get('/users/:id', (ctx: any, next: any) => {

            if (isNullOrUndefined(ctx.params.id)) {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'That movie does not exist.'
                };
                next();
            }

            ctx.body = new OkResponse({ id: ctx.params.id });
            next();
        });

        koaRouter.post('/users', (ctx: any, next: any) => {

            ctx.body = new OkResponse(ctx.request.body);
            next();
        });

        koaRouter.put('/users', (ctx: any, next: any) => {

            ctx.body = new OkResponse(ctx.request.body);
            next();
        });

        koaRouter.delete('/users', (ctx: any, next: any) => {

            ctx.body = new OkResponse(ctx.request.body);
            next();
        });

        koaRouter.get('/login', loginMethod);
    }
}

export const usersController = new UsersController();