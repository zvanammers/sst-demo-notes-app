import {
	Col,
	Row,
	Typography,
	Grid,
	message,
	type RadioChangeEvent,
	Radio,
	theme,
} from 'antd';
const { Title, Paragraph } = Typography;
import { useState } from 'react';
import { useGetForecast } from '../api/endpoints/weather';
import { useQuery } from '@tanstack/react-query';
import type SimpleForecastWeather from '@models/SimpleForecastWeather';
// import {
// 	LineChart,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	Legend,
// 	ResponsiveContainer,
// } from 'recharts';
import {
	ResponsiveContainer,
	LineChart,
	CartesianGrid,
	YAxis,
	XAxis,
	Tooltip,
	Legend,
	Line,
} from 'recharts';

import CitySearch from '../common/components/CitySearch';

function WeatherForecastPage() {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [locationType, setLocationType] = useState('City');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('Sydney');
	const [days, setDays] = useState(1);
	// const [listOfSavedLocations, setListOfSavedLocations] =
	// 	useState<KeyValuePair[]>();
	// const [savedCity, setSavedCity] = useState('');

	const [_messageApi, contextHolder] = message.useMessage();
	const { useBreakpoint } = Grid;

	const onChange = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value);
		setDays(e.target.value);
	};

	const {
		token: { colorPrimary },
	} = theme.useToken();

	// const successToast = (message: string) => {
	// 	messageApi.open({
	// 		type: 'success',
	// 		content: message,
	// 	});
	// };

	// const infoToast = (message: string) => {
	// 	messageApi.open({
	// 		type: 'info',
	// 		content: message,
	// 	});
	// };

	// const errorToast = (message: string) => {
	// 	messageApi.open({
	// 		type: 'error',
	// 		content: message,
	// 	});
	// };

	const { isLoading, data, refetch, isFetching, error } = useQuery<
		SimpleForecastWeather[]
	>({
		queryKey: ['forecast'],
		queryFn: () =>
			useGetForecast({
				locationType,
				lat,
				lon,
				postcode,
				city,
			}),
		refetchOnWindowFocus: false,
	});

	const data2 = [
		{ dt: 'Page A', temp: 400 },
		{
			name: 'Page B',
			temp: 300,
		},
		{
			name: 'Page C',
			temp: 200,
		},
	];

	// const {
	// 	isLoading: isLocationsLoading,
	// 	data: savedLocations,
	// 	error: locationsError,
	// } = useQuery<ListItems>({
	// 	queryKey: ['savedLocations'],
	// 	queryFn: useGetSavedLocations,
	// 	refetchOnWindowFocus: false,
	// });

	// useEffect(() => {
	// 	if (!savedLocations || savedLocations.count === 0) {
	// 		return;
	// 	}
	// 	const list: KeyValuePair[] = [];
	// 	for (const x of savedLocations.items) {
	// 		list.push({ value: x.name, label: x.name } as KeyValuePair);
	// 	}
	// 	setListOfSavedLocations(list);
	// }, [savedLocations]);

	// const { mutate: saveLocationMutation } = useMutation({
	// 	mutationFn: useSaveLocation,
	// 	onError: (data) => {
	// 		const response = (data as AxiosError).response;
	// 		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 		const message = (response?.data as any).message;
	// 		errorToast(message);
	// 	},
	// 	onMutate: () => {
	// 		infoToast('Bookmarking location now ...');
	// 	},
	// 	onSuccess: (data) => {
	// 		queryClient.invalidateQueries({ queryKey: ['savedLocations'] });
	// 		if ('message' in data) {
	// 			infoToast(data.message);
	// 		} else if ('name' in data) {
	// 			successToast(`${data.name} is now bookmarked`);
	// 		}
	// 	},
	// });

	const onRefetchClick = () => {
		refetch();
	};

	const isLargeWindow = () => {
		const { lg, md } = useBreakpoint();
		return lg || md;
	};

	return (
		<>
			{contextHolder}
			{/* <div className="p-2"> */}
			{/* <Row gutter={[16, 16]}> */}
			<Row>
				{isLargeWindow() && (
					<Col span={24}>
						<Typography>
							<Title level={2}>Australian Weather 3 Day Forecast</Title>
							<Paragraph
								style={{ paddingLeft: '12.5%', paddingRight: '12.5%' }}
							>
								On this page, you can get 3 day forecast, for any location in
								Australia. Use the drop down to select how to search for your
								location.
							</Paragraph>
						</Typography>
					</Col>
				)}
				<Col
					span={isLargeWindow() ? '8' : '24'}
					style={{ padding: '0px 0px 24px 24px' }}
				>
					<CitySearch
						locationType={locationType}
						postcode={postcode}
						city={city}
						lat={lat}
						lon={lon}
						// savedCity={savedCity}
						setCity={setCity}
						setLat={setLat}
						setLon={setLon}
						setLocationType={setLocationType}
						setPostcode={setPostcode}
						// setSavedCity={setSavedCity}
						// locationsError={locationsError}
						// isLocationsLoading={isLocationsLoading}
						// listOfSavedLocations={listOfSavedLocations}
						onRefetchClick={onRefetchClick}
					/>
				</Col>
				<Col span={isLargeWindow() ? '8' : '24'}>
					<Radio.Group onChange={onChange} value={days}>
						<Radio value={1}>1 Day Forecast</Radio>
						<Radio value={2}>2 Day Forecast</Radio>
						<Radio value={3}>3 Day Forecase</Radio>
					</Radio.Group>
				</Col>
				<Col span={isLargeWindow() ? '16' : '24'}>
					<ResponsiveContainer width="99%" aspect={1}>
						<LineChart
							data={data?.slice(0, days * 8)}
							// margin={{
							// 	top: 5,
							// 	right: 30,
							// 	left: 20,
							// 	bottom: 5,
							// }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="dt"
								tickFormatter={(x) => x.slice(0, 1) + x.slice(8, 12)}
							/>
							<YAxis
								domain={[
									(dataMin: number) => Math.floor(dataMin),
									(dataMax: number) => Math.ceil(dataMax),
								]}
								tickFormatter={(x) => `${x}°C`}
							/>
							<Tooltip />
							<Legend verticalAlign="top" />
							<Line
								isAnimationActive={false}
								type="monotone"
								dataKey="temp"
								stroke={colorPrimary}
								activeDot={{ r: 8 }}
								name="Temperature"
							/>
						</LineChart>
					</ResponsiveContainer>
				</Col>
			</Row>
			{/* </div> */}
		</>
	);
}

export default WeatherForecastPage;
