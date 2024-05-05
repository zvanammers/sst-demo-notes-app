// import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Menu } from 'antd';
// import { useState } from 'react';
// import App from '../App';

// type MenuItem = Required<MenuProps>['items'][number];

// const items: MenuItem[] = [
// 	{
// 		label: 'Navigation One',
// 		key: 'mail',
// 		icon: <MailOutlined />,
// 	},
// 	{
// 		label: 'Navigation Two',
// 		key: 'app',
// 		icon: <AppstoreOutlined />,
// 	},
// 	{
// 		key: 'About',
// 		label: (
// 			<Link to="/about" className="[&.active]:font-bold">
// 				About
// 			</Link>
// 		),
// 	},
// ];

// const [current, setCurrent] = useState('mail');

// const onClick: MenuProps['onClick'] = (e) => {
// 	setCurrent(e.key);
// };

// export const Route = createRootRoute({
// 	component: () => (
// 		<>
// 			<App />
// 			{/* <div className="p-2 flex gap-2">
// 				<Link to="/" className="[&.active]:font-bold">
// 					Home
// 				</Link>{' '}
// 				<Link to="/about" className="[&.active]:font-bold">
// 					About
// 				</Link>
// 			</div> */}
// 			<hr />
// 			<Outlet />
// 			<TanStackRouterDevtools />
// 		</>
// 	),
// });

export const Route = createRootRoute({
	component: App,
});

import '../App.css';
import { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Flex } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Link } from '@tanstack/react-router';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

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
		// <Flex gap="middle" wrap>
		// 	<Layout style={layoutStyle}>
		// 		<Header style={headerStyle}>
		// 			<div className="demo-logo" />
		// 			<Menu
		// 				onClick={onClick}
		// 				selectedKeys={[current]}
		// 				mode="horizontal"
		// 				items={items}
		// 				theme="dark"
		// 			/>
		// 		</Header>
		// 		<Content style={contentStyle}>
		// 			<Content style={{ padding: '0 48px' }}>
		// 				<Breadcrumb style={{ margin: '16px 0' }}>
		// 					<Breadcrumb.Item>Home</Breadcrumb.Item>
		// 					<Breadcrumb.Item>List</Breadcrumb.Item>
		// 					<Breadcrumb.Item>App</Breadcrumb.Item>
		// 				</Breadcrumb>
		// 				<div
		// 					style={{
		// 						background: colorBgContainer,
		// 						minHeight: 280,
		// 						padding: 24,
		// 						borderRadius: borderRadiusLG,
		// 					}}
		// 				>
		// 					<hr />
		// 					<Outlet />
		// 					<TanStackRouterDevtools />
		// 				</div>
		// 			</Content>
		// 		</Content>
		// 		<Footer style={footerStyle}>Footer</Footer>
		// 	</Layout>
		// </Flex>
		<Layout style={{ minWidth: '100vh' }}>
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
						minWidth: '85vh',
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
