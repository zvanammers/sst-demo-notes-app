import { Button, Card, Flex, Input, Select, Space, message } from 'antd';
import type { KeyValuePair } from '../../api/models/keyValuePair';
import { useMutation } from '@tanstack/react-query';
import { useDeleteLocations } from '../../api/endpoints/location';
import { useEffect, useMemo, useState } from 'react';
import { queryClient } from '../../main';
import InputTextField from './InputTextField';

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
	const [isLoading, setIsLoading] = useState(false);

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

	const latLongUI = (localIsLoading?: boolean) => {
		return (
			<>
				<InputTextField
					name="Latitude"
					value={lat}
					action={setLat}
					onPressEnter={onRefetchClick}
					addOnBefore={<div style={{ width: 60 }}>Latitude</div>}
					isLoading={localIsLoading ? isLoading : undefined}
				/>
				<InputTextField
					name="Longitude"
					value={lon}
					action={setLon}
					onPressEnter={onRefetchClick}
					addOnBefore={<div style={{ width: 60 }}>Longitude</div>}
					isLoading={localIsLoading ? isLoading : undefined}
				/>
			</>
		);
	};

	const locationSearchOptions = useMemo(() => {
		return [
			{ value: 'City', label: 'City' },
			savedCity !== undefined && {
				value: 'Bookmarks',
				label: 'Bookmarked Cities (max. 10)',
			},
			{ value: 'Postcode', label: 'Postcode' },
			{ value: 'Lat', label: 'Lat/Lon' },
			{ value: 'Location', label: 'Your Location' },
		].filter((x) => x !== false) as KeyValuePair[];
	}, [savedCity]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (navigator.geolocation && locationType === 'Location') {
			setIsLoading(true);
			loadingToast('Fetching your co-ordinates now ...');
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLat(latitude.toString());
					setLon(longitude.toString());
					setIsLoading(false);
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
							options={locationSearchOptions}
						/>
						{locationType === 'Lat' && latLongUI(undefined)}
						{locationType === 'Location' && latLongUI(true)}
						{locationType === 'Postcode' && (
							<InputTextField
								name={locationType}
								value={postcode}
								action={setPostcode}
								onPressEnter={onRefetchClick}
								addOnBefore={locationType}
							/>
						)}
						{locationType === 'City' && (
							<InputTextField
								name={locationType}
								value={city}
								action={setCity}
								onPressEnter={onRefetchClick}
								addOnBefore={locationType}
							/>
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
