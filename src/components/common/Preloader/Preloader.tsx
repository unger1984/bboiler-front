import React from 'react';

import './preloader.scss';

export const Preloader: React.FC = () => {
	return (
		<div id="loader">
			<div className="loader">Loading...</div>
			<div className="lds-dual-ring" />
		</div>
	);
};
