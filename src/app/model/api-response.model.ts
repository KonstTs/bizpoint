export class ktApiResponse {
  isError: boolean;
  messages?: ktApiMessage[];
  data?: any;
  metadata?: any;
}

export enum ktApiMessageType {
  Error,
  Warning,
  Information
}

export class ktApiMessage {
  messageType: ktApiMessageType;
  message: string;
}
