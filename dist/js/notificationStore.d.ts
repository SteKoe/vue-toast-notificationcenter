import { Severity } from '../js/Severity';
export declare const NotificationStore: {
    add(uid: number, context: string, severity: Severity): void;
    state(): import("vue").Ref<{
        uid: number;
        context: string;
        severity: Severity;
    }[]>;
    remove(component: any): void;
};
