import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Row, Col, Card } from 'antd';
import { ChartLine, CloudMoon } from '@phosphor-icons/react';

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
						bordered={false}
						hoverable
						onClick={() => navigate({ to: '/weather' })}
						cover={<CloudMoon size={200} color="#0f3f6c" />}
					>
						Current Australian Weather
					</Card>
				</Col>
				<Col span={12}>
					<Card
						bordered={false}
						hoverable
						onClick={() => navigate({ to: '/forecast' })}
						cover={<ChartLine size={200} color="#0f3f6c" />}
					>
						Australian Weather Forecast
					</Card>
				</Col>
				<Col span={12} />
			</Row>
		</div>
	);
}
