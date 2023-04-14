import {Severity} from "@/js/Severity";
import {Notification} from "@/js/Notification";
import {ref} from "vue";

const notifications = ref([] as Notification[]);
export const NotificationStore = {
    add(uid: number, context: string, severity: Severity) {
        notifications.value.push({
            uid,
            context,
            severity
        })
    },
    state() {
        return notifications
    },
    remove(component: any) {
        notifications.value = notifications.value.filter(n => n.uid !== component._.uid);
    }
}