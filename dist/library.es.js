import { h, render, defineComponent, ref, watchEffect, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, toDisplayString, createElementBlock, createCommentVNode, vShow } from "vue";
var index = "";
function removeElement(el) {
  var _a;
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else {
    (_a = el.parentNode) == null ? void 0 : _a.removeChild(el);
  }
}
function createComponent(component, props, slots = {}) {
  let parentContainer = document.querySelector(".v-toast-container");
  if (!parentContainer) {
    parentContainer = document.createElement("div");
    parentContainer.classList.add("v-toast-container");
    document.body.appendChild(parentContainer);
  }
  const vNode = h(component, props, slots);
  const container = document.createElement("div");
  container.classList.add("v-toast--pending");
  parentContainer.appendChild(container);
  render(vNode, container);
  return vNode.component;
}
class Timer {
  constructor(callback, delay) {
    this.startedAt = Date.now();
    this.callback = callback;
    this.delay = delay;
    this.start();
  }
  start() {
    this.timer = setTimeout(this.callback, this.delay);
  }
  pause() {
    this.stop();
    this.delay -= Date.now() - this.startedAt;
  }
  resume() {
    this.stop();
    this.startedAt = Date.now();
    this.timer = setTimeout(this.callback, this.delay);
  }
  stop() {
    clearTimeout(this.timer);
  }
}
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
const eventBus = mitt();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
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
      default: "success"
    },
    context: {
      type: String,
      default: "default"
    },
    labelCloseAll: {
      type: String,
      default: "Close All"
    },
    duration: {
      type: Number,
      default: 3e3
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
    }
  },
  data() {
    return {
      isActive: false,
      isManualDissmissed: false,
      parentTop: null
    };
  },
  setup(props) {
    const notificationStore = useNotificationStore();
    const notifications2 = notificationStore.state();
    const counter = ref(0);
    watchEffect(() => {
      counter.value = notifications2.value.filter((c) => c.context === props.context).length;
    });
    return {
      notificationStore,
      counter
    };
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    eventBus.on("toast-clear-context", this.onClearContext);
  },
  methods: {
    setupContainer() {
      this.parentTop = document.querySelector(`.v-toast__context-container--${this.context}`);
      if (this.parentTop)
        return;
      if (!this.parentTop) {
        this.parentTop = document.createElement("div");
        this.parentTop.className = `v-toast__context-container v-toast__context-container--${this.context}`;
      }
      const container = document.querySelector(".v-toast-container");
      container.appendChild(this.parentTop);
    },
    showNotice() {
      const wrapper = this.$refs.root.parentElement;
      this.parentTop.insertAdjacentElement("beforeend", this.$refs.root);
      removeElement(wrapper);
      this.isActive = true;
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
      if (this.timer)
        this.timer.stop();
      this.isActive = false;
      this.notificationStore.remove(this);
      if (this.counter > 1) {
        eventBus.emit("toast-clear-context", { context: this.context, counter: this.counter, uid: this._.uid });
      }
      setTimeout(() => this.removeToast(), 250);
    },
    removeToast() {
      if (this.timer)
        this.timer.stop();
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
      if (!this.pauseOnHover || !this.timer)
        return;
      newVal ? this.timer.pause() : this.timer.resume();
    }
  },
  computed: {
    transition() {
      return {
        enter: "v-toast--fly-in",
        leave: this.isManualDissmissed ? "v-toast--fade-out" : "v-toast--fly-out"
      };
    }
  },
  beforeUnmount() {
    eventBus.off("toast-clear-context", this.onClearContext);
  }
});
const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { class: "v-toast__dismiss-icon" }, null, -1);
const _hoisted_2 = ["textContent"];
const _hoisted_3 = /* @__PURE__ */ createElementVNode("div", { class: "v-toast__icon" }, null, -1);
const _hoisted_4 = { class: "v-toast__text" };
const _hoisted_5 = ["textContent"];
const _hoisted_6 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        ref: "root",
        role: "alert",
        class: normalizeClass(["v-toast__item", [`v-toast__item--${_ctx.type}`, `v-toast__item--top-right`]]),
        onMouseover: _cache[1] || (_cache[1] = ($event) => _ctx.toggleTimer(true)),
        onMouseleave: _cache[2] || (_cache[2] = ($event) => _ctx.toggleTimer(false))
      }, [
        createElementVNode("div", {
          class: normalizeClass(["v-toast__dismiss", { "v-toast__dismiss--group": _ctx.counter > 1 }]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.manualDismiss && _ctx.manualDismiss(...args))
        }, [
          _hoisted_1,
          createElementVNode("div", {
            class: "v-toast__dismiss-label",
            textContent: toDisplayString(_ctx.labelCloseAll)
          }, null, 8, _hoisted_2)
        ], 2),
        _hoisted_3,
        createElementVNode("div", _hoisted_4, [
          _ctx.title ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: "v-toast__title",
            textContent: toDisplayString(_ctx.title)
          }, null, 8, _hoisted_5)) : createCommentVNode("", true),
          createElementVNode("p", {
            class: "v-toast__message",
            innerHTML: _ctx.message.substring(0, 128)
          }, null, 8, _hoisted_6)
        ])
      ], 34), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 1
  }, 8, ["enter-active-class", "leave-active-class"]);
}
var ToastComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const useToast = (globalProps = {}) => {
  return {
    open(options) {
      let message = null;
      if (typeof options === "string")
        message = options;
      const defaultProps = {
        message
      };
      const propsData = Object.assign({}, defaultProps, globalProps, options);
      return createComponent(ToastComponent, propsData);
    },
    clear() {
      eventBus.emit("toast-clear");
    },
    success(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: "success"
      }, options));
    },
    error(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: "error"
      }, options));
    },
    info(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: "info"
      }, options));
    },
    warning(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: "warning"
      }, options));
    },
    default(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: "default"
      }, options));
    }
  };
};
const Severity = Object.freeze({
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  DEFAULT: "default"
});
const notifications = ref([]);
const Store = {
  add(context, severity) {
    notifications.value.push({
      context,
      severity
    });
  },
  sub(ctx) {
    const state = this.get(ctx);
    return state.value--;
  },
  get(ctx) {
    return notifications.value.filter((c) => c.context === ctx);
  },
  count(context) {
    return this.get(context).length;
  },
  state() {
    return notifications;
  },
  remove(component) {
    notifications.value = notifications.value.filter((n) => n.uid !== component._.uid);
  }
};
const useNotificationStore = () => {
  return Store;
};
const useNotificationCenter = (globalProps) => {
  const $toast = useToast();
  return {
    open(options) {
      let message = null;
      if (typeof options === "string") {
        message = options;
        options = {};
      }
      const defaultProps = {
        type: Severity.DEFAULT,
        context: Severity.DEFAULT,
        message
      };
      const props = Object.assign({}, defaultProps, globalProps, options);
      const instance = $toast.open(props);
      notifications.value.push({
        uid: instance.uid,
        dismiss: instance.ctx.dismiss,
        context: props.context,
        type: props.type
      });
      instance.ctx.showNotice();
    },
    error(message, opts) {
      const options = Object.assign({}, {
        type: Severity.ERROR,
        context: Severity.ERROR,
        message
      }, opts);
      this.open(options);
    },
    success(message, opts) {
      const options = Object.assign({}, {
        type: Severity.SUCCESS,
        context: Severity.SUCCESS,
        message
      }, opts);
      this.open(options);
    },
    info(message, opts) {
      const options = Object.assign({}, {
        type: Severity.INFO,
        context: Severity.INFO,
        message
      }, opts);
      this.open(options);
    },
    warning(message, opts) {
      const options = Object.assign({}, {
        type: Severity.WARNING,
        context: Severity.WARNING,
        message
      }, opts);
      this.open(options);
    },
    clearAll: () => {
      $toast.clear();
    }
  };
};
const NotificationcenterPlugin = {
  install: (app, options = {}) => {
    let instance = useNotificationCenter(options);
    app.config.globalProperties.$notificationCenter = instance;
    app.provide("$notificationCenter", instance);
  }
};
export { NotificationcenterPlugin, NotificationcenterPlugin as default, useNotificationCenter, useNotificationStore };
