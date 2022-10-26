import 'reflect-metadata';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';

import './scss/index.scss';
import ScrollToTop from 'common/ScrollToTop';
import { App } from 'components/App';
import { createWSSocket } from './effects/ws';

createWSSocket();

render(
	<Router>
		<ScrollToTop>
			<App />
		</ScrollToTop>
	</Router>,
	document.getElementById('app'),
);
