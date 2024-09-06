/**
 * This file contains all the types and interfaces used in the project.
 */

interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
  apiVersion?: string; // Optional, defaults to 'v17.0'
}


// Define base message options
interface BaseMessageOptions {
  phoneNumberId?: string;
  accessToken?: string;
  to: string;
}

// Define interfaces for each message type
interface TextMessageOptions extends BaseMessageOptions {
  message: string;
}

interface MediaMessageOptions extends BaseMessageOptions {
  mediaUrl: string;
}

interface LocationMessageOptions extends BaseMessageOptions {
  latitude: string;
  longitude: string;
  name?: string;
  address?: string;
}

interface InteractiveMessageOptions extends BaseMessageOptions {
  interactiveType: "button" | "list";
  buttons?: { id: string; title: string }[];
  listSections?: { title: string; rows: { id: string; title: string }[] }[];
}

interface TemplateMessageOptions extends BaseMessageOptions {
  templateName: string;
  templateParams?: any[];
}

interface StickerMessageOptions extends BaseMessageOptions {
  stickerUrl: string;
}

interface ContactMessageOptions extends BaseMessageOptions {
  contact: {
    name: { first_name: string; last_name?: string };
    phones: { phone: string }[];
  };
}

interface WhatsAppMessageResponse {
  messaging_product: string;
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
}
