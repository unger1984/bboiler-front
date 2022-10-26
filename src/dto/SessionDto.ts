/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum SessionStatus {
	Ready = 'READY', // ожидание старта
	Heat = 'HEAT', // подогрев до нужной температуры
	Malt = 'MALT', // засыпь
	Pause = 'PAUSE', // пауза
	MashOut = 'MASHOUT', // мешаут
	Filter = 'FILTER', // промывка
	Boiling = 'BOILING', // кипячение
	Hop = 'HOP', // засыпь хмеля
	Done = 'DONE', // варка завершена
}

export interface SessionDto {
	temp: number; // текущая температура
	time: Date | null; // время старта
	current: Date;
	ten: boolean; // включен ли ТЭН
	pump: boolean; // включен ли насос
	status: SessionStatus; // текущий статус
	pause: number; // номер текущей паузы (от 1)
	hop: number; // номер текущей зазыпи хмеля
}
