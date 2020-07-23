export enum Roles {
  SADMIN = 'super',
  CADMIN = 'company',
  USER = 'user',
  GUEST = 'guest',
  BOT = 'bot',
}

export enum Statuses {
  INVITED = 'invited',
  PENDING = 'pending',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  NOT_CONNECTED = 'not_connected',
}

export enum Entities {
  USER = 'user',
  ROLE = 'role',
  COMPANY = 'company',
  TRANSACTION = 'transaction',
  COUNTERPARTY = 'counterparty',
}

export enum CompanyStatuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh'
}

export enum CounterpartyType {
  EXCHANGE = 'exchange',
  BANK = 'bank',
  INTERNAL = 'internal',
}

export enum KeyStatuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  PENDING = 'pending',
}

export enum TransactionStatuses {
  PENDING_APPROVAL = 'pending_approval',
  MANUAL_VERIFICATION = 'manual_verification',
  SENDING = 'sending',
  IN_TRANSIT = 'in_transit',
  RECEIVED = 'received',
  ISSUE = 'issue',
}

export enum TransactionTypes {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT    = 'deposit',
}
