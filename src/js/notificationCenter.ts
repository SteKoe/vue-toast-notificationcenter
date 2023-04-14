import {useToast} from "@/js/api";
import {NotificationStore} from "@/js/notificationStore";

export const useNotificationStore = () => {
    return NotificationStore;
}

export const useNotificationCenter = (globalProps: any) => {
    const $toast = useToast();

    return {
        open(options: any) {
            let message = null;
            if (typeof options === 'string') {
                message = options;
                options = {};
            }

            const defaultProps = {
                type: "default",
                context: "default",
                message
            };

            const props = Object.assign({}, defaultProps, globalProps, options)

            const toastInstance = $toast.open(props);

            if (toastInstance) {
                NotificationStore.add(toastInstance.uid, props.context, props.type);
                // @ts-ignore
                toastInstance.ctx.showNotice();
            }
        },
        error(message: string, opts: any) {
            const options = Object.assign({}, {
                type: "error",
                context: "error",
                message,
            }, opts)
            this.open(options)
        },
        success(message: string, opts: any) {
            const options = Object.assign({}, {
                type: "success",
                context: "success",
                message,
            }, opts)
            this.open(options)
        },
        info(message: string, opts: any) {
            const options = Object.assign({}, {
                type: "info",
                context: "info",
                message,
            }, opts)
            this.open(options)
        },
        warning(message: string, opts: any) {
            const options = Object.assign({}, {
                type: "warning",
                context: "warning",
                message,
            }, opts)
            this.open(options)
        },
        clearAll: () => {
            $toast.clear();
        }
    }
}