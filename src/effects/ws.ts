import { createEffect, createEvent, createStore } from 'effector';
import { WsMessage, WsMessageType } from 'dto/WsDto';
import { updateSession } from './session';
import { Session } from 'dto/Session';
import { updateSettings } from './settings';
import { Settings } from 'dto/Settings';
import localStorage from '../localStorage';

const RECONNECT_TIMEOUT = 1000;

export const getServer = createEffect<void, string | null>(() => {
	return localStorage.fetchServer();
});

export const saveServer = createEffect<string, string>(url => {
	localStorage.saveServer(url);
	return url;
});

export const $server = createStore<string | null>(null)
	.on(getServer.doneData, (__, server) => server)
	.on(saveServer.doneData, (__, server) => server);

getServer();

export const handleWsMwssage = createEffect<WsMessage, void>(msg => {
	switch (msg.command) {
		case WsMessageType.SESSION:
			updateSession(msg.data as Session);
			break;
		case WsMessageType.SETTINGS:
			updateSettings(msg.data as Settings);
			break;
	}
});

export const notWS = createEvent<void>('no ws');
export const connectWS = createEvent<WebSocket>('connect ws');

export const createWSSocket = createEffect<void, void>(() => {
	const server = $server.getState();
	if (server) {
		const socket = new WebSocket(server, 'bboiler');

		socket.onopen = () => {
			connectWS(socket);
		};
		socket.onerror = exc => {
			// eslint-disable-next-line no-console
			console.error('ws error', exc);
		};
		socket.onclose = () => {
			// eslint-disable-next-line no-console
			console.log('ws close');
			notWS();
			setTimeout(() => createWSSocket(), RECONNECT_TIMEOUT);
		};
		socket.onmessage = messageEvent => {
			try {
				handleWsMwssage(JSON.parse(messageEvent.data) as WsMessage);
			} catch (exc) {
				// eslint-disable-next-line no-console
				console.error('error message', exc);
			}
		};
	}
});

$server.subscribe(server => {
	if (server) createWSSocket();
});

export const $wsSocket = createStore<WebSocket | null>(null)
	.on(notWS, (__, ___) => null)
	.on(connectWS, (__, socket) => socket);

export const getSettings = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.SETTINGS, null)));
});

export const saveSettings = createEffect<Settings, void>(settings => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.SAVE_SETTINGS, settings)));
});

export const manualTen = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.MANUAL_TEN, null)));
});

export const manualPump = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.MANUAL_PUMP, null)));
});

export const doneWater = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DONE_WATER, null)));
});

export const doneMalt = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DONE_MALT, null)));
});

export const doneFilter = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DONE_FILTER, null)));
});

export const doneHop = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DONE_HOP, null)));
});

export const doneDone = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DONE, null)));
});

export const skip = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.SKIP, null)));
});

export const tenOn = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.TEN_ON, null)));
});

export const tenOff = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.TEN_OFF, null)));
});

export const pumpOn = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.PUMP_ON, null)));
});

export const pumpOff = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.PUMP_OFF, null)));
});

export const cancel = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.CANCEL, null)));
});

export const refreshDevices = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.REFRESH_SETTINGS, null)));
});
