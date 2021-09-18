class StoreAccessor {
    constructor(storeKey) {
        this.storeKey = `ir-${storeKey}`;
    }

    get() {
        return JSON.parse(localStorage.getItem(this.storeKey));
    }

    set(value) {
        localStorage.setItem(this.storeKey, JSON.stringify(value));
    }

    remove(value) {
        localStorage.removeItem(this.storeKey);
    }
}

export default StoreAccessor;
