import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit }) {
	const [ github_username, setGithubUsername ] = useState('');
	const [ techs, setTechs ] = useState('');
	const [ latitude, setLatitude ] = useState(0);
	const [ longitude, setLongitude ] = useState(0);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				setLatitude(latitude);
				setLongitude(longitude);
			},
			(error) => {
				console.log(error);
			},
			{
				timeout: 30000
			}
		);
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		await onSubmit({
			github_username,
			techs,
			longitude,
			latitude
		});

		setGithubUsername('');
		setTechs('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="input-block">
				<label htmlFor="github_username">Github Username</label>
				<input
					name="github_username"
					id="github_username"
					value={github_username}
					onChange={(e) => setGithubUsername(e.target.value)}
					required
					autoFocus
				/>
			</div>

			<div className="input-block">
				<label htmlFor="techs">Technologies</label>
				<input name="techs" id="techs" value={techs} onChange={(e) => setTechs(e.target.value)} required />
			</div>

			<div className="input-group">
				<div className="input-block">
					<label htmlFor="latitude">Latitude</label>
					<input
						type="number"
						name="latitude"
						id="latitude"
						onChange={(e) => setLatitude(e.target.value)}
						value={latitude}
						required
					/>
				</div>

				<div className="input-block">
					<label htmlFor="longitude">Longitude</label>
					<input
						type="number"
						name="longitude"
						id="longitude"
						value={longitude}
						onChange={(e) => setLongitude(e.target.value)}
						required
					/>
				</div>
			</div>

			<button type="submit">Save</button>
		</form>
	);
}

export default DevForm;
