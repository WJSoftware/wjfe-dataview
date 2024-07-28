import { browser } from "$app/environment";

export class KeyStateStore {
    #shift = $state(false);
    #ctrl = $state(false);
    #alt = $state(false);

    constructor() {
        if (browser) {
            window.addEventListener('keydown', ev => this.#updateKeyStates(ev));
            window.addEventListener('keyup', ev => this.#updateKeyStates(ev));
        }
    }

    #updateKeyStates(ev: KeyboardEvent) {
        this.#alt = ev.altKey;
        this.#ctrl = ev.ctrlKey;
        this.#shift = ev.shiftKey;
    }

    get shift() {
        return this.#shift;
    }
    get ctrl() {
        return this.#ctrl;
    }
    get alt() {
        return this.#alt;
    }
};

export default new KeyStateStore();
