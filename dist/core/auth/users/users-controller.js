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
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("./users-model");
const util_1 = require("util");
const authenticated_1 = require("../jwt/authenticated");
const ok_response_1 = require("../../api/api-response/ok-response");
const generic_controller_1 = require("../../generic/controller/generic-controller");
class UsersController extends generic_controller_1.GenericController {
    applyRoutes(koaRouter) {
        koaRouter.get('/users/getall', authenticated_1.authMethod, (ctx, next) => {
            this.conn.createConnection().then((db) => __awaiter(this, void 0, void 0, function* () {
                ctx.body = new ok_response_1.OkResponse(yield users_model_1.User.find({}));
                yield this.conn.disconnect();
                next();
            })).catch((error) => {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: error.message
                };
                next();
            });
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
