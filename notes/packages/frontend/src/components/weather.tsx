import { Card, Flex, Col, Row, Select, Space, type GetProps } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import getConfig from '../config';
import { useState } from 'react';
import inputTextField from './inputTextField';
import type currentWeather from '@models/currentWeather';
import Icon, {
	type CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon';
import GhostDuotone from '@phosphor-icons/core/duotone/ghost-duotone.svg?react';

// type CustomIconComponentProps = GetProps<typeof Icon>;

function Weather() {
	const [lat, setLat] = useState('-30.15');
	const [lon, setLon] = useState('155.44');
	const [locationType, setLocationType] = useState('Lat');
	const [postcode, setPostcode] = useState('');
	const [city, setCity] = useState('');

	const formatQueryStrings = () => {
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
					<div style={{ width: 90 }}>Latitude</div>,
				)}
				{inputTextField(
					'Longitude',
					lon,
					setLon,
					<div style={{ width: 90 }}>Longitude</div>,
				)}
			</>
		);
	};

	const GhostIcon = (props: Partial<CustomIconComponentProps>) => (
		<Icon component={GhostDuotone} {...props} />
	);

	if (error || !data) {
		return <>Weather data could not be fetched</>;
	}

	return (
		<div className="p-2">
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Space direction="vertical" size={16}>
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
				<Col span={16}>
					<Card
						onClick={onClick}
						loading={isLoading || isFetching}
						actions={[<ReloadOutlined key="fetch weather" />]}
					>
						Temp: {data?.main?.temp}&deg;C
						<GhostIcon style={{ fontSize: '32px' }} />
						{GhostIcon({ style: { fontSize: '32px' } })}
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default Weather;
