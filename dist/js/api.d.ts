export declare const useToast: (globalProps?: {}) => {
    open(options?: any): import("vue").ComponentInternalInstance | null;
    clear(): void;
    success(message: string, options?: any): import("vue").ComponentInternalInstance | null;
    error(message: string, options?: any): import("vue").ComponentInternalInstance | null;
    info(message: string, options?: any): import("vue").ComponentInternalInstance | null;
    warning(message: string, options?: any): import("vue").ComponentInternalInstance | null;
    default(message: string, options?: any): import("vue").ComponentInternalInstance | null;
};
