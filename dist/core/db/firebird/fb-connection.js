"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_firebird_1 = __importDefault(require("node-firebird"));
const api_config_1 = require("../../../config/api-config");
class Firebird {
    options() {
        return {
            host: api_config_1.config.firebird.host,
            port: api_config_1.config.firebird.port,
            database: api_config_1.config.firebird.database,
            user: api_config_1.config.firebird.user,
            password: api_config_1.config.firebird.password,
            lowercase_keys: api_config_1.config.firebird.lowercase_keys,
            role: api_config_1.config.firebird.role,
            pageSize: api_config_1.config.firebird.pageSize
        };
    }
    createDatabase(callback) {
        node_firebird_1.default.attachOrCreate(this.options(), (err, db) => {
            if (err) {
                throw err;
            }
            console.log(db);
            callback(err, db);
        });
    }
    attachDatabase(callback) {
        node_firebird_1.default.attach(this.options(), (err, db) => {
            if (err) {
                throw err;
            }
            console.log(db);
            callback(err, db);
        });
    }
    query(db, cmd, params, callback) {
        db.query(cmd, params, (err, result) => {
            if (err) {
                console.log(err);
                if (api_config_1.config.koa.debug) {
                    console.log();
                    console.log(cmd);
                    console.log(params);
                }
            }
            callback(err, result);
        });
    }
}
exports.Firebird = Firebird;
exports.firebird = new Firebird();
