import React from 'react';
import { Routes, Route, Navigate, NavLink, useLocation, Link } from 'react-router-dom';

import './main-app.scss';
import { BoilingPage } from 'components/BoilingPage/BoilingPage';
import { SettingsPage } from 'components/SettingsPage/SettingsPage';
import { useStore } from 'effector-react';
import { $server, $wsSocket } from '../effects/ws';
import { ServerPage } from 'components/ServerPage/ServerPage';

export const App: React.FC = () => {
	const socket = useStore($wsSocket);
	const server = useStore($server);
	const { pathname } = useLocation();

	if (!server && pathname !== '/server') return <Navigate to="/server" />;

	return (
		<div className="main-app">
			{!socket && (
				<div className="main-app__error">
					Нет соединения с пивоварней. Изменить&nbsp;<Link to="/server">адрес сервера</Link>
				</div>
			)}
			<div className="main-app__tabs">
				<NavLink to="/boiling" end>
					Варка
				</NavLink>
				<NavLink to="/settings">Настройки</NavLink>
			</div>
			<div className="main-app__content">
				<Routes>
					<Route path="*" element={<Navigate to="/boiling" />} />
					<Route path="/boiling" element={<BoilingPage />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="/server" element={<ServerPage />} />
				</Routes>
			</div>
		</div>
	);
};
