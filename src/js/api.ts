import ToastComponent from '@/components/Toast.vue'
import {createComponent} from '@/js/helpers';
import eventBus from '@/js/eventBus';

export const useToast = (globalProps = {}) => {
    return {
        open(options: any) {
            let message = null;
            if (typeof options === 'string') message = options;

            const defaultProps = {
                message
            };

            const propsData = Object.assign({}, defaultProps, globalProps, options);
            return createComponent(ToastComponent, propsData);
        },
        clear() {
            eventBus.emit('toast-clear')
        },
        success(message: string, options: any = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'success'
            }, options))
        },
        error(message: string, options: any = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'error'
            }, options))
        },
        info(message: string, options: any = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'info'
            }, options))
        },
        warning(message: string, options: any = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'warning'
            }, options))
        },
        default(message: string, options: any = {}) {
            return this.open(Object.assign({}, {
                message,
                type: 'default'
            }, options))
        }
    }
};