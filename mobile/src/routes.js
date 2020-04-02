import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const AppStack = createStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer
			theme={{
				colors: {
					card: '#7d40e7',
					text: '#e5e6f0',
					background: '#e5e6f0',
					primary: '#7d40e7',
					border: '#7d40e7'
				}
      }}
		>
			<AppStack.Navigator>
				<AppStack.Screen name="Main" component={Main} options={{ title: 'DevRadar' }} />
				<AppStack.Screen name="Profile" component={Profile} options={{ title: 'Github Profile' }} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
