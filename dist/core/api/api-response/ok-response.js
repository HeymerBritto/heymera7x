"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_response_1 = require("./generic-response");
class OkResponse extends generic_response_1.GenericResponse {
    constructor(data) {
        super(true, data, undefined);
    }
}
exports.OkResponse = OkResponse;
