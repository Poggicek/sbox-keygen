import { Box, Grid, Divider, Text, SimpleGrid } from "@chakra-ui/react";
import BoxHeader from "../BoxHeader";
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { formState } from '../../states/AppState'

const generateSteamKey = () => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let key = "";
	for (let x = 0; x < 3; x++) {
		for (let i = 0; i < 5; i++) {
			key += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		if (x !== 2) key += "-"
	}
	return key;
}

const Keys: React.FC = () => {
	const [formData, setFormData] = useRecoilState(formState);
	const [keys, setKeys] = useState<string[]>([]);


	useEffect(() => {
		for (let i = 0; i < formData.keys; i++) {
			setKeys(keys => [...keys, generateSteamKey()]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Grid
			as="nav"
			placeItems="center"
			color="black"
			height="100%"
			margin="2vw"
		>
			<Box bg="gray.50" padding={5} w="100%" maxW="700px">
				<BoxHeader title="Generated keys" mb={2} />
				<Divider mb={5} />

				<SimpleGrid placeItems="center" minChildWidth="10em" spacing="10px">
					{
						keys.map((key, i) => {
							return (
								<Box key={i}>
									<Text onCopy={() => { window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }}>{key}</Text>
									<Divider mt={2} />
								</Box>
							)
						})
					}
				</SimpleGrid>
			</Box>
		</Grid>
	)
}

export default Keys