"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_response_1 = require("./generic-response");
class ErrorResponse extends generic_response_1.GenericResponse {
    constructor(data, ctx) {
        super(false, undefined, data);
        ctx.status = 500;
    }
}
exports.ErrorResponse = ErrorResponse;
