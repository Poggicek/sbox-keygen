import { Flex, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
	return (
		<Flex
			as="nav"
			justify="space-between"
			padding={6}
			bg="gray.500"
			justifyContent="center"
			color="white"
		>
			<Heading textAlign="center" size="lg">
				s&box key generator 2021
			</Heading>
		</Flex>
	);
}

export default Header;
