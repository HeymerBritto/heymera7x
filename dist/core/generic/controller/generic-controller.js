"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_config_1 = require("../../../config/api-config");
class GenericController {
    constructor() {
        this.conn = api_config_1.config.myConn;
    }
    applyRoutes(koaRouter) {
        throw new Error("Method not implemented.");
    }
}
exports.GenericController = GenericController;
