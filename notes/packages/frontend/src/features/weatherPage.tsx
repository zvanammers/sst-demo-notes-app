import { Card, Flex, Col, Row, Select, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import getConfig from '../config';
import { useState } from 'react';
import inputTextField from '../common/components/inputTextField';
import type currentWeather from '@models/currentWeather';
import { type IconComponent, getWeatherIcon } from '../common/weatherIcons';

function Weather() {
	const [lat, setLat] = useState('-30.15');
	const [lon, setLon] = useState('155.44');
	const [locationType, setLocationType] = useState('Lat');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('');

	const formatQueryStrings = () => {
		// replace with API layer, including axios.get below
		if (locationType === 'Lat') {
			if (lat === '' && lon === '') {
				return '';
			}
			if (lat && lon) {
				return `?lat=${lat}&lon=${lon}`;
			}
			if (lat) {
				return `?lat=${lat}`;
			}
			return `?lon=${lon}`;
		}
		if (locationType === 'Postcode') {
			return `?postcode=${postcode}`;
		}
		if (locationType === 'City') {
			return `?city=${city}`;
		}
		return '';
	};

	const { isLoading, data, refetch, isFetching, error } =
		useQuery<currentWeather>({
			queryKey: ['weather'],
			queryFn: () =>
				axios
					.get(`${getConfig().apiUrl}/weather${formatQueryStrings()}`)
					.then((res) => res.data),
		});

	function onClick() {
		refetch();
	}

	const latLongUI = () => {
		return (
			<>
				{inputTextField(
					'Latitude',
					lat,
					setLat,
					<div style={{ width: 60 }}>Latitude</div>,
				)}
				{inputTextField(
					'Longitude',
					lon,
					setLon,
					<div style={{ width: 60 }}>Longitude</div>,
				)}
			</>
		);
	};

	const WeatherIcon: IconComponent = getWeatherIcon(
		data?.weather[0].icon ?? '',
	);

	return (
		<div className="p-2">
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<Space direction="vertical" size={8}>
						<Card style={{ placeContent: 'center' }}>
							<Select
								defaultValue="Lat/Lon"
								style={{ width: 120 }}
								onChange={setLocationType}
								options={[
									{ value: 'Lat', label: 'Lat/Lon' },
									{ value: 'Postcode', label: 'Postcode' },
									{ value: 'City', label: 'City' },
								]}
							/>
						</Card>
						<Card>
							<Flex vertical gap={12}>
								{locationType === 'Lat' && latLongUI()}
								{locationType === 'Postcode' &&
									inputTextField('Postcode', postcode, setPostcode, 'Postcode')}
								{locationType === 'City' &&
									inputTextField('City', city, setCity, 'City')}
							</Flex>
						</Card>
					</Space>
				</Col>
				<Col span={12}>
					<>
						{error !== null ? (
							<>Weather data could not be fetched</>
						) : (
							<Card
								onClick={onClick}
								loading={isLoading || isFetching}
								actions={[<ReloadOutlined key="fetch weather" />]}
							>
								Temp: {data?.main?.temp}&deg;C
								<WeatherIcon style={{ fontSize: '32px' }} />
							</Card>
						)}
					</>
				</Col>
			</Row>
		</div>
	);
}

export default Weather;
