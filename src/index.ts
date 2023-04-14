import "./themes/light/index.scss"
import {useNotificationCenter, useNotificationStore} from "@/js/notificationCenter";
import {App} from "vue";

const NotificationCenterPlugin = {
    install(app: App, options = {}) {
        let instance = useNotificationCenter(options);
        app.config.globalProperties.$notificationCenter = instance;
        app.provide('$notificationCenter', instance)
    }
}
export default NotificationCenterPlugin;

export {NotificationCenterPlugin, useNotificationCenter, useNotificationStore}