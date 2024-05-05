import '../App.css';
import { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Flex } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Link } from '@tanstack/react-router';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
	component: App,
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
			icon: <AppstoreOutlined />,
		},
		{
			key: 'About',
			label: (
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			),
			icon: <MailOutlined />,
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
			<Content style={{ padding: '0 48px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div
					style={{
						background: colorBgContainer,
						minHeight: '85vh',
						padding: 24,
						borderRadius: borderRadiusLG,
					}}
				>
					<hr />
					<Outlet />
					<TanStackRouterDevtools />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Created by Zoe van Ammers</Footer>
		</Layout>
	);
}
