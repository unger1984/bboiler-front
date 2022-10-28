import { createEvent, createStore } from 'effector';
import { Session } from 'dto/Session';

export const updateSession = createEvent<Session>('update session');

export const $session = createStore<Session | null>(null).on(updateSession, (__, session) => session);
