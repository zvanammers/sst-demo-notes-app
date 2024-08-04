import {
	Card,
	Col,
	Row,
	Space,
	Typography,
	Progress,
	Grid,
	message,
	Tooltip,
} from 'antd';
const { Text, Title, Paragraph } = Typography;
import Icon, { ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { type IconComponent, getWeatherIcon } from '../common/weatherIcons';
import { useGetCurrentWeather } from '../api/endpoints/weather';
import Bookmark from '@phosphor-icons/core/duotone/bookmark-duotone.svg?react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type CurrentWeather from '@models/currentWeather';
import {
	useSaveLocation,
	useGetSavedLocations,
} from '../api/endpoints/location';
import { queryClient } from '../main';
import type { AxiosError } from 'axios';
import type { KeyValuePair } from '../api/models/keyValuePair';
import type { ListItems } from '../api/models/ListItems';
import CitySearch from '../common/components/CitySearch';

function CurrentWeatherPage() {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [locationType, setLocationType] = useState('City');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('Sydney');
	const [listOfSavedLocations, setListOfSavedLocations] =
		useState<KeyValuePair[]>();
	const [savedCity, setSavedCity] = useState('');

	const [messageApi, contextHolder] = message.useMessage();
	const { useBreakpoint } = Grid;

	const successToast = (message: string) => {
		messageApi.open({
			type: 'success',
			content: message,
		});
	};

	const infoToast = (message: string) => {
		messageApi.open({
			type: 'info',
			content: message,
		});
	};

	const errorToast = (message: string) => {
		messageApi.open({
			type: 'error',
			content: message,
		});
	};

	const { isLoading, data, refetch, isFetching, error } =
		useQuery<CurrentWeather>({
			queryKey: ['weather'],
			queryFn: () =>
				useGetCurrentWeather({
					locationType,
					lat,
					lon,
					postcode,
					city: locationType === 'City' ? city : savedCity,
				}),
			refetchOnWindowFocus: false,
		});

	const {
		isLoading: isLocationsLoading,
		data: savedLocations,
		error: locationsError,
	} = useQuery<ListItems>({
		queryKey: ['savedLocations'],
		queryFn: useGetSavedLocations,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (!savedLocations || savedLocations.count === 0) {
			return;
		}
		const list: KeyValuePair[] = [];
		for (const x of savedLocations.items) {
			list.push({ value: x.name, label: x.name } as KeyValuePair);
		}
		setListOfSavedLocations(list);
	}, [savedLocations]);

	const { mutate: saveLocationMutation } = useMutation({
		mutationFn: useSaveLocation,
		onError: (data) => {
			const response = (data as AxiosError).response;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const message = (response?.data as any).message;
			errorToast(message);
		},
		onMutate: () => {
			infoToast('Bookmarking location now ...');
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['savedLocations'] });
			if ('message' in data) {
				infoToast(data.message);
			} else if ('name' in data) {
				successToast(`${data.name} is now bookmarked`);
			}
		},
	});

	const onRefetchClick = () => {
		refetch();
	};

	const WeatherIcon: IconComponent = getWeatherIcon(
		data?.weather?.length && data.weather.length > 0
			? data?.weather[0].icon
			: '',
	);

	const isLargeWindow = () => {
		const { lg, md } = useBreakpoint();
		return lg || md;
	};

	return (
		<>
			{contextHolder}
			<div className="p-2">
				<Row gutter={[16, 16]}>
					{isLargeWindow() && (
						<Col span={24}>
							<Typography>
								<Title level={2}>Current Australian Weather</Title>
								<Paragraph
									style={{ paddingLeft: '12.5%', paddingRight: '12.5%' }}
								>
									On this page, you can search for current weather, for any
									location in Australia. Use the drop down to select how to
									search for your location.
								</Paragraph>
							</Typography>
						</Col>
					)}
					<Col span={isLargeWindow() ? '8' : '24'}>
						<CitySearch
							locationType={locationType}
							postcode={postcode}
							city={city}
							lat={lat}
							lon={lon}
							savedCity={savedCity}
							setCity={setCity}
							setLat={setLat}
							setLon={setLon}
							setLocationType={setLocationType}
							setPostcode={setPostcode}
							setSavedCity={setSavedCity}
							locationsError={locationsError}
							isLocationsLoading={isLocationsLoading}
							listOfSavedLocations={listOfSavedLocations}
							onRefetchClick={onRefetchClick}
						/>
					</Col>
					<Col span={isLargeWindow() ? '16' : '24'}>
						<Card
							loading={isLoading || isFetching}
							actions={[
								<Tooltip title="Refetch" key="fetch weather">
									<ReloadOutlined
										style={{ width: '21px' }}
										key="fetch weather"
										onClick={onRefetchClick}
									/>
								</Tooltip>,
								<Tooltip title="Bookmark Location" key="bookmark">
									<Icon
										style={{
											fontSize: '21px',
											color:
												savedLocations?.count === 10 ? '#ff4d4f' : undefined,
										}}
										component={Bookmark}
										key="bookmark"
										onClick={() => {
											if (
												error === null &&
												data?.name &&
												savedLocations?.count !== 10
											) {
												saveLocationMutation(data?.name ?? '');
											} else if (savedLocations?.count === 10) {
												infoToast('10 locations have been bookmarked');
											} else {
												errorToast('Invalid location to bookmark');
											}
										}}
									/>
								</Tooltip>,
							]}
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
		</>
	);
}

export default CurrentWeatherPage;
