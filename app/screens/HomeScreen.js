import React, { Component } from 'react';
import { View } from 'react-native'
import { Location, Permissions } from 'expo';
import Map from '../components/Map';
import YelpService from '../services/features';
import get from 'lodash/get';
import pick from 'lodash/pick';


export default class HomeScreen extends Component {

    state = {
        location: null,
        errorMessage: null,
		coffeeShops: []
    }

    getFeatures = async filter => {

        const coords = get(this.state.location, 'coords');
        const userLocation = pick(coords, ['latitude', 'longitude']);
		let coffeeShops = await YelpService.getFeatures(
			userLocation,
			filter
		);
		this.setState({ coffeeShops });
	};

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		let location = await Location.getCurrentPositionAsync({});
        await this.setState({ location });
        this.getFeatures();
    }

    componentWillMount() {
		this.getLocationAsync();
	}

    render(){
        const { location, coffeeShops } = this.state;
        return(
            <View>
                <Map location={location} places={coffeeShops}/>
            </View>
        )
    }
}