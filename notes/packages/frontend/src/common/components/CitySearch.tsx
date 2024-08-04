import { Button, Card, Flex, Select, Space, message } from 'antd';
import type { KeyValuePair } from '../../api/models/keyValuePair';
import { useMutation } from '@tanstack/react-query';
import { useDeleteLocations } from '../../api/endpoints/location';
import { useEffect } from 'react';
import { queryClient } from '../../main';
import InputTextField from './inputTextField';

interface CitySearchProps {
	locationType: string;
	postcode: string;
	savedCity?: string;
	city: string;
	lat: string;
	lon: string;
	setLocationType: React.Dispatch<React.SetStateAction<string>>;
	setPostcode: React.Dispatch<React.SetStateAction<string>>;
	setSavedCity?: React.Dispatch<React.SetStateAction<string>>;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	setLat: React.Dispatch<React.SetStateAction<string>>;
	setLon: React.Dispatch<React.SetStateAction<string>>;
	listOfSavedLocations?: KeyValuePair[] | undefined;
	locationsError?: Error | null;
	isLocationsLoading?: boolean;
	onRefetchClick: () => void;
}

function CitySearch({
	locationType,
	postcode,
	savedCity,
	city,
	lat,
	lon,
	setLocationType,
	setPostcode,
	setSavedCity,
	setCity,
	setLat,
	setLon,
	listOfSavedLocations,
	locationsError,
	isLocationsLoading,
	onRefetchClick,
}: CitySearchProps) {
	const [messageApi, contextHolder] = message.useMessage();

	const infoToast = (message: string) => {
		messageApi.open({
			type: 'info',
			content: message,
		});
	};

	const loadingToast = (message: string) => {
		messageApi.open({
			type: 'loading',
			content: message,
			duration: 1.5,
		});
	};
	const { mutate: deleteLocationMutation } = useMutation({
		mutationFn: useDeleteLocations,
		onMutate: () => {
			loadingToast('Removing bookmark now ...');
		},
		onSuccess: (data) => {
			infoToast(data?.message);
			if (setSavedCity !== undefined) {
				setSavedCity('');
			}
			queryClient.invalidateQueries({ queryKey: ['savedLocations'] });
		},
	});

	const latLongUI = () => {
		return (
			<>
				{InputTextField(
					'Latitude',
					lat,
					setLat,
					onRefetchClick,
					<div style={{ width: 60 }}>Latitude</div>,
				)}
				{InputTextField(
					'Longitude',
					lon,
					setLon,
					onRefetchClick,
					<div style={{ width: 60 }}>Longitude</div>,
				)}
			</>
		);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (navigator.geolocation && locationType === 'Location') {
			loadingToast('Fetching your co-ordinates now ...');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLat(latitude.toString());
					setLon(longitude.toString());
				},

				(error) => {
					console.error('Error: cannot get user location: ', error);
				},
			);
		}
	}, [locationType]);

	return (
		<div>
			{contextHolder}
			<Space direction="vertical" style={{ width: '100%' }} size={'large'}>
				<Card style={{ placeContent: 'center' }}>
					<Flex vertical gap={12}>
						<Select
							defaultValue="City"
							style={{ width: '100%' }}
							onChange={setLocationType}
							options={[
								{ value: 'City', label: 'City' },
								{
									value: 'Bookmarks',
									label: 'Bookmarked Cities (max. 10)',
								},
								{ value: 'Postcode', label: 'Postcode' },
								{ value: 'Lat', label: 'Lat/Lon' },
								{ value: 'Location', label: 'Your Location' },
							]}
						/>
						{(locationType === 'Lat' || locationType === 'Location') &&
							latLongUI()}
						{locationType === 'Postcode' &&
							InputTextField(
								locationType,
								postcode,
								setPostcode,
								onRefetchClick,
								locationType,
							)}
						{locationType === 'City' &&
							InputTextField(
								locationType,
								city,
								setCity,
								onRefetchClick,
								locationType,
							)}
						{locationType === 'Bookmarks' &&
							savedCity !== undefined &&
							!locationsError && (
								<>
									<Select
										style={{ width: '100%' }}
										options={listOfSavedLocations}
										loading={isLocationsLoading}
										onChange={setSavedCity}
										value={savedCity}
									/>
									<Button
										danger
										disabled={savedCity === ''}
										onClick={() => deleteLocationMutation(savedCity)}
									>
										Remove Bookmark
									</Button>
								</>
							)}
					</Flex>
				</Card>
			</Space>
		</div>
	);
}

export default CitySearch;
