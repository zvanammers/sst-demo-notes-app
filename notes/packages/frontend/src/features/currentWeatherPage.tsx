import {
	Card,
	Flex,
	Col,
	Row,
	Select,
	Space,
	Typography,
	Progress,
	Grid,
	Button,
} from 'antd';
const { Text, Title } = Typography;
import { ReloadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import getConfig from '../config';
import { useState } from 'react';
import inputTextField from '../common/components/inputTextField';
import type currentWeather from '@models/currentWeather';
import type savedWeatherData from '@models/savedWeatherData';
import { type IconComponent, getWeatherIcon } from '../common/weatherIcons';

function Weather() {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [locationType, setLocationType] = useState('City');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('Sydney');

	const { useBreakpoint } = Grid;

	const formatQueryStrings = () => {
		// replace with API layer, including axios.get below
		if (locationType === 'Lat' || locationType === 'Location') {
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
			refetchOnWindowFocus: false,
		});

	const mutation = useMutation({
		mutationFn: (newWeatherDataBlob: savedWeatherData) => {
			return axios.post(`${getConfig().apiUrl}/weather`, newWeatherDataBlob);
		},
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

	const WeatherIcon: IconComponent = getWeatherIcon(
		data?.weather?.length && data.weather.length > 0
			? data?.weather[0].icon
			: '',
	);

	if (navigator.geolocation && locationType === 'Location') {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				console.log(latitude, longitude);
				setLat(latitude.toString());
				setLon(longitude.toString());
			},

			(error) => {
				console.error('Error get user location: ', error);
			},
		);
	}

	const isLargeWindow = () => {
		const { lg } = useBreakpoint();
		return lg ? lg : false;
	};

	return (
		<div className="p-2">
			<Row gutter={[16, 16]}>
				<Col span={isLargeWindow() ? '8' : '24'} flex={3}>
					<Space direction="vertical" size={'large'}>
						<Card style={{ placeContent: 'center' }}>
							<Flex vertical gap={12}>
								<Select
									defaultValue="City"
									style={{ width: '100%' }}
									onChange={setLocationType}
									options={[
										{ value: 'City', label: 'City' },
										{ value: 'Postcode', label: 'Postcode' },
										{ value: 'Lat', label: 'Lat/Lon' },
										{ value: 'Location', label: 'Your Location' },
									]}
								/>
								{(locationType === 'Lat' || locationType === 'Location') &&
									latLongUI()}
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
				<Col flex={3} span={isLargeWindow() ? '16' : '24'}>
					<Card
						onClick={onClick}
						loading={isLoading || isFetching}
						actions={[<ReloadOutlined key="fetch weather" />]}
					>
						{error !== null || !data ? (
							<>Weather data could not be fetched</>
						) : (
							<Space direction="vertical">
								<Title level={5} style={{ marginTop: '0.5em' }}>
									Weather in {data.name}
									<WeatherIcon style={{ fontSize: '32px' }} />
								</Title>
								<Text>Temp: {data.main.temp}&deg;C </Text>
								<Text>Description: {data.weather[0]?.description}</Text>
								<Space>
									<Text>Humidity:</Text>
									<Progress percent={data.main.humidity} size={[100, 10]} />
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
								<Button
									onClick={() => {
										mutation.mutate({
											dt: data?.dt,
											temp: data?.main.temp,
											icon: data?.weather[0].icon,
										});
									}}
								>
									Save
								</Button>
							</Space>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default Weather;
