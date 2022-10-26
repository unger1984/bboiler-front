import React, { ComponentProps, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollToTop: React.FC<ComponentProps<any>> = ({ children }) => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return children;
};

export default ScrollToTop;
