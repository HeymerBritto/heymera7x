"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericResponse {
    constructor(result, data, error) {
        this.result = false;
        this.data = undefined;
        this.error = undefined;
        this.result = result;
        this.data = data;
        this.error = error;
    }
}
exports.GenericResponse = GenericResponse;
