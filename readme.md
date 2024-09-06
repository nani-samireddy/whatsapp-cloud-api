# WhatsApp Cloud API Node.js Client

A Node.js client library for sending WhatsApp messages using the WhatsApp Cloud API. This package supports various types of messages, including text, media, location, interactive, template, sticker, and contact messages.

## Installation

You can install the package using npm:

```bash
npm install whatsapp-cloud-api
```

## Usage

### Importing the Client

```typescript
import { WhatsAppClient } from 'whatsapp-cloud-api';
```

### Initializing the Client

Create a singleton instance of the `WhatsAppClient` with your configuration:

```typescript
const client = WhatsAppClient.getInstance({
  phoneNumberId: 'YOUR_PHONE_NUMBER_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
});
```

### Sending Messages

#### Send a Text Message

```typescript
await client.sendText({
  to: 'recipient_phone_number',
  message: 'Hello, World!',
});
```

#### Send an Image

```typescript
await client.sendImage({
  to: 'recipient_phone_number',
  mediaUrl: 'https://example.com/image.jpg',
});
```

#### Send a Video

```typescript
await client.sendVideo({
  to: 'recipient_phone_number',
  mediaUrl: 'https://example.com/video.mp4',
});
```

#### Send a Document

```typescript
await client.sendDocument({
  to: 'recipient_phone_number',
  mediaUrl: 'https://example.com/document.pdf',
});
```

#### Send an Audio

```typescript
await client.sendAudio({
  to: 'recipient_phone_number',
  mediaUrl: 'https://example.com/audio.mp3',
});
```

#### Send a Location

```typescript
await client.sendLocation({
  to: 'recipient_phone_number',
  latitude: '37.7749',
  longitude: '-122.4194',
  name: 'San Francisco',
  address: 'California, USA',
});
```

#### Send an Interactive Message

```typescript
await client.sendInteractive({
  to: 'recipient_phone_number',
  interactiveType: 'button',
  buttons: [
    { id: 'button1', title: 'Option 1' },
    { id: 'button2', title: 'Option 2' }
  ],
});
```

#### Send a Template Message

```typescript
await client.sendTemplate({
  to: 'recipient_phone_number',
  templateName: 'your_template_name',
  templateParams: ['param1', 'param2'],
});
```

#### Send a Sticker

```typescript
await client.sendSticker({
  to: 'recipient_phone_number',
  stickerUrl: 'https://example.com/sticker.webp',
});
```

#### Send a Contact

```typescript
await client.sendContact({
  to: 'recipient_phone_number',
  contact: {
    name: {
      first_name: 'John',
      last_name: 'Doe',
    },
    phones: [
      { phone: '1234567890' },
    ],
  },
});
```

## Configuration

You can set or update the configuration using:

```typescript
client.setConfig({
  phoneNumberId: 'NEW_PHONE_NUMBER_ID',
  accessToken: 'NEW_ACCESS_TOKEN',
});
```

## API Documentation

- **`sendText(options: TextMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a text message.
- **`sendImage(options: MediaMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends an image.
- **`sendVideo(options: MediaMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a video.
- **`sendDocument(options: MediaMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a document.
- **`sendAudio(options: MediaMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends an audio.
- **`sendLocation(options: LocationMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a location.
- **`sendInteractive(options: InteractiveMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends an interactive message.
- **`sendTemplate(options: TemplateMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a template message.
- **`sendSticker(options: StickerMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a sticker.
- **`sendContact(options: ContactMessageOptions): Promise<WhatsAppMessageResponse>`** - Sends a contact.

## Error Handling

Errors will be thrown as `Error` objects with descriptive messages. Handle them with try-catch blocks.

```typescript
try {
  await client.sendText({ to: 'recipient_phone_number', message: 'Hello!' });
} catch (error) {
  console.error(error.message);
}
```

## License

This package is licensed under the MIT License.

## Contributing

Feel free to submit issues or pull requests to contribute to this project.
