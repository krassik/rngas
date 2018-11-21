import axios from 'axios';

const apiKey = "oel-BgDgKXdblGl-2TJr-gCPwFy8EMtCSH6B3yT4peG0fDB2wFZGay-xZWuBTJCi3AN4_Z8VIVuZ4dtEa-xNRScWPf2Mx5jAoc6zqp9XXaC5zDA208VVMfcPWcH0W3Yx"

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
		Authorization: `Bearer ${ apiKey }`
	}
});

export const getFeatures = (userLocation, filter = {}) => {
	return api.get('/businesses/search', {
			params: {
				limit: 10,
				term: 'gas',
				...userLocation,
				...filter
			}
		})
		.then(res =>
			res.data.businesses.map(business => {
				return {
					name: business.name,
					coords: business.coordinates
				};
			})
		)
		.catch(error => console.error(error));
};

export default {
	getFeatures
};
