"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api", require("../routes/mainRoute"));
    app.use("*", (req, res) => res.status(404).send("NOT FOUND PAGE Ahmad Raid"));
    return app;
}
exports.default = createServer;
