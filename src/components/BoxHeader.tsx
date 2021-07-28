import { Flex, Heading, FlexProps } from "@chakra-ui/react";

const BoxHeader: React.FC<FlexProps & { title: string }> = (props) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			color="gray.600"
			{...props}
		>
			<Flex align="center" mr={5}>
				<Heading as="h1" size="lg" letterSpacing={"tighter"}>
					{props.title}
				</Heading>
			</Flex>
			Last Updated: {new Date().toDateString()}
		</Flex>
	);
}

export default BoxHeader;
