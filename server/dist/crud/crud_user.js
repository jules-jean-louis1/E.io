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
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("📩: Received data:", data);
    if (!data.username || !data.email || !data.password) {
        return { error: "Please provide all required fields" };
    }
    try {
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(data.password, salt);
        const userExists = yield prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });
        if (userExists) {
            return { error: "User already exists" };
        }
        const user = yield prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hash,
            },
        });
        console.log("🚀: User created successfully", user);
        return user;
    }
    catch (error) {
        console.error("🔥: Error creating user", error);
        return { error: "Error creating user" };
    }
});
exports.createUser = createUser;
