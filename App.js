import React from 'react'
import { SafeAreaView } from 'react-native'
import HomeScreen from './app/screens/HomeScreen'

export default class App extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<HomeScreen/>
			</SafeAreaView>
		)
	}
}
