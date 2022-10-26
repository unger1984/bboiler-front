import React from 'react';
import { SessionDto, SessionStatus } from 'dto/SessionDto';
import { useStore } from 'effector-react';
import { $settings } from '../../effects/settings';
import { doneDone, doneFilter, doneHop, doneMalt, doneWater, getSettings, skip } from '../../effects/ws';
import { Preloader } from 'common/Preloader/Preloader';
import { toHHMMSS } from 'utils/utils';
import moment from 'moment';

export interface BoilingStatusProps {
	session: SessionDto;
}

export const BoilingStatus: React.FC<BoilingStatusProps> = ({ session }) => {
	const settings = useStore($settings);

	if (!settings) {
		getSettings();
		return <Preloader />;
	}

	const handleDoneWater = () => {
		getSettings();
		doneWater();
	};

	const handleDoneMalt = () => {
		getSettings();
		doneMalt();
	};

	const handleDoneFilter = () => {
		getSettings();
		doneFilter();
	};

	const handleDoneHop = () => {
		getSettings();
		doneHop();
	};

	const handleDoneDone = () => {
		getSettings();
		doneDone();
	};

	const handleSkip = () => {
		if (confirm('Пропустить действие?')) {
			skip();
		}
	};

	switch (session.status) {
		case SessionStatus.Ready:
			return (
				<div className="status ready">
					<h4>Залейте воду</h4>
					<div className="status__buttons">
						<button className="btn btn--green" onClick={handleDoneWater}>
							ГОТОВО
						</button>
					</div>
				</div>
			);
		case SessionStatus.Heat:
			return (
				<div className="status heat">
					<h4>Нагрев</h4>
				</div>
			);
		case SessionStatus.Malt:
			return (
				<div className="status malt">
					<h4>Засыпте солод</h4>
					<div className="status__info">
						{toHHMMSS(moment(session.current).diff(moment(session.time), 'seconds'))}
					</div>
					<div className="status__buttons">
						<button className="btn btn--green" onClick={handleDoneMalt}>
							ГОТОВО
						</button>
					</div>
				</div>
			);
		case SessionStatus.Pause:
			return (
				<div className="status pause">
					<h4>
						{session.pause}я температурная пауза {settings.pauses[session.pause - 1].temp}℃{' '}
						{settings.pauses[session.pause - 1].time}мин
					</h4>
					<div className="status__info">
						{toHHMMSS(moment(session.current).diff(moment(session.time), 'seconds'))}
					</div>
					<div className="status__buttons">
						<button className="btn btn--yellow" onClick={handleSkip}>
							ПРОПУСТИТЬ
						</button>
					</div>
				</div>
			);
		case SessionStatus.MashOut:
			return (
				<div className="status mashout">
					<h4>
						МэшАут {settings.tempMashOut}℃ {settings.timeMashOut}мин
					</h4>
					<div className="status__info">
						{toHHMMSS(moment(session.current).diff(moment(session.time), 'seconds'))}
					</div>
					<div className="status__buttons">
						<button className="btn btn--yellow" onClick={handleSkip}>
							ПРОПУСТИТЬ
						</button>
					</div>
				</div>
			);
		case SessionStatus.Filter:
			return (
				<div className="status filter">
					<h4>Промойте солод и залейте на кипячение</h4>
					<div className="status__info">
						{toHHMMSS(moment(session.current).diff(moment(session.time), 'seconds'))}
					</div>
					<div className="status__buttons">
						<button className="btn btn--green" onClick={handleDoneFilter}>
							ГОТОВО
						</button>
					</div>
				</div>
			);
		case SessionStatus.Boiling:
			return (
				<div className="status boiling">
					<h4>Кипячение {settings.timeBoiling}мин</h4>
					<div className="status__info">
						{toHHMMSS(moment(session.current).diff(moment(session.time), 'seconds'))}
					</div>
				</div>
			);
		case SessionStatus.Hop:
			return (
				<div className="status hop">
					<h4>Засыпте {session.hop + 1}ю порцию хмеля</h4>
					<div className="status__info">
						{toHHMMSS(moment(session.current).diff(moment(session.time), 'seconds'))}
					</div>
					<div className="status__buttons">
						<button className="btn btn--yellow" onClick={handleSkip}>
							ПРОПУСТИТЬ
						</button>
						<button className="btn btn--green" onClick={handleDoneHop}>
							ГОТОВО
						</button>
					</div>
				</div>
			);
		case SessionStatus.Done:
			return (
				<div className="status done">
					<h4>Варка завершена!</h4>
					<div className="status__buttons">
						<button className="btn btn--green" onClick={handleDoneDone}>
							OK
						</button>
					</div>
				</div>
			);
	}
	return <div className="status"></div>;
};
