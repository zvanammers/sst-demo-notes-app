import { Card } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { PopularWeatherStats } from '../../../core/models/currentWeather';
import getConfig from '../config';

const gridStyle: React.CSSProperties = {
	width: '50%',
	textAlign: 'center',
};

function Weather() {
	const { isLoading, data, refetch, isFetching, error } =
		useQuery<PopularWeatherStats>({
			queryKey: ['weather'],
			queryFn: () =>
				axios.get(`${getConfig().apiUrl}/weather`).then((res) => res.data),
		});

	function onClick() {
		refetch();
	}

	if (error) {
		return <>Error</>;
	}

	return (
		<div className="p-2">
			<>
				<Card title="Weather">
					<Card
						onClick={onClick}
						style={gridStyle}
						loading={isLoading || isFetching}
						actions={[<ReloadOutlined key="fetch weather" />]}
					>
						Temp: {data?.temp}&deg;C
					</Card>
				</Card>
			</>
		</div>
	);
}

export default Weather;
