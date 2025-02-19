"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = require("mysql2"); // do not use 'mysql2/promises'!
const kysely_1 = require("kysely");
console.log("hi");
const dialect = new kysely_1.MysqlDialect({
    pool: (0, mysql2_1.createPool)({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 3306,
        connectionLimit: 10,
    })
});
// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
exports.db = new kysely_1.Kysely({
    dialect,
});
