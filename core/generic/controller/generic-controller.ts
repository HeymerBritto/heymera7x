import KoaRouter from 'koa-router'

export interface IGenericController {
    applyRoutes(koaRouter: KoaRouter): void;
}

export class GenericController implements IGenericController {

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new Error("Method not implemented.");
    }
}