export const toHHMMSS = (sec: number): string => {
	const hours = Math.floor(sec / 3600);
	const minutes = Math.floor((sec - hours * 3600) / 60);
	const seconds = sec - hours * 3600 - minutes * 60;

	const hh = hours < 10 ? '0' + hours : hours;
	const mm = minutes < 10 ? '0' + minutes : minutes;
	const ss = seconds < 10 ? '0' + seconds : seconds;
	return hh + ':' + mm + ':' + ss;
};

export const abc2 = (num: number, count = 1): string => {
	const fix = num.toFixed(count) + '';
	const parts = fix.split('.');
	let p1 = parts[0] + '';
	p1 = new Array(4 - (p1.length % 3)).join('U') + p1;
	return (
		p1
			.replace(/([0-9U]{3})/g, '$1 ')
			.replace(/U/g, '')
			.trim() + (parts[1] && parts[1] !== '0' ? ',' + parts[1] : '')
	);
};
