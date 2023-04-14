export declare const useNotificationStore: () => {
    add(uid: number, context: string, severity: import("./Severity").Severity): void;
    state(): import("vue").Ref<{
        uid: number;
        context: string;
        severity: import("./Severity").Severity;
    }[]>;
    remove(component: any): void;
};
export declare const useNotificationCenter: (globalProps: any) => {
    open(options: any): void;
    error(message: string, opts: any): void;
    success(message: string, opts: any): void;
    info(message: string, opts: any): void;
    warning(message: string, opts: any): void;
    clearAll: () => void;
};
