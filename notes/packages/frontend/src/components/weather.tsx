import { Card, Flex, Input, Col, Row } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { PopularWeatherStats } from '../../../core/models/currentWeather';
import getConfig from '../config';
import { useState } from 'react';

function Weather() {
	const [lat, setLat] = useState('-30.15');
	const [lon, setLon] = useState('');

	const formatQueryStrings = () => {
		if (!lat && !lon) {
			return '';
		}
		let str = '?';
		if (lat) {
			str = `${str}lat=${lat}`;
			if (lon) {
				str = `${str}&lon=${lon}`;
			}
		} else {
			str = `${str}lon=${lon}`;
		}
		return str;
	};

	const { isLoading, data, refetch, isFetching, error } =
		useQuery<PopularWeatherStats>({
			queryKey: ['weather'],
			queryFn: () =>
				axios
					.get(`${getConfig().apiUrl}/weather${formatQueryStrings()}`)
					.then((res) => res.data),
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
				{/* <Card title="Weather" style={gridStyle} > */}
				<Row gutter={16}>
					<Col span={12}>
						<Card>
							<Flex vertical gap={12}>
								<Input
									placeholder="Latitude"
									defaultValue={lat}
									value={lat}
									onChange={(e) => setLat(e.target.value)}
								/>
								<Input
									placeholder="Longitude"
									value={lon}
									onChange={(e) => setLon(e.target.value)}
								/>
							</Flex>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							onClick={onClick}
							loading={isLoading || isFetching}
							actions={[<ReloadOutlined key="fetch weather" />]}
						>
							Temp: {data?.temp}&deg;C
						</Card>
					</Col>
				</Row>
				{/* </Card> */}
			</>
		</div>
	);
}

export default Weather;
