"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(3333);
app.get('/ads', (request, response) => {
    response.json({
        data: [
            { id: 1, name: 'Ads 1' },
            { id: 2, name: 'Ads 2' },
            { id: 3, name: 'Ads 3' },
            { id: 4, name: 'Ads 4' }
        ]
    });
});
