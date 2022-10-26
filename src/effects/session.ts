import { createEvent, createStore } from 'effector';
import { SessionDto } from 'dto/SessionDto';

export const updateSession = createEvent<SessionDto>('update session');

export const $session = createStore<SessionDto | null>(null).on(updateSession, (__, session) => session);
