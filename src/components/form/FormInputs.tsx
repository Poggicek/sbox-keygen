import { Box, Input, Text, Stack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons"
import { useSetRecoilState, useRecoilState } from 'recoil';
import { hackingState, formState } from '../../states/AppState';

const FormInputs: React.FC = () => {
	const [formData, setFormData] = useRecoilState(formState)
	const setHacking = useSetRecoilState(hackingState)

	const changeSlider = (number: number) => {
		setFormData(oldData => {
			const _data = { ...oldData }
			_data.keys = number;
			return _data;
		})
	};

	const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(oldData => {
			const _data = { ...oldData }
			_data.username = e.target.value;
			return _data;
		})
	}

	return (
		<Stack spacing={5}>
			<Box>
				<Text mb="8px">Enter your steam username</Text>
				<Input value={formData.username} onChange={handleUsername} placeholder="Username" />
			</Box>

			<Box>
				<Text mb="8px">Number of keys to generate <Text as="span" fontWeight={700}>({formData.keys})</Text></Text>
				<Slider aria-label="slider-ex-4" value={formData.keys} defaultValue={1} min={1} max={30} onChange={changeSlider}>
					<SliderTrack bg="gray.100">
						<SliderFilledTrack bg="gray.700" />
					</SliderTrack>
					<SliderThumb boxSize={6}>
						<Box color="gray.700" as={RepeatIcon} />
					</SliderThumb>
				</Slider>
			</Box>

			<Button onClick={() => { setHacking(true) }}>Generate!</Button>
		</Stack>
	)
}

export default FormInputs