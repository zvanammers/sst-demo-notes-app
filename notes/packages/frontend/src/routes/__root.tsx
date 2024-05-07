import '../App.css';
import { useState } from 'react';
import { SunFilled, HomeOutlined, CameraOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Link } from '@tanstack/react-router';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import notFound from '../components/notFound';

export const Route = createRootRoute({
	component: App,
	notFoundComponent: notFound,
});

type MenuItem = Required<MenuProps>['items'][number];

function App() {
	const items: MenuItem[] = [
		{
			key: 'Home',
			label: (
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>
			),
			icon: <HomeOutlined />,
		},
		{
			key: 'About',
			label: (
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			),
			icon: <CameraOutlined />,
		},
		{
			key: 'Weather',
			label: (
				<Link to="/weather" className="[&.active]:font-bold">
					Weather
				</Link>
			),
			icon: <SunFilled />,
		},
	];

	const [current, setCurrent] = useState('mail');

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key);
	};

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

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
			<Content style={{ padding: '48px 48px' }}>
				<div
					style={{
						background: colorBgContainer,
						minHeight: '85vh',
						padding: 24,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
					<TanStackRouterDevtools />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Created by Zoe van Ammers</Footer>
		</Layout>
	);
}
