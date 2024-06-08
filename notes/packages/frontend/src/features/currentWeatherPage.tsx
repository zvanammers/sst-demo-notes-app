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
} from 'antd';
const { Text, Title } = Typography;
import { ReloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import inputTextField from '../common/components/inputTextField';
import { type IconComponent, getWeatherIcon } from '../common/weatherIcons';
import { useGetCurrentWeather } from '../api/endpoints/weather';

function Weather() {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [locationType, setLocationType] = useState('City');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('Sydney');

	const { useBreakpoint } = Grid;

	const { isLoading, data, refetch, isFetching, error } = useGetCurrentWeather({
		locationType,
		lat,
		lon,
		postcode,
		city,
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
							</Space>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default Weather;
