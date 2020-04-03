import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDev } from '../../services/socket';
import styles from './styles';

export default function Main() {
	const [ devs, setDevs ] = useState([]);
	const [ techs, setTechs ] = useState('');
	const [ currentRegion, setCurrentRegion ] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		async function loadInitialPosition() {
			const { granted } = await requestPermissionsAsync();

			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				});

				const { latitude, longitude } = coords;

				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta: 0.03,
					longitudeDelta: 0.03
				});
			}
		}

		loadInitialPosition();
	}, []);

	useEffect(
		() => {
			subscribeToNewDev((dev) => {
				setDevs([ ...devs, dev ]);
			});
		},
		[ devs ]
	);

	if (!currentRegion) {
		return null;
	}

	function navigateToProfile(github_username) {
		navigation.navigate('Profile', { github_username });
	}

	function handleRegionChanged(region) {
		setCurrentRegion(region);
	}

	function setupWebsocket() {
		disconnect();

		const { latitude, longitude } = currentRegion;

		connect(latitude, longitude, techs);
	}

	async function loadDevs() {
		const { latitude, longitude } = currentRegion;

		const response = await api.get('/search', {
			params: {
				latitude,
				longitude,
				techs
			}
		});

		setDevs(response.data);
		setupWebsocket();
	}

	return (
		<View>
			<MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
				{devs.map((dev) => (
					<Marker
						key={dev.github_username}
						coordinate={{
							longitude: dev.location.coordinates[0],
							latitude: dev.location.coordinates[1]
						}}
					>
						<Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

						<Callout onPress={() => navigateToProfile(dev.github_username)}>
							<View style={styles.callout}>
								<Text style={styles.devName}>{dev.name}</Text>
								<Text style={styles.devBio}>{dev.bio}</Text>
								<Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<View style={styles.searchForm}>
				<TextInput
					style={styles.searchInput}
					placeholder="Techs separate for commas"
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					onChangeText={setTechs}
				/>

				<TouchableOpacity onPress={loadDevs} style={styles.searchButton}>
					<MaterialIcons name="my-location" size={20} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
