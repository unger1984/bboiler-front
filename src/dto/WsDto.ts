// eslint-disable-next-line no-shadow
export enum WsMessageType {
	Session = 'SESSION',
	Settings = 'SETTINGS',
	SaveSettings = 'SAVE_SETTINGS',
	DoneWater = 'DONE_WATER',
	DoneMalt = 'DONE_MALT',
	DoneFilter = 'DONE_FILTER',
	DoneHop = 'DONE_HOP',
	Done = 'DONE',
	Skip = 'SKIP',
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
