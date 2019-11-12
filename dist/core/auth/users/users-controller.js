"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const authenticated_1 = require("../jwt/authenticated");
const ok_response_1 = require("../../api/api-response/ok-response");
const generic_controller_1 = require("../../generic/controller/generic-controller");
class UsersController extends generic_controller_1.GenericController {
    applyRoutes(koaRouter) {
        koaRouter.get('/users/getall', authenticated_1.authMethod, (ctx, next) => {
            ctx.body = new ok_response_1.OkResponse([]);
            next();
        });
        koaRouter.get('/users/:id', (ctx, next) => {
            if (util_1.isNullOrUndefined(ctx.params.id)) {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'That movie does not exist.'
                };
                next();
            }
            ctx.body = new ok_response_1.OkResponse({ id: ctx.params.id });
            next();
        });
        koaRouter.post('/users', (ctx, next) => {
            ctx.body = new ok_response_1.OkResponse(ctx.request.body);
            next();
        });
        koaRouter.put('/users', (ctx, next) => {
            ctx.body = new ok_response_1.OkResponse(ctx.request.body);
            next();
        });
        koaRouter.delete('/users', (ctx, next) => {
            ctx.body = new ok_response_1.OkResponse(ctx.request.body);
            next();
        });
        koaRouter.get('/login', authenticated_1.loginMethod);
    }
}
exports.usersController = new UsersController();
