import KoaRouter from 'koa-router'
import { ModelBase } from '../model/base-model';

export interface IGenericController<T extends ModelBase> {
    applyRoutes(koaRouter: KoaRouter): void;
}

export class GenericController<T extends ModelBase> implements IGenericController<T> {

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new Error("Method not implemented.");
    }
}