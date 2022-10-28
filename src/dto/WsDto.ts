// eslint-disable-next-line no-shadow
export enum WsMessageType {
	SESSION = 'SESSION',
	SETTINGS = 'SETTINGS',
	SAVE_SETTINGS = 'SAVE_SETTINGS',
	MANUAL_TEN = 'MANUAL_TEN',
	MANUAL_PUMP = 'MANUAL_PUMP',
	TEN_ON = 'TEN_ON',
	TEN_OFF = 'TEN_OFF',
	PUMP_ON = 'PUMP_ON',
	PUMP_OFF = 'PUMP_OFF',
	DONE_WATER = 'DONE_WATER',
	DONE_MALT = 'DONE_MALT',
	DONE_FILTER = 'DONE_FILTER',
	DONE_HOP = 'DONE_HOP',
	CANCEL = 'CANCEL',
	SKIP = 'SKIP',
	DONE = 'DONE',
	REFRESH_SETTINGS = 'REFRESH_SETTINGS',
}

export class WsMessage {
	command: WsMessageType;
	data: any;

	constructor(cmd: WsMessageType, data: any) {
		this.command = cmd;
		this.data = data;
	}
}

export class WsMessageTemp {
	temp: number;

	constructor(temp: number) {
		this.temp = temp;
	}
}
