import { User } from '@entities/user';

export function serializeUserDetails(user: User) {
  return {
    id: user.id,
    fullName: user.fullName,
    tradingName: user.tradingName,
    email: user.email,
    phone: user.phone,
    status: user.status,
    company: user.companies ? user.companies[0] : null,
    roles: user.roles.map(role => ({
      id: role.id,
      role: role.role,
    })),
    registeredAt: user.registeredAt,
  };
}

export function serializeUserPublicDetails(user: User) {
  return {
    id: user.id,
    fullName: user.fullName,
  };
}
