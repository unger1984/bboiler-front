import { createEvent, createStore } from 'effector';
import { Settings } from 'dto/Settings';

export const updateSettings = createEvent<Settings>('update settings');

export const setTempDiff = createEvent<number>('set tempDiff');
export const setTempMalt = createEvent<number>('set tempMalt');
export const setTemMashOut = createEvent<number>('set tempMashOut');
export const setTimeMashOut = createEvent<number>('set timeMashOut');
export const setTemBoiling = createEvent<number>('set tempBoiling');
export const setTimeBoiling = createEvent<number>('set timeBoiling');
export const addPause = createEvent('add pause');
export const addHop = createEvent('add hop');
export const delPause = createEvent<number>('del pause');
export const delHop = createEvent<number>('del hop');
export const setPauseTemp = createEvent<{ temp: number; index: number }>('set pause temp');
export const setPauseTime = createEvent<{ time: number; index: number }>('set pause time');
export const setHopTime = createEvent<{ time: number; index: number }>('set hop time');
export const setTempName = createEvent<string>('set temp name');
export const setTenPin = createEvent<number>('set ten pin');
export const setPumpPin = createEvent<number>('set pump pin');

export const $settings = createStore<Settings | null>(null)
	.on(updateSettings, (__, settings) => settings)
	.on(setTempMalt, (old, tempMalt) => (old ? { ...old, tempMalt } : old))
	.on(setTempDiff, (old, tempDiff) => (old ? { ...old, tempDiff } : old))
	.on(setTemMashOut, (old, tempMashOut) => (old ? { ...old, tempMashOut } : old))
	.on(setTimeMashOut, (old, timeMashOut) => (old ? { ...old, timeMashOut } : old))
	.on(setTemBoiling, (old, tempBoiling) => (old ? { ...old, tempBoiling } : old))
	.on(setTimeBoiling, (old, timeBoiling) => (old ? { ...old, timeBoiling } : old))
	.on(addPause, (old, __) => (old ? { ...old, pauses: [...old.pauses, { temp: 0, time: 0 }] } : old))
	.on(addHop, (old, __) => (old ? { ...old, hops: [...old.hops, { time: 0 }] } : old))
	.on(delPause, (old, index) => {
		if (old) {
			const pauses = [...old.pauses];
			pauses.splice(index, 1);
			return { ...old, pauses };
		}
		return old;
	})
	.on(delHop, (old, index) => {
		if (old) {
			const hops = [...old.hops];
			hops.splice(index, 1);
			return { ...old, hops };
		}
		return old;
	})
	.on(setPauseTemp, (old, { temp, index }) => {
		if (old) {
			const pauses = [...old.pauses];
			pauses[index].temp = temp;
			return { ...old, pauses };
		}
		return old;
	})
	.on(setPauseTime, (old, { time, index }) => {
		if (old) {
			const pauses = [...old.pauses];
			pauses[index].time = time;
			return { ...old, pauses };
		}
		return old;
	})
	.on(setHopTime, (old, { time, index }) => {
		if (old) {
			const hops = [...old.hops];
			hops[index].time = time;
			return { ...old, hops };
		}
		return old;
	})
	.on(setTempName, (old, tempName) => (old ? { ...old, tempName } : old))
	.on(setTenPin, (old, tenPin) => (old ? { ...old, tenPin } : old))
	.on(setPumpPin, (old, pumpPin) => (old ? { ...old, pumpPin } : old));
