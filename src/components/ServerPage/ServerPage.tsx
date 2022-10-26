import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import './server.scss';
import { $server, saveServer } from '../../effects/ws';

export const ServerPage: React.FC = () => {
	const [url, setUrl] = useState<string>('');
	const server = useStore($server);

	useEffect(() => {
		setUrl(server ?? '');
	}, [server]);

	const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setUrl(event.target.value);
		}
	};

	const handleSave = () => {
		const regEx = /^((wss?):\/\/)/;
		if (regEx.test(url)) {
			saveServer(url).then(() => {
				self.location.assign('/');
			});
		} else {
			alert('Не верный формат URL');
		}
	};

	return (
		<div className="server">
			<div className="row center">
				<input type="text" placeholder="ws://192.168.0.1:8089" value={url} onChange={handleChangeUrl} />
			</div>
			<div className="row buttons">
				<button className="btn btn--green" onClick={handleSave}>
					Сохранить
				</button>
			</div>
		</div>
	);
};
