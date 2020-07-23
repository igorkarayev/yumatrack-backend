import { Publishable, NotificationTypes } from './types';
import { NOTIFICATION_TYPE_ATTR_NAME } from './constants';

export class NotificationService {
  public constructor(private readonly publishService: Publishable,
                     private readonly notificationType: NotificationTypes) {}

  public async publish(msg: string, attrs: {[attrName: string]: string} = {}): Promise<void> {
    await this.publishService.publish(msg, {
      ...attrs,
      [NOTIFICATION_TYPE_ATTR_NAME]: this.notificationType,
    });
  }
}
