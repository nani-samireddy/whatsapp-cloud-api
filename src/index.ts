import axios, { AxiosError } from "axios";

export class WhatsAppClient {
    private static instance: WhatsAppClient;
    private config: WhatsAppConfig;

    // Private constructor to prevent direct instantiation
    private constructor(config: WhatsAppConfig) {
        this.config = {
            ...config,
            apiVersion: config.apiVersion || "v20.0", // Default to 'v20.0' if not provided
            apiURL: config.apiURL || "https://graph.facebook.com", // Default to 'https://graph.facebook.com' if not provided
        };
    }

    /**
     * Returns an instance of the WhatsAppClient class.
     *
     * @param config - Optional configuration object for the WhatsAppClient instance.
     * @returns An instance of the WhatsAppClient class.
     * @throws Error if initial configuration is not provided.
     */
    public static getInstance(config?: WhatsAppConfig): WhatsAppClient {
        if (!WhatsAppClient.instance) {
            if (!config) {
                throw new Error(
                    "Initial configuration is required to create an instance"
                );
            }
            WhatsAppClient.instance = new WhatsAppClient(config);
        }
        return WhatsAppClient.instance;
    }

    // Method to set configuration (optional)
    public setConfig(config: Partial<WhatsAppConfig>) {
        this.config = { ...this.config, ...config };
    }

    /**
     * Sends a payload to the WhatsApp API and returns the response.
     *
     * @param payload - The payload to send to the WhatsApp API.
     * @returns The response from the WhatsApp API.
     * @throws Error if the request fails or the response is not successful.
     */
    private async sendPayload(payload: any): Promise<WhatsAppMessageResponse> {

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
            const response = await axios.post(
                `${apiURL}/${apiVersion}/${phoneNumberId}/messages`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Return the response data.
            return response.data;
        } catch (error) {
            // Handle errors from the API response or Axios request.
            if (error instanceof AxiosError) {
                const errorMessage = error.response
                    ? `Failed to send message: ${error.response.status} - ${error.response.statusText
                    }. Details: ${JSON.stringify(error.response.data)}`
                    : `Failed to send message: ${error.message}`;
                throw new Error(errorMessage);
            } else {
                throw new Error(`Failed to send message: ${error}`);
            }
        }
    }

    /**
     * Sends a text message using WhatsApp.
     * 
     * @param options - The options for the text message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendText(
        options: TextMessageOptions
    ): Promise<WhatsAppMessageResponse> {
        const payload = {
            messaging_product: "whatsapp",
            to: options.to,
            type: "text",
            text: { body: options.message },
            phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
            accessToken: options.accessToken || this.config.accessToken,
        };
        return this.sendPayload(payload);
    }

    /**
     * Sends an image message using WhatsApp.
     * 
     * @param options - The options for the image message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendImage(
        options: MediaMessageOptions
    ): Promise<WhatsAppMessageResponse> {
        const payload = {
            messaging_product: "whatsapp",
            to: options.to,
            type: "image",
            image: { link: options.mediaUrl },
            phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
            accessToken: options.accessToken || this.config.accessToken,
        };
        return this.sendPayload(payload);
    }

    /**
     * Sends a video message using WhatsApp.
     * 
     * @param options - The options for the video message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendVideo(
        options: MediaMessageOptions
    ): Promise<WhatsAppMessageResponse> {
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
    }

    /**
     * Sends a document message using WhatsApp.
     * 
     * @param options - The options for the document message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendDocument(
        options: MediaMessageOptions
    ): Promise<WhatsAppMessageResponse> {
        const payload = {
            messaging_product: "whatsapp",
            to: options.to,
            type: "document",
            document: { link: options.mediaUrl },
            phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
            accessToken: options.accessToken || this.config.accessToken,
        };
        return this.sendPayload(payload);
    }

    /**
     * Sends an audio message using WhatsApp.
     * 
     * @param options - The options for the audio message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendAudio(
        options: MediaMessageOptions
    ): Promise<WhatsAppMessageResponse> {
        const payload = {
            messaging_product: "whatsapp",
            to: options.to,
            type: "audio",
            audio: { link: options.mediaUrl },
            phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
            accessToken: options.accessToken || this.config.accessToken,
        };
        return this.sendPayload(payload);
    }

    /**
     * Sends a location message using WhatsApp.
     * 
     * @param options - The options for the location message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendLocation(
        options: LocationMessageOptions
    ): Promise<WhatsAppMessageResponse> {
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
    }

    /**
     * Sends an interactive message using WhatsApp.
     *
     * @param options - The options for the interactive message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     * @throws Error if the request fails or the response is not successful.
     */
    public async sendInteractive(
        options: InteractiveMessageOptions
    ): Promise<WhatsAppMessageResponse> {
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
    }

    /**
     * Sends a template message using WhatsApp.
     *
     * @param options - The options for the template message.
     * @returns A promise that resolves to a WhatsAppMessageResponse.
     */
    public async sendTemplate(
        options: TemplateMessageOptions
    ): Promise<WhatsAppMessageResponse> {
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
    }

    /**
     * Sends a sticker message via WhatsApp.
     *
     * @param options - The options for sending the sticker message.
     * @returns A promise that resolves to a WhatsAppMessageResponse object.
     */
    public async sendSticker(
        options: StickerMessageOptions
    ): Promise<WhatsAppMessageResponse> {
        const payload = {
            messaging_product: "whatsapp",
            to: options.to,
            type: "sticker",
            sticker: { link: options.stickerUrl },
            phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
            accessToken: options.accessToken || this.config.accessToken,
        };
        return this.sendPayload(payload);
    }

    /**
     * Method to send a contact message
     * @param ContactMessageOptions options - The contact message options
     * @returns The response from the WhatsApp API
     * @throws Error if the request fails or the response is not successful
     */
    public async sendContact(
        options: ContactMessageOptions
    ): Promise<WhatsAppMessageResponse> {
        const payload = {
            messaging_product: "whatsapp",
            to: options.to,
            type: "contacts",
            contacts: [options.contact],
            phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
            accessToken: options.accessToken || this.config.accessToken,
        };
        return this.sendPayload(payload);
    }
}
