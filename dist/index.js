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
    // Private method to send a payload
    sendPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneNumberId = payload.phoneNumberId || this.config.phoneNumberId;
            const accessToken = payload.accessToken || this.config.accessToken;
            const apiVersion = this.config.apiVersion || "v17.0"; // Use the API version from config or default
            if (!phoneNumberId || !accessToken) {
                throw new Error("Missing phoneNumberId or accessToken");
            }
            try {
                const response = yield axios_1.default.post(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, payload, {
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
    // Method to send a text message
    sendText(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "text",
                text: { body: options.message },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send an image
    sendImage(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "image",
                image: { link: options.mediaUrl },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send a video
    sendVideo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "video",
                video: { link: options.mediaUrl },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send a document
    sendDocument(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "document",
                document: { link: options.mediaUrl },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send an audio
    sendAudio(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "audio",
                audio: { link: options.mediaUrl },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send a location message
    sendLocation(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "location",
                location: {
                    latitude: options.latitude,
                    longitude: options.longitude,
                    name: options.name,
                    address: options.address,
                },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send an interactive message (button or list)
    sendInteractive(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "interactive",
                interactive: {
                    type: options.interactiveType,
                    body: { text: "Please choose an option" },
                    action: {
                        buttons: options.buttons || [],
                        sections: options.listSections || [],
                    },
                },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send a template message
    sendTemplate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "template",
                template: {
                    name: options.templateName,
                    language: { code: "en_US" },
                    components: [
                        {
                            type: "body",
                            parameters: options.templateParams || [],
                        },
                    ],
                },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send a sticker message
    sendSticker(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "sticker",
                sticker: { link: options.stickerUrl },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    // Method to send a contact message
    sendContact(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "contacts",
                contacts: [options.contact],
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
}
exports.WhatsAppClient = WhatsAppClient;
