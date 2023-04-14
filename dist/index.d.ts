import { useNotificationCenter, useNotificationStore } from './js/notificationCenter';
import { App } from "vue";
declare const NotificationCenterPlugin: {
    install(app: App, options?: {}): void;
};
export default NotificationCenterPlugin;
export { NotificationCenterPlugin, useNotificationCenter, useNotificationStore };
