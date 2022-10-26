import React from 'react';

import './boiling.scss';
import { useStore } from 'effector-react';
import { $session } from '../../effects/session';
import { Preloader } from 'common/Preloader/Preloader';
import { SessionStatus } from 'dto/SessionDto';
import { BoilingStatus } from 'components/BoilingPage/BoilingStatus';
import { abc2 } from 'utils/utils';
import { pumpOff, pumpOn, tenOff, tenOn } from '../../effects/ws';

export const BoilingPage: React.FC = () => {
	const session = useStore($session);

	if (!session) return <Preloader />;

	if (session.status === SessionStatus.Error) {
		return (
			<div className="boiling">
				<BoilingStatus session={session} />
			</div>
		);
	}

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
			case SessionStatus.Error:
				return 'Ошибка';
		}
	};

	const handleSwicthPump = () => {
		if (session.pump) pumpOff();
		else pumpOn();
	};

	const handleSwicthTen = () => {
		if (session.ten) tenOff();
		else tenOn();
	};

	return (
		<div className="boiling">
			<div className="row">
				<div>Температура:</div> <div>{abc2(session.temp, 1)}℃</div>
			</div>
			<div className="row">
				<div>ТЭН:</div>{' '}
				<div>
					<a onClick={handleSwicthTen}>{getDeviceStatus(session.ten)}</a>
				</div>
			</div>
			<div className="row">
				<div>Насос:</div>{' '}
				<div>
					<a onClick={handleSwicthPump}>{getDeviceStatus(session.pump)}</a>
				</div>
			</div>
			<div className="row">
				<div>Статус:</div> <div>{getStatus(session.status)}</div>
			</div>
			<BoilingStatus session={session} />
		</div>
	);
};
