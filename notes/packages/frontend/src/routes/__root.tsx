import '../App.css';
import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Grid, Layout, Menu, theme } from 'antd';
import { ChartLine, CloudMoon, HouseLine } from '@phosphor-icons/react';
const { Header, Content, Footer } = Layout;
import { Link, useRouterState } from '@tanstack/react-router';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import notFound from '../common/components/notFound';
import getConfig from '../config';

export const Route = createRootRoute({
	component: App,
	notFoundComponent: notFound,
});

const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

function App() {
	const router = useRouterState();
	const items: MenuItem[] = [
		{
			key: 'Home',
			label: (
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>
			),
			icon: <HouseLine />,
		},
		{
			key: 'Weather',
			label: (
				<Link to="/weather" className="[&.active]:font-bold">
					Current Weather
				</Link>
			),
			icon: <CloudMoon />,
		},
		{
			key: 'Forecast',
			label: (
				<Link to="/forecast" className="[&.active]:font-bold">
					Weather Forecast
				</Link>
			),
			icon: <ChartLine />,
		},
	];

	const [current, setCurrent] = useState('Home');

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (router.location.pathname === '/') {
			setCurrent('Home');
		} else if (router.location.pathname === '/weather') {
			setCurrent('Weather');
		} else if (router.location.pathname === '/forecast') {
			setCurrent('Forecast');
		}
	}, [window.location.pathname]);

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const isLargeWindow = () => {
		const { xs } = useBreakpoint();
		if (xs) return false;
		return true;
	};

	return (
		<Layout>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className="demo-logo" />
				<Menu
					onClick={onClick}
					selectedKeys={[current]}
					mode="horizontal"
					items={items}
					theme="dark"
					style={{ flex: 1, minWidth: 0 }}
				/>
			</Header>
			<Content
				style={
					isLargeWindow() ? { padding: '48px 48px' } : { padding: '16px 16px' }
				}
			>
				<div
					style={{
						background: colorBgContainer,
						height: '100%',
						padding: 24,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
					{getConfig().dev && <TanStackRouterDevtools />}
				</div>
			</Content>
			{isLargeWindow() && (
				<Footer style={{ textAlign: 'center' }}>
					Created by Zoe van Ammers
				</Footer>
			)}
		</Layout>
	);
}
