"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppClient = void 0;
const axios_1 = __importStar(require("axios"));
class WhatsAppClient {
    // Private constructor to prevent direct instantiation
    constructor(config) {
        this.config = Object.assign(Object.assign({}, config), { apiVersion: config.apiVersion || "v17.0" });
    }
    // Static method to get or create the instance
    static getInstance(config) {
        if (!WhatsAppClient.instance) {
            if (!config) {
                throw new Error("Initial configuration is required to create an instance");
            }
            WhatsAppClient.instance = new WhatsAppClient(config);
        }
        return WhatsAppClient.instance;
    }
    // Method to set configuration (optional)
    setConfig(config) {
        this.config = Object.assign(Object.assign({}, this.config), config);
    }
    // Method to send a message
    sendMessage(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneNumberId = options.phoneNumberId || this.config.phoneNumberId;
            const accessToken = options.accessToken || this.config.accessToken;
            const apiVersion = this.config.apiVersion || "v17.0"; // Use the API version from config or default
            if (!phoneNumberId || !accessToken) {
                throw new Error("Missing phoneNumberId or accessToken");
            }
            try {
                const response = yield axios_1.default.post(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
                    messaging_product: "whatsapp",
                    to: options.to,
                    type: "text",
                    text: { body: options.message },
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
            catch (error) {
                if (error instanceof axios_1.AxiosError) {
                    const errorMessage = error.response
                        ? `Failed to send message: ${error.response.status} - ${error.response.statusText}. Details: ${JSON.stringify(error.response.data)}`
                        : `Failed to send message: ${error.message}`;
                    throw new Error(errorMessage);
                }
                else {
                    throw new Error(`Failed to send message: ${error}`);
                }
            }
        });
    }
}
exports.WhatsAppClient = WhatsAppClient;
