<template>
  <transition
      :enter-active-class="transition.enter"
      :leave-active-class="transition.leave">
    <div
        ref="root"
        v-show="isActive"
        role="alert"
        class="v-toast__item"
        :class="[`v-toast__item--${type}`, `v-toast__item--top-right`]"
        @mouseover="toggleTimer(true)"
        @mouseleave="toggleTimer(false)">
      <div class="v-toast__dismiss"
           :class="{'v-toast__dismiss--group': counter > 1}"
           @click="manualDismiss">
        <div class="v-toast__dismiss-icon"></div>
        <div class="v-toast__dismiss-label" v-text="labelCloseAll"></div>
      </div>
      <div class="v-toast__icon"></div>
      <div class="v-toast__text">
        <p class="v-toast__title" v-if="title" v-text="title"></p>
        <p class="v-toast__message" v-html="message.substring(0, 128)"></p>
      </div>
    </div>
  </transition>
</template>

<script>
import {defineComponent, ref, render, watchEffect} from 'vue';
import {removeElement} from '../js/helpers.js';
import Timer from "../js/timer.js";
import eventBus from '../js/eventBus.js'
import {useNotificationStore} from "../js/notificationCenter";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    },
    context: {
      type: String,
      default: 'default'
    },
    labelCloseAll: {
      type: String,
      default: 'Close All',
    },
    duration: {
      type: Number,
      default: 3_000
    },
    onDismiss: {
      type: Function,
      default: () => {
      }
    },
    onClick: {
      type: Function,
      default: () => {
      }
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      isActive: false,
      isManualDissmissed: false,
      parentTop: null,
    }
  },
  setup(props) {
    const notificationStore = useNotificationStore();

    const notifications = notificationStore.state();
    const counter = ref(0);

    watchEffect(() => {
      counter.value = notifications.value.filter(c => c.context === props.context).length
    })
    return {
      notificationStore: notificationStore,
      counter
    }
  },
  beforeMount() {
    this.setupContainer()
  },
  mounted() {
    eventBus.on('toast-clear-context', this.onClearContext)
  },
  methods: {
    setupContainer() {
      this.parentTop = document.querySelector(`.v-toast__context-container--${this.context}`);
      if (this.parentTop) return;

      if (!this.parentTop) {
        this.parentTop = document.createElement('div');
        this.parentTop.className = `v-toast__context-container v-toast__context-container--${this.context}`;
      }

      const container = document.querySelector('.v-toast-container');
      container.appendChild(this.parentTop);
    },

    showNotice() {
      const wrapper = this.$refs.root.parentElement
      this.parentTop.insertAdjacentElement('beforeend', this.$refs.root);
      removeElement(wrapper);

      this.isActive = true;

      // Set timer for first toast in context only.
      if (this.duration && this.counter === 0) {
        this.timer = new Timer(this.dismiss, this.duration);
      }
    },

    onClearContext(e) {
      if (this.context === e.context && this._.uid !== e.uid) {
        this.removeToast();
      }
    },

    manualDismiss() {
      this.isManualDissmissed = true;
      this.dismiss();
    },

    dismiss() {
      if (this.timer) this.timer.stop();
      this.isActive = false;

      this.notificationStore.remove(this);

      if (this.counter > 1) {
        eventBus.emit('toast-clear-context', {context: this.context, counter: this.counter, uid: this._.uid})
      }

      // Timeout for the animation complete before destroying
      setTimeout(() => this.removeToast(), 250)
    },

    removeToast() {
      if (this.timer) this.timer.stop();
      this.isActive = false;
      this.notificationStore.remove(this);

      this.onDismiss({
        context: this.context,
        severity: this.type
      });

      const wrapper = this.$refs.root;
      render(null, wrapper);
      removeElement(wrapper);
      if (this.parentTop.children.length === 0) {
        removeElement(this.parentTop);
      }
    },

    toggleTimer(newVal) {
      if (!this.pauseOnHover || !this.timer) return;
      newVal ? this.timer.pause() : this.timer.resume();
    }
  },
  computed: {
    transition() {
      return {
        enter: 'v-toast--fly-in',
        leave: this.isManualDissmissed ? 'v-toast--fade-out' : 'v-toast--fly-out'
      };
    }
  },
  beforeUnmount() {
    eventBus.off('toast-clear-context', this.onClearContext)
  }
})
</script>