export const NOTIFICATION_TYPE_ATTR_NAME = 'notificationType';

const DEFAULT_SUBJECT = 'YumaTrack notification';

export const NEW_TRANSACTION_NOTIICATION = {
  templateName: 'new_transaction',
  subject: DEFAULT_SUBJECT,
};

export const COUNTERPARTY_CONNECTION_APPROVED = {
  templateName: 'counterparty-connection-approved',
  subject: DEFAULT_SUBJECT,
};

export const COUNTERPARTY_CONNECTION_ERROR = {
  templateName: 'counterparty-connection-error',
  subject: DEFAULT_SUBJECT,
};

export const FINALIZED_TRANSACTION_STATUS = {
  templateName: 'finilized-transaction-status',
  subject: DEFAULT_SUBJECT,
};

export const NEW_USER_INVITATION = {
  templateName: 'new-user-invitation',
  subject: DEFAULT_SUBJECT,
};
