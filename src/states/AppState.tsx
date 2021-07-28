import { atom } from "recoil";

const DEFAULT_DATA = {
	username: "",
	keys: 1,
	captchaNeeded: false,
	passedCaptcha: false,
	completed: false
}

export const hackingState = atom({
	key: 'hackingState',
	default: false
})

export const formState = atom({
	key: 'formState',
	default: DEFAULT_DATA
})