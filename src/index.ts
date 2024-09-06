import axios, { AxiosError } from "axios";

export class WhatsAppClient {
  private static instance: WhatsAppClient;
  private config: WhatsAppConfig;

  // Private constructor to prevent direct instantiation
  private constructor(config: WhatsAppConfig) {
    this.config = {
      ...config,
      apiVersion: config.apiVersion || "v17.0", // Default to 'v17.0' if not provided
    };
  }

  // Static method to get or create the instance
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

  // Private method to send a payload
  private async sendPayload(payload: any): Promise<WhatsAppMessageResponse> {
    const phoneNumberId = payload.phoneNumberId || this.config.phoneNumberId;
    const accessToken = payload.accessToken || this.config.accessToken;
    const apiVersion = this.config.apiVersion || "v17.0"; // Use the API version from config or default

    if (!phoneNumberId || !accessToken) {
      throw new Error("Missing phoneNumberId or accessToken");
    }

    try {
      const response = await axios.post(
        `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response
          ? `Failed to send message: ${error.response.status} - ${
              error.response.statusText
            }. Details: ${JSON.stringify(error.response.data)}`
          : `Failed to send message: ${error.message}`;
        throw new Error(errorMessage);
      } else {
        throw new Error(`Failed to send message: ${error}`);
      }
    }
  }

  // Method to send a text message
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

  // Method to send an image
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

  // Method to send a video
  public async sendVideo(
    options: MediaMessageOptions
  ): Promise<WhatsAppMessageResponse> {
    const payload = {
      messaging_product: "whatsapp",
      to: options.to,
      type: "video",
      video: { link: options.mediaUrl },
      phoneNumberId: options.phoneNumberId || this.config.phoneNumberId,
      accessToken: options.accessToken || this.config.accessToken,
    };
    return this.sendPayload(payload);
  }

  // Method to send a document
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

  // Method to send an audio
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

  // Method to send a location message
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

  // Method to send an interactive message (button or list)
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

  // Method to send a template message
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

  // Method to send a sticker message
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

  // Method to send a contact message
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
