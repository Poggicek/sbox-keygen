import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Grid } from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import { formState } from '../../states/AppState'
import { useSetRecoilState } from 'recoil';

interface props {
	isOpen: boolean;
	onClose: () => void;
}

const CaptchaModal: React.FC<props> = ({ isOpen, onClose }) => {
	const setFormData = useSetRecoilState(formState);

	const onVerify = () => {
		setTimeout(() => {
			setFormData(data => {
				return { ...data, passedCaptcha: true }
			})
			onClose();
		}, 300);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Human verification</ModalHeader>
				<ModalBody>
					<Grid placeItems="center" mb={4}>
						<ReCAPTCHA
							sitekey="6LcDJccbAAAAABalGLH80y0LmWZJAu7b2MubfHX6"
							onChange={onVerify}
						/>
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default CaptchaModal;
