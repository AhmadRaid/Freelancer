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
exports.userPayload = exports.officePayload = void 0;
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../app"));
const auth_test_1 = require("./auth.test.");
const requestAgent = supertest_1.default.agent("http://localhost:4000/api");
exports.officePayload = {
    name: "غزة مكتب الداتا",
    address: "الرمال تقاطع شارع فلسطين",
    timeWork: "9 صباحا ",
    fees: "بدون عمولة",
};
exports.userPayload = {
    email: "a@a.com",
    password: "123456",
};
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // const mongoServer = await MongoMemoryServer.create();
    mongoose_1.default.set("strictQuery", false);
    yield mongoose_1.default.connect("mongodb://localhost/Freelancer");
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        token = yield (0, auth_test_1.login)();
    }
    catch (e) {
        expect(e).toMatch('error');
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
}));
describe('GET /', () => {
    test('responds with 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, supertest_1.default)(app_1.default).get('/');
        expect((res) => {
            res.status = 200;
        });
    }));
});
describe('post /', () => {
    it('responds with 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/office/add')
            .set('Authorization', `Bearer ${token}`)
            .send(exports.officePayload);
        expect(response.status).toBe(200);
    }));
});
