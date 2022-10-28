import React from 'react';

import './boiling.scss';
import { useStore } from 'effector-react';
import { $session } from '../../effects/session';
import { Preloader } from 'common/Preloader/Preloader';
import { SessionStatus } from 'dto/Session';
import { BoilingStatus } from 'components/BoilingPage/BoilingStatus';
import { abc2, toHHMMSS } from 'utils/utils';
import { cancel, manualPump, manualTen, pumpOff, pumpOn, tenOff, tenOn } from '../../effects/ws';
import { $settings } from '../../effects/settings';
import moment from 'moment';

export const BoilingPage: React.FC = () => {
	const session = useStore($session);
	const settings = useStore($settings);

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

	const handleSwicthPump = () => {
		if (session.manualPump) {
			if (session.pump) pumpOff();
			else pumpOn();
		}
	};

	const handleSwicthTen = () => {
		if (session.manualTen) {
			if (session.ten) tenOff();
			else tenOn();
		}
	};

	const handleManualTen = () => {
		manualTen();
	};

	const handleManualPump = () => {
		manualPump();
	};

	const handleCancel = () => {
		if (confirm('Отменить варку?')) {
			cancel();
		}
	};

	return (
		<div className="boiling">
			<div className="row">
				<div>Температура:</div>{' '}
				<div>
					{abc2(session.temp, 1)}℃ {settings?.tempName === 'Test' && <span className="red">Тестовый</span>}
				</div>
			</div>
			<div className="row">
				<div>ТЭН:</div>{' '}
				<label onClick={handleManualTen}>
					Ручной режим
					<input type="checkbox" checked={session.manualTen} />
				</label>
				<div>
					{session.manualTen ? (
						<a onClick={handleSwicthTen}>{getDeviceStatus(session.ten)}</a>
					) : (
						<>{getDeviceStatus(session.ten)}</>
					)}
				</div>
			</div>
			<div className="row">
				<div>Насос:</div>{' '}
				<label onClick={handleManualPump}>
					Ручной режим
					<input type="checkbox" checked={session.manualPump} />
				</label>
				<div>
					{session.manualPump ? (
						<a onClick={handleSwicthPump}>{getDeviceStatus(session.pump)}</a>
					) : (
						<>{getDeviceStatus(session.pump)}</>
					)}
				</div>
			</div>
			<div className="row">
				<div>Статус:</div> <div>{getStatus(session.status)}</div>
			</div>
			<div className="row">
				<div>Время варки:</div>{' '}
				<div>
					{session.startTime
						? toHHMMSS(moment(session.currentTime).diff(moment(session.startTime), 'seconds'))
						: 'Не начата'}
				</div>
			</div>
			<BoilingStatus session={session} />
			{session.status !== SessionStatus.Done && session.status !== SessionStatus.Ready && (
				<div className="row buttons">
					<button className="btn btn--red" onClick={handleCancel}>
						Отменить варку
					</button>
				</div>
			)}
		</div>
	);
};
