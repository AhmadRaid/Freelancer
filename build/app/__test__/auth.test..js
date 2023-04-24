"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../app"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", false);
    yield mongoose_1.default.connect("mongodb://localhost/Freelancer");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
}));
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: "a@a.com",
            password: "123456",
        });
        return response.body.data.token.access_Token;
    });
}
exports.login = login;
;
