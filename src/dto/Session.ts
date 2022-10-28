/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum SessionStatus {
	Ready = 'READY', // Ждет включения
	Heat = 'HEAT', // Нагрев до заданной температуры
	Malt = 'MALT', // засыпь
	Pause = 'PAUSE', // пауза
	MashOut = 'MASHOUT', // мешаут
	Filter = 'FILTER', // промывка
	Boiling = 'BOILING', // кипячение
	Hop = 'HOP', // засыпь хмеля
	Done = 'DONE', // Варка завершена
}

export interface Session {
	temp: number; // температура текущая
	tempMax: number; // температура следующая
	manualTen: boolean; // ручное управление тэном
	manualPump: boolean; // ручное управление насосом
	ten: boolean; // состояние тэна
	pump: boolean; // состояние насоса
	startTime: Date | null; // время начала варки
	lastTime: Date | null; // время пначала последней операции
	currentTime: Date; // текущее время
	minutes: number; // время на операцию
	status: SessionStatus; // текущий статус
	pause: number;
	hop: number;
}
