import KoaRouter from 'koa-router'
import { ModelBase } from '../model/base-model';
import { config } from '../../../config/api-config';
import { IConn } from '../interface/database';

export interface IGenericController<T extends ModelBase> {
    applyRoutes(koaRouter: KoaRouter): void;
}

export class GenericController<T extends ModelBase> implements IGenericController<T> {

    protected conn: IConn;

    constructor() {
        this.conn = config.myConn;
    }

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new Error("Method not implemented.");
    }
}