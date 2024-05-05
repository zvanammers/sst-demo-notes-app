import { Card } from 'antd';
import { useMemo, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { PopularWeatherStats } from '../../../core/models/currentWeather';
import { convertPopularWeatherStatsToCelcius } from '../../../core/src/convert';

const gridStyle: React.CSSProperties = {
	width: '50%',
	textAlign: 'center',
};

function Weather() {
	// const [weather, setWeather] = useState<PopularWeatherStats>();
	// const [temp, setTemp] = useState(0);

	const { isLoading, data, refetch, isFetching } =
		useQuery<PopularWeatherStats>({
			queryKey: ['weather'],
			queryFn: () =>
				axios
					.get('https://qfegbj0ub3.execute-api.us-east-1.amazonaws.com/weather')
					.then((res) => res.data),
		});

	function onClick() {
		refetch();
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
