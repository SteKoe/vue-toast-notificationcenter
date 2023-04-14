import {Severity} from "@/js/Severity";

export type Notification = {
    uid: number,
    context: string,
    severity: Severity,
}