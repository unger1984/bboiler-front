const storageKey = 'bboiler';
class LocalStorage {
	private storage: Storage | null;

	constructor() {
		this.storage = this.__supportsHtml5Storage() ? window.localStorage : null;
	}

	__supportsHtml5Storage(): boolean {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (exc) {
			return false;
		}
	}

	saveServer(url: string): void {
		if (!this.storage) {
			return;
		}
		this.storage.setItem(`${storageKey}-server`, url);
	}

	fetchServer(): string | null {
		const server = this.storage && this.storage.getItem(`${storageKey}-server`);
		if (server) {
			return server;
		}
		return null;
	}

	clear(): void {
		if (this.storage) {
			this.storage.clear();
		}
	}
}

export default new LocalStorage();
