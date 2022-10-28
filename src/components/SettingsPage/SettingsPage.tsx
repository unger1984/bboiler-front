import React from 'react';
import { useStore } from 'effector-react';
import {
	$settings,
	addHop,
	addPause,
	delHop,
	delPause,
	setHopTime,
	setPauseTemp,
	setPauseTime,
	setPumpPin,
	setTemBoiling,
	setTemMashOut,
	setTempDiff,
	setTempMalt,
	setTempName,
	setTenPin,
	setTimeBoiling,
	setTimeMashOut,
} from '../../effects/settings';
import { Preloader } from 'common/Preloader/Preloader';
import { getSettings, refreshDevices, saveSettings } from '../../effects/ws';

import './settings.scss';
import { $session } from '../../effects/session';
import { SessionStatus } from 'dto/Session';

export const SettingsPage: React.FC = () => {
	const settings = useStore($settings);
	const session = useStore($session);

	if (!session) {
		return <Preloader />;
	}

	if (!settings) {
		getSettings();
		return <Preloader />;
	}

	const handleTenPin = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseInt(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTenPin(num);
			}
		}
	};

	const handlePumpPin = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseInt(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setPumpPin(num);
			}
		}
	};

	const handleChangeDevice = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value) {
			setTempName(event.target.value);
		}
	};

	const handleTempMalt = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTempMalt(num);
			}
		}
	};

	const handleTempDiff = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTempDiff(num);
			}
		}
	};

	const handleTempMashOut = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTemMashOut(num);
			}
		}
	};

	const handleTimeMashOut = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTimeMashOut(num);
			}
		}
	};

	const handleTemBoiling = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTemBoiling(num);
			}
		}
	};

	const handleTimeBoiling = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setTimeBoiling(num);
			}
		}
	};

	const handleAddPause = () => {
		addPause();
	};

	const handleAddHop = () => {
		addHop();
	};

	const handleDelPause = (index: number) => {
		delPause(index);
	};

	const handleDelHop = (index: number) => {
		delHop(index);
	};

	const handleChangePauseTemp = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setPauseTemp({ index, temp: num });
			}
		}
	};

	const handleChangePauseTime = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setPauseTime({ index, time: num });
			}
		}
	};

	const handleChangeHopTime = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			const num = parseFloat(event.target.value.trim().replace(',', '.'));
			if (!isNaN(num)) {
				setHopTime({ index, time: num });
			}
		}
	};

	const handleSave = () => {
		const error = [];
		let temp = 0;
		for (const pause of settings.pauses) {
			if (pause.temp < temp) {
				error.push('Температура следующей паузы не может быть меньше предыдущей');
			}
			temp = pause.temp;
		}
		let time = 0;
		for (const hop of settings.hops) {
			if (hop.time < time) {
				error.push('Время заброса предыдущей порции хмеля не может быть меньше предыдущего');
			}
			time = hop.time;
		}
		if (error.length > 0) {
			alert(error);
		} else {
			saveSettings(settings).then(() => {
				alert('Настройки сохранены');
			});
		}
	};

	const handleCancel = () => {
		getSettings();
	};

	const handleRefreshDats = () => {
		refreshDevices();
	};

	const isDisabled = session.status !== SessionStatus.Ready;

	return (
		<div className="settings">
			<div className="row center">
				<h4>Основные настройки</h4>
			</div>
			<div className="row">
				<div>ТЭН GPIO PIN:</div>
				<div>
					<input type="number" value={settings.tenPin} onChange={handleTenPin} readOnly={isDisabled} />
				</div>
			</div>
			<div className="row">
				<div>Насос GPIO PIN:</div>
				<div>
					<input type="number" value={settings.pumpPin} onChange={handlePumpPin} readOnly={isDisabled} />
				</div>
			</div>
			<div className="row">
				<div>Допустимое падение температуры (℃):</div>
				<div>
					<input type="number" value={settings.tempDiff} onChange={handleTempDiff} readOnly={isDisabled} />
				</div>
			</div>
			<div className="row">
				<div>Датчик температуры:</div>
				<div>
					{settings.devices.length <= 0 ? (
						<span className="error">Подключите датчик!</span>
					) : (
						<select value={settings.tempName} disabled={isDisabled} onChange={handleChangeDevice}>
							{settings.devices.map(item => (
								<option key={item}>{item}</option>
							))}
						</select>
					)}
					<button onClick={handleRefreshDats}>o</button>
				</div>
			</div>
			<div className="row">
				<div>Допустимое падение температуры (℃):</div>
				<div>
					<input type="number" value={settings.tempDiff} onChange={handleTempDiff} readOnly={isDisabled} />
				</div>
			</div>
			<div className="row">
				<div>Температура засыпи солода (℃):</div>
				<div>
					<input type="number" value={settings.tempMalt} onChange={handleTempMalt} readOnly={isDisabled} />
				</div>
			</div>
			<div className="row center">
				<h4>Температурные паузы</h4>
			</div>
			<>
				{settings.pauses.map((item, index) => (
					<div key={`pause_${index}`} className="row center">
						<div>
							<input
								type="number"
								value={item.temp}
								onChange={event => handleChangePauseTemp(index, event)}
								readOnly={isDisabled}
							/>
							<span>℃</span>
							<input
								type="number"
								value={item.time}
								onChange={event => handleChangePauseTime(index, event)}
								readOnly={isDisabled}
							/>
							<span>мин.</span>
							{session.status === SessionStatus.Ready && settings.pauses.length > 1 && (
								<button onClick={() => handleDelPause(index)}>-</button>
							)}
						</div>
					</div>
				))}
				{session.status === SessionStatus.Ready && (
					<div className="row center">
						<button onClick={handleAddPause}>+</button>
					</div>
				)}
			</>
			<div className="row center">
				<h4>МэшАут</h4>
			</div>
			<div className="row">
				<div>Температура МэшАута (℃):</div>
				<div>
					<input
						type="number"
						value={settings.tempMashOut}
						onChange={handleTempMashOut}
						readOnly={isDisabled}
					/>
				</div>
			</div>
			<div className="row">
				<div>Время МэшАута (мин.):</div>
				<div>
					<input
						type="number"
						value={settings.timeMashOut}
						onChange={handleTimeMashOut}
						readOnly={isDisabled}
					/>
				</div>
			</div>
			<div className="row center">
				<h4>Кипячение</h4>
			</div>
			<div className="row">
				<div>Температура Кипячения (℃):</div>
				<div>
					<input
						type="number"
						value={settings.tempBoiling}
						onChange={handleTemBoiling}
						readOnly={isDisabled}
					/>
				</div>
			</div>
			<div className="row">
				<div>Время Кипячения (мин.):</div>
				<div>
					<input
						type="number"
						value={settings.timeBoiling}
						onChange={handleTimeBoiling}
						readOnly={isDisabled}
					/>
				</div>
			</div>
			<div className="row center">
				<h4>Вреям засыпи хмеля</h4>
			</div>
			<>
				{settings.hops.map((item, index) => (
					<div key={`hop_${index}`} className="row center">
						<div>
							<input
								type="number"
								value={item.time}
								onChange={event => handleChangeHopTime(index, event)}
								readOnly={isDisabled}
							/>
							<span>мин.</span>
							{session.status === SessionStatus.Ready && settings.hops.length > 1 && (
								<button onClick={() => handleDelHop(index)}>-</button>
							)}
						</div>
					</div>
				))}
				{session.status === SessionStatus.Ready && (
					<div className="row center">
						<button onClick={handleAddHop}>+</button>
					</div>
				)}
			</>
			{!isDisabled && (
				<div className="row center buttons">
					<button className="btn btn--yellow" onClick={handleCancel}>
						Отменить
					</button>
					<button className="btn btn--green" onClick={handleSave}>
						Сохранить
					</button>
				</div>
			)}
		</div>
	);
};
