export const toHHMMSS = (sec: number): string => {
	const hours = Math.floor(sec / 3600);
	const minutes = Math.floor((sec - hours * 3600) / 60);
	const seconds = sec - hours * 3600 - minutes * 60;

	const hh = hours < 10 ? '0' + hours : hours;
	const mm = minutes < 10 ? '0' + minutes : minutes;
	const ss = seconds < 10 ? '0' + seconds : seconds;
	return hh + ':' + mm + ':' + ss;
};
