import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Row, Col, Card } from 'antd';
import ausMap from '../assets/aus-temp.png';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const navigate = useNavigate();
	return (
		<div className="p-2">
			<h3>Welcome to this weather website!</h3>
			<Row gutter={[16, 24]}>
				<Col span={3} />
				<Col span={18}>
					<body>
						This was made to practice setting up the skeleton, and implementing
						a full stack website. As part of this, I set up linting, all CI/CD
						workflows, testing, and the folder structures. <br />
						<br /> This site is a static site, with a ReactTs front-end. I used
						SST to build the backend, and deploy the application to AWS.
					</body>
				</Col>
				<Col span={3} />
				<Col span={12}>
					<Card
						hoverable
						onClick={() => navigate({ to: '/weather' })}
						cover={<img alt="sun" src={ausMap} />}

						// style={{ width: 240 }}
						// title="Current Australian Weather"
					>
						Current Australian Weather
					</Card>
				</Col>
				<Col span={12} />
			</Row>
		</div>
	);
}
