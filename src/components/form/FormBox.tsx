import { Box, Grid, Divider } from "@chakra-ui/react";
import BoxHeader from "../BoxHeader";
import FormInputs from "./FormInputs";

const FormBox: React.FC = () => {
	return (
		<Grid
			as="nav"
			placeItems="center"
			color="black"
			height="100%"
			margin="2vw"
		>
			<Box bg="gray.50" padding={5} w="100%" maxW="700px">
				<BoxHeader title="Generator" mb={2} />
				<Divider mb={5} />

				<FormInputs />
			</Box>
		</Grid>
	);
}

export default FormBox;
