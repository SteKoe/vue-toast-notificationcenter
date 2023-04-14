import {Component, ComponentInternalInstance, h, render} from 'vue';

export function removeElement(el: HTMLElement) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}

export function createComponent(component: Component, props: any, slots = {}): ComponentInternalInstance | null {
    let parentContainer = document.querySelector('.v-toast-container');

    if (!parentContainer) {
        parentContainer = document.createElement('div');
        parentContainer.classList.add('v-toast-container');
        document.body.appendChild(parentContainer)
    }

    const vNode = h(component, props, slots)
    const container = document.createElement('div');
    container.classList.add('v-toast--pending')
    parentContainer.appendChild(container);
    render(vNode, container);

    return vNode.component
}
