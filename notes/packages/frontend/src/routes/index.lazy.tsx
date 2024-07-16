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
			<h3>Australian Weather</h3>
			<Row gutter={[16, 24]}>
				<Col span={12}>
					<Card
						hoverable
						onClick={() => navigate({ to: '/weather' })}
						cover={<img alt="sun" src={ausMap} />}
					>
						Current Australian Weather
					</Card>
				</Col>
				<Col span={12} />
			</Row>
		</div>
	);
}
