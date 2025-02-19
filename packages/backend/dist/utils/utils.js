"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMySQLDateTime = void 0;
const getMySQLDateTime = () => {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
};
exports.getMySQLDateTime = getMySQLDateTime;
