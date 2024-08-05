import {
	Col,
	Row,
	Typography,
	Grid,
	message,
	theme,
	Skeleton,
	InputNumber,
	type InputNumberProps,
} from 'antd';
const { Title, Paragraph } = Typography;
import { useState } from 'react';
import { useGetForecast } from '../api/endpoints/weather';
import { useQuery } from '@tanstack/react-query';
import { ImageBroken } from '@phosphor-icons/react';
import type SimpleForecastWeather from '@models/SimpleForecastWeather';
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

	const [_messageApi, contextHolder] = message.useMessage();
	const { useBreakpoint } = Grid;
	const onChange: InputNumberProps['onChange'] = (value) => {
		setDays(Number(value));
	};

	const {
		token: { colorPrimary },
	} = theme.useToken();

	const { isLoading, data, refetch, isFetching, isError } = useQuery<
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
			<Row align={'middle'}>
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
					span={isLargeWindow() ? '12' : '24'}
					style={{ padding: '0px 0px 24px 24px' }}
				>
					<CitySearch
						locationType={locationType}
						postcode={postcode}
						city={city}
						lat={lat}
						lon={lon}
						setCity={setCity}
						setLat={setLat}
						setLon={setLon}
						setLocationType={setLocationType}
						setPostcode={setPostcode}
						onRefetchClick={onRefetchClick}
					/>
				</Col>
				<Col span={isLargeWindow() ? '12' : '24'} style={{ height: '100%' }}>
					<InputNumber
						style={{ paddingLeft: '24px' }}
						addonBefore="Days Forecast (1-5 days)"
						min={1}
						max={5}
						defaultValue={1}
						onChange={onChange}
					/>
				</Col>
				{(isLoading || isFetching) && (
					<Col span={isLargeWindow() ? '16' : '24'}>
						<Skeleton style={{ paddingLeft: '24px' }} />
					</Col>
				)}
				{isError && (
					<Col span={isLargeWindow() ? '16' : '24'}>
						<Title level={4} type="danger">
							Could not load forecast
						</Title>
						<ImageBroken size={100} weight="duotone" color="#ff4d4f" />
					</Col>
				)}
				{!isLoading && !isFetching && !isError && (
					<Col span={isLargeWindow() ? '16' : '24'}>
						<ResponsiveContainer height="99%" aspect={1}>
							<LineChart data={data?.slice(0, days ? days * 8 : 8)}>
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
				)}
			</Row>
		</>
	);
}

export default WeatherForecastPage;
