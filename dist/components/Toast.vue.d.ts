import { PropType } from 'vue';
import { Severity } from '../js/Severity';
import { Notification } from '../js/Notification';
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        required: false;
    };
    message: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: PropType<Severity>;
        default: string;
    };
    context: {
        type: StringConstructor;
        default: string;
    };
    labelCloseAll: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onDismiss: {
        type: PropType<(opts: {
            context?: string;
            severity?: Severity;
        }) => void>;
        default: () => () => undefined;
    };
    onClick: {
        type: FunctionConstructor;
        default: () => undefined;
    };
    pauseOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    notificationStore: {
        add(uid: number, context: string, severity: Severity): void;
        state(): import("vue").Ref<{
            uid: number;
            context: string;
            severity: Severity;
        }[]>;
        remove(component: any): void;
    };
    counter: import("vue").Ref<number>;
    root: import("vue").Ref<HTMLElement>;
    isActive: import("vue").Ref<boolean>;
    isManualDismissed: import("vue").Ref<boolean>;
    parentTop: import("vue").Ref<HTMLElement | null>;
    timer: import("vue").Ref<{
        start: () => void;
        pause: () => void;
        resume: () => void;
        stop: () => void;
    }>;
}, unknown, {
    transition(): {
        enter: string;
        leave: string;
    };
}, {
    setupContainer(): void;
    showNotice(): void;
    onClearContext(notification: Notification): void;
    manualDismiss(): void;
    dismiss(): void;
    removeToast(): void;
    toggleTimer(triggerPause: boolean): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: false;
    };
    message: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: PropType<Severity>;
        default: string;
    };
    context: {
        type: StringConstructor;
        default: string;
    };
    labelCloseAll: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onDismiss: {
        type: PropType<(opts: {
            context?: string;
            severity?: Severity;
        }) => void>;
        default: () => () => undefined;
    };
    onClick: {
        type: FunctionConstructor;
        default: () => undefined;
    };
    pauseOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    type: Severity;
    context: string;
    labelCloseAll: string;
    duration: number;
    onDismiss: (opts: {
        context?: string;
        severity?: Severity;
    }) => void;
    onClick: Function;
    pauseOnHover: boolean;
}>;
export default _sfc_main;
