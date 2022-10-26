import { createEffect, createEvent, createStore } from 'effector';
import { WsMessage, WsMessageType } from 'dto/WsDto';
import { updateSession } from './session';
import { SessionDto } from 'dto/SessionDto';
import { updateSettings } from './settings';
import { SettingsDto } from 'dto/SettingsDto';
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
		case WsMessageType.Session:
			updateSession(msg.data as SessionDto);
			break;
		case WsMessageType.Settings:
			updateSettings(msg.data as SettingsDto);
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
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.Settings, null)));
});

export const saveSettings = createEffect<SettingsDto, void>(settings => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.SaveSettings, settings)));
});

export const doneWater = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DoneWater, null)));
});

export const doneMalt = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DoneMalt, null)));
});

export const doneFilter = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DoneFilter, null)));
});

export const doneHop = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.DoneHop, null)));
});

export const doneDone = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.Done, null)));
});

export const skip = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.Skip, null)));
});

export const tenOn = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.TenOn, null)));
});

export const tenOff = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.TenOff, null)));
});

export const pumpOn = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.PumpOn, null)));
});

export const pumpOff = createEffect<void, void>(() => {
	$wsSocket.getState()?.send(JSON.stringify(new WsMessage(WsMessageType.PumpOff, null)));
});
