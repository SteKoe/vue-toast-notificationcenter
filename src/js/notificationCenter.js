import {useToast} from "./api";
import {ref} from "vue";

export const Severity = Object.freeze({
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    DEFAULT: 'default'
});

const notifications = ref([]);

export const Store = {
    add(context, severity) {
        notifications.value.push({
            context,
            severity
        })
    },

    sub(ctx) {
        const state = this.get(ctx);
        return state.value--;
    },

    get(ctx) {
        return notifications.value.filter(c => c.context === ctx);
    },

    count(context) {
        return this.get(context).length;
    },

    state() {
        return notifications
    },

    remove(component) {
        notifications.value = notifications.value.filter(n => n.uid !== component._.uid);
    }
}

export const useNotificationStore = () => {
    return Store;
}

export const useNotificationCenter = (globalProps) => {
    const $toast = useToast();

    return {
        open(options) {
            let message = null;
            if (typeof options === 'string') {
                message = options;
                options = {};
            }

            const defaultProps = {
                type: Severity.DEFAULT,
                context: Severity.DEFAULT,
                message
            };

            const props = Object.assign({}, defaultProps, globalProps, options)

            const instance = $toast.open(props);

            notifications.value.push({
                uid: instance.uid,
                dismiss: instance.ctx.dismiss,
                context: props.context,
                type: props.type,
            });

            instance.ctx.showNotice();
        },
        error(message, opts) {
            const options = Object.assign({}, {
                type: Severity.ERROR,
                context: Severity.ERROR,
                message,
            }, opts)
            this.open(options)
        },
        success(message, opts) {
            const options = Object.assign({}, {
                type: Severity.SUCCESS,
                context: Severity.SUCCESS,
                message,
            }, opts)
            this.open(options)
        },
        info(message, opts) {
            const options = Object.assign({}, {
                type: Severity.INFO,
                context: Severity.INFO,
                message,
            }, opts)
            this.open(options)
        },
        warning(message, opts) {
            const options = Object.assign({}, {
                type: Severity.WARNING,
                context: Severity.WARNING,
                message,
            }, opts)
            this.open(options)
        },
        clearAll: () => {
            $toast.clear();
        }
    }
}