import { Row, Col } from 'antd';
import Plant from '../common/components/plant';

function PlantPage() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={'8'}>
					<Plant />
				</Col>
				<Col span={'8'}>
					<Plant />
				</Col>
				<Col span={'8'}>
					<Plant />
				</Col>

				<Col span={'8'}>
					<Plant />
				</Col>
				<Col span={'8'}>
					<Plant />
				</Col>
				<Col span={'8'}>
					<Plant />
				</Col>
			</Row>
		</>
	);
}

export default PlantPage;
