"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const treatment_1 = __importDefault(require("./treatment"));
const versionRouter = express_1.default.Router();
versionRouter.use('/treatment', treatment_1.default);
exports.default = versionRouter;
