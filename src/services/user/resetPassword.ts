import { AuthService } from '@services/auth';

export async function resetPassword(userId: string) {
  const password: string = await AuthService.resetPassword(userId);

  // tslint:disable-next-line:no-suspicious-comment
  // TODO: delete password in response
  return {
    password: password,
  };
}
