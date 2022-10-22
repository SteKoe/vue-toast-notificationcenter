import "./themes/light/index.scss"
import {useNotificationCenter, useNotificationStore} from "./js/notificationCenter";

const NotificationcenterPlugin = {
    install: (app, options = {}) => {
        let instance = useNotificationCenter(options);
        app.config.globalProperties.$notificationCenter = instance;
        app.provide('$notificationCenter', instance)
    }
}
export default NotificationcenterPlugin;

export {NotificationcenterPlugin, useNotificationCenter, useNotificationStore}