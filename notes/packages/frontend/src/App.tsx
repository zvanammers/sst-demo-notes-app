import { useState } from 'react';
import './App.css';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Link } from '@tanstack/react-router';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

type MenuItem = Required<MenuProps>['items'][number];

function App2() {
	const items: MenuItem[] = [
		{
			label: 'Navigation One',
			key: 'mail',
			icon: <MailOutlined />,
		},
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
		<div>
			<Layout>
				<Header>
					<div className="demo-logo" />
					<Menu
						onClick={onClick}
						selectedKeys={[current]}
						mode="horizontal"
						items={items}
						theme="dark"
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
							minHeight: 280,
							padding: 24,
							borderRadius: borderRadiusLG,
						}}
					>
						<hr />
						<Outlet />
						<TanStackRouterDevtools />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Created by Zoe van Ammers
				</Footer>
			</Layout>
			{/* <div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<Button type="primary" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p> */}
		</div>
	);
}

export default App;
