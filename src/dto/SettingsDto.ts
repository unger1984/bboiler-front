export interface PauseDto {
	temp: number; // температура паузы
	time: number; // время паузы
}

export interface HopDto {
	time: number;
}

export interface SettingsDto {
	tempName: string; // датчик температуры
	tempDevices: string[]; // список датчиков
	tempMalt: number; // температура засыпи
	tempMashOut: number; // температура мэшаута
	timeMashOut: number; // время мэшаута
	pauses: PauseDto[]; // температурные паузы
	timeBoiling: number; // время кипячения
	tempBoiling: number; // температура кипения
	hops: HopDto[]; // время засыпи хмеля
	tempDiff: number; // на сколько градусов во время паузы может упасть температура
}
