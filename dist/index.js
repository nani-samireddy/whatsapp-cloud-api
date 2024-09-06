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
        this.config = Object.assign(Object.assign({}, config), { apiVersion: config.apiVersion || "v20.0", apiURL: config.apiURL || "https://graph.facebook.com" });
    }
    /**
     * Returns an instance of the WhatsAppClient class.
     *
     * @param config - Optional configuration object for the WhatsAppClient instance.
     * @returns An instance of the WhatsAppClient class.
     * @throws Error if initial configuration is not provided.
     */
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
    /**
     * Sends a payload to the WhatsApp API and returns the response.
     *
     * @param payload - The payload to send to the WhatsApp API.
     * @returns The response from the WhatsApp API.
     * @throws Error if the request fails or the response is not successful.
     */
    sendPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract the required parameters from the payload or config.
            const phoneNumberId = payload.phoneNumberId || this.config.phoneNumberId;
            const accessToken = payload.accessToken || this.config.accessToken;
            const apiVersion = this.config.apiVersion || "v20.0"; // Use the API version from config or default
            const apiURL = this.config.apiURL || "https://graph.facebook.com"; // Use the API URL from config or default
            // Check if phoneNumberId and accessToken are provided in the payload or config (or throw an error).
            if (!phoneNumberId || !accessToken) {
                throw new Error("Missing phoneNumberId or accessToken");
            }
            try {
                // Send the payload to the WhatsApp API using Axios.
                const response = yield axios_1.default.post(`${apiURL}/${apiVersion}/${phoneNumberId}/messages`, payload, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                // Return the response data.
                return response.data;
            }
            catch (error) {
                // Handle errors from the API response or Axios request.
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
    /**
     * Sends a text message using WhatsApp.
     *
     * @param options - The options for the text message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
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
    /**
     * Sends an image message using WhatsApp.
     *
     * @param options - The options for the image message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
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
    /**
     * Sends a video message using WhatsApp.
     *
     * @param options - The options for the video message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    sendVideo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                messaging_product: "whatsapp",
                to: options.to,
                type: "video",
                video: {
                    link: options.mediaUrl,
                    caption: "video caption",
                },
                phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
                accessToken: options.accessToken || this.config.accessToken,
            };
            return this.sendPayload(payload);
        });
    }
    /**
     * Sends a document message using WhatsApp.
     *
     * @param options - The options for the document message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
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
    /**
     * Sends an audio message using WhatsApp.
     *
     * @param options - The options for the audio message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
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
    /**
     * Sends a location message using WhatsApp.
     *
     * @param options - The options for the location message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
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
    /**
     * Sends an interactive message using WhatsApp.
     *
     * @param options - The options for the interactive message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
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
    /**
     * Sends a template message using WhatsApp.
     *
     * @param options - The options for the template message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     */
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
    /**
     * Sends a sticker message via WhatsApp.
     *
     * @param options - The options for sending the sticker message.
     * @returns A promise that resolves to a WhatsAppMessageResponse object.
     */
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
    /**
     * Method to send a contact message
     * @param ContactMessageOptions options - The contact message options
     * @returns The response from the WhatsApp API
     * @throws Error if the request fails or the response is not successful
     */
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
