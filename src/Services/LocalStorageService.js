
class LocalStorageService {
    
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LocalStorageService();