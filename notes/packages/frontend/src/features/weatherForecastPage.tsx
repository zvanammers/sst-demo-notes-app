import { Col, Row, Typography, Grid, message } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { useState } from 'react';
import { useGetForecast } from '../api/endpoints/weather';
import { useQuery } from '@tanstack/react-query';
import type CurrentWeather from '@models/currentWeather';
import CitySearch from '../common/components/CitySearch';

function Forecast() {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [locationType, setLocationType] = useState('City');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('Sydney');
	// const [listOfSavedLocations, setListOfSavedLocations] =
	// 	useState<KeyValuePair[]>();
	// const [savedCity, setSavedCity] = useState('');

	const [_messageApi, contextHolder] = message.useMessage();
	const { useBreakpoint } = Grid;

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

	const { isLoading, data, refetch, isFetching, error } =
		useQuery<CurrentWeather>({
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
			<div className="p-2">
				<Row gutter={[16, 16]}>
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
					{/* <Col span={isLargeWindow() ? '8' : '24'}>
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
					</Col> */}
					<Col span={isLargeWindow() ? '16' : '24'}>
						<Text>hello</Text>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Forecast;
