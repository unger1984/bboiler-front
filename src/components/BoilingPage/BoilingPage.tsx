import React from 'react';

import './boiling.scss';
import { useStore } from 'effector-react';
import { $session } from '../../effects/session';
import { Preloader } from 'common/Preloader/Preloader';
import { SessionStatus } from 'dto/SessionDto';
import { BoilingStatus } from 'components/BoilingPage/BoilingStatus';

export const BoilingPage: React.FC = () => {
	const session = useStore($session);

	if (!session) return <Preloader />;

	const getDeviceStatus = (status: boolean) => {
		return status ? 'Включен' : 'Отключен';
	};

	const getStatus = (status: SessionStatus) => {
		switch (status) {
			case SessionStatus.Ready:
				return 'Залив воды';
			case SessionStatus.Done:
				return 'Варка завершена';
			case SessionStatus.Boiling:
				return 'Кипячение';
			case SessionStatus.Hop:
				return 'Засыпка хмеля';
			case SessionStatus.Filter:
				return 'Промывка';
			case SessionStatus.MashOut:
				return 'МэшАут';
			case SessionStatus.Malt:
				return 'Засыпка солода';
			case SessionStatus.Pause:
				return 'Температурная пауза';
			case SessionStatus.Heat:
				return 'Нагрев';
		}
	};

	return (
		<div className="boiling">
			<div className="row">
				<div>Температура:</div> <div>{session.temp}℃</div>
			</div>
			<div className="row">
				<div>ТЭН:</div> <div>{getDeviceStatus(session.ten)}</div>
			</div>
			<div className="row">
				<div>Насос:</div> <div>{getDeviceStatus(session.pump)}</div>
			</div>
			<div className="row">
				<div>Статус:</div> <div>{getStatus(session.status)}</div>
			</div>
			<BoilingStatus session={session} />
		</div>
	);
};
