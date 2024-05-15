import {
	Card,
	Flex,
	Col,
	Row,
	Select,
	Space,
	Typography,
	Progress,
} from 'antd';
const { Text } = Typography;
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import getConfig from '../config';
import { useState } from 'react';
import inputTextField from '../common/components/inputTextField';
import type currentWeather from '@models/currentWeather';
import { type IconComponent, getWeatherIcon } from '../common/weatherIcons';

function Weather() {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [locationType, setLocationType] = useState('City');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('Sydney');
	const [icon, setIcon] = useState<string | undefined>(undefined);

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
					.then((res) => {
						if (data?.weather?.length && data.weather.length > 0) {
							setIcon(data.weather[0].icon);
						} else {
							setIcon(undefined);
						}
						return res.data;
					}),
		});

	const onClick = () => {
		refetch();
	};

	const latLongUI = () => {
		return (
			<>
				{inputTextField(
					'Latitude',
					lat,
					setLat,
					onClick,
					<div style={{ width: 60 }}>Latitude</div>,
				)}
				{inputTextField(
					'Longitude',
					lon,
					setLon,
					onClick,
					<div style={{ width: 60 }}>Longitude</div>,
				)}
			</>
		);
	};

	const WeatherIcon: IconComponent = getWeatherIcon(icon);

	return (
		<div className="p-2">
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<Space direction="vertical" size={8}>
						<Card style={{ placeContent: 'center' }}>
							<Select
								defaultValue="City"
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
									inputTextField(
										'Postcode',
										postcode,
										setPostcode,
										onClick,
										'Postcode',
									)}
								{locationType === 'City' &&
									inputTextField('City', city, setCity, onClick, 'City')}
							</Flex>
						</Card>
					</Space>
				</Col>
				<Col span={12}>
					<Card
						onClick={onClick}
						loading={isLoading || isFetching}
						actions={[<ReloadOutlined key="fetch weather" />]}
					>
						{error !== null || !data ? (
							<>Weather data could not be fetched</>
						) : (
							<Space direction="vertical">
								<WeatherIcon style={{ fontSize: '32px' }} />
								<Text>Temp: {data.main.temp}&deg;C </Text>
								<Text>Description: {data.weather[0]?.description}</Text>
								<Space>
									<Text>Humidity:</Text>
									<Progress percent={data.main.humidity} size={[200, 10]} />
								</Space>
								<Text>
									Sunrise:{' '}
									{new Date(data.sys.sunrise).toLocaleTimeString(undefined, {
										hourCycle: 'h12',
									})}
								</Text>

								<Text>
									Sunset:{' '}
									{new Date(data.sys.sunset * 1000 + 3600).toLocaleTimeString(
										undefined,
										{ hour12: true },
									)}
								</Text>
							</Space>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default Weather;
