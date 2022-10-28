export interface PauseType {
	time: number;
	temp: number;
}

export interface HopType {
	time: number;
}

export interface Settings {
	tempMalt: number;
	tempMashOut: number;
	tempBoiling: number;
	timeBoiling: number;
	timeMashOut: number;
	tempDiff: number;
	pauses: PauseType[];
	hops: HopType[];
	tempName: string;
	devices: string[];
	tenPin: number;
	pumpPin: number;
}
