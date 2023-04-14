export default class Timer {
    private startedAt;
    private callback;
    private delay;
    private timer;
    constructor(callback: Function, delay: number);
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
}
