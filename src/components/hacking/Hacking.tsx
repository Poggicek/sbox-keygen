import { Box, Grid, Divider, CircularProgress, Text, Icon, Stack, Button, useDisclosure } from "@chakra-ui/react";
import BoxHeader from "../BoxHeader";
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { formState } from '../../states/AppState'
import { MdCheckCircle, MdError } from 'react-icons/md';
import CaptchaModal from "./CaptchaModal";

interface IActionList {
	success: boolean
	message: string
}

const delayedAction = (func: () => void, time: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			func()
			resolve()
		}, time)
	})
}

const Hacking: React.FC = () => {
	const [formData, setFormData] = useRecoilState(formState);
	const [hackingMessage, setHackingMessage] = useState(`Connecting to api.valvesoftware.com as ${formData.username} (attempt 1)`);
	const [actionList, setActionList] = useState<IActionList[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const addAction = (message: string, success: boolean) => {
		setActionList(list => {
			return [...list, { success, message }];
		});
	}

	useEffect(() => {
		(async () => {
			await delayedAction(() => {
				addAction("Failed to connect to the server (attempt 1)", false);
				setHackingMessage(`Connecting to api.valvesoftware.com as ${formData.username} (attempt 2)`);
			}, 2000)

			await delayedAction(() => {
				addAction(`Connected as ${formData.username}`, true);
				setHackingMessage(`Intercepting API calls`);
			}, 3000)

			await delayedAction(() => {
				addAction(`Listening to API on port 8080`, true);
				setHackingMessage(`Sending key generation request as "Garry" with the "amount" parameter set to ${formData.keys}`);
			}, 5000)

			await delayedAction(() => {
				addAction(`Request failed (Response 403)`, false);
				setHackingMessage(`Human verification required to continue!`);

				setFormData(data => {
					return { ...data, captchaNeeded: true };
				});
			}, 5000)
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	// when captcha challange is completed
	useEffect(() => {
		if (formData.passedCaptcha) {
			addAction(`Request suceeded (Response 200)`, true);
			setHackingMessage(`Bruteforcing SHA1 keys`);

			setFormData(data => {
				return { ...data, captchaNeeded: false };
			});

			setTimeout(() => {
				setFormData(data => {
					return { ...data, completed: true };
				});
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formData.passedCaptcha])

	return (
		<Grid
			as="nav"
			placeItems="center"
			color="black"
			height="100%"
			margin="2vw"
		>
			<Box bg="gray.50" padding={5} w="100%" maxW="700px">
				<BoxHeader title="Hacking Facepunch.." mb={2} />
				<Divider mb={5} />

				<Stack spacing={2} mb={2}>
					{
						actionList.map((action, i) => {
							return (
								<Box key={i}>
									<Text color={action.success ? 'green' : 'red'} ><Icon as={action.success ? MdCheckCircle : MdError} color={action.success ? "green" : "red.400"} /> {action.message}</Text>
									<Divider mt={2} />
								</Box>
							)
						})
					}
				</Stack>

				<Grid placeItems="center">
					{!formData.completed && <CircularProgress isIndeterminate color="green.300" size="100" />}
					<Text mt={4} fontWeight={500}>{hackingMessage}</Text>

					{formData.captchaNeeded && <Button colorScheme="red" mt={4} onClick={onOpen}>Verify</Button>}
				</Grid>
			</Box>

			<CaptchaModal isOpen={isOpen} onClose={onClose} />
		</Grid>
	)
}

export default Hacking