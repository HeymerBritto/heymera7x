import nodeFirebird, { Database, DatabaseCallback, QueryCallback } from 'node-firebird'
import { config } from '../../../config/api-config';

export class Firebird {

    options(): nodeFirebird.Options {

        return <nodeFirebird.Options>{
            host: config.firebird.host,
            port: config.firebird.port,
            database: config.firebird.database,
            user: config.firebird.user,
            password: config.firebird.password,
            lowercase_keys: config.firebird.lowercase_keys,
            role: config.firebird.role,
            pageSize: config.firebird.pageSize
        };
    }

    createDatabase(callback: DatabaseCallback) {

        nodeFirebird.attachOrCreate(this.options(), (err: any, db: Database) => {

            if (err) {
                throw err;
            }

            console.log(db);
            callback(err, db);
        });
    }

    attachDatabase(callback: DatabaseCallback) {

        nodeFirebird.attach(this.options(), (err: any, db: Database) => {

            if (err) {
                throw err;
            }

            console.log(db);
            callback(err, db);
        });
    }

    query(db: Database, cmd: string, params: any[], callback: QueryCallback) {

        db.query(cmd, params, (err: any, result: any[]) => {

            if (err) {
                console.log(err)
                if (config.koa.debug) {
                    console.log()
                    console.log(cmd);
                    console.log(params);
                }
            }

            callback(err, result);
        })
    }
}

export const firebird = new Firebird();