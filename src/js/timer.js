// https://stackoverflow.com/a/3969760
export default class Timer {
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