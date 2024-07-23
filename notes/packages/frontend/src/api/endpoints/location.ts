import axios from 'axios';
import getConfig from '../../config';

export async function useSaveLocation(name: string) {
	const res = await axios.post(`${getConfig().apiUrl}/location`, {
		name: name,
	});
	return res.data;
}

export async function useGetSavedLocations() {
	const res = await axios.get(`${getConfig().apiUrl}/locations`);
	return res.data;
}
