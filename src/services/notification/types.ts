export interface Publishable {
  publish(msg: string, atts: {[attrName: string]: string}): Promise<void>;
}

export enum NotificationTypes {
  EMAIL = 'email',
}

export interface EmailOptions {
  message: string;
  recipients: string[];
}

export interface NewTransactionNotificationPayload {
  companiesCounterpartyName: string;
}
