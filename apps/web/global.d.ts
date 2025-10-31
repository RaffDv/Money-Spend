declare global {
	interface Window {
		belvoSDK: {
			createWidget: (accessToken: string, config: any) => void;
		};
	}
}
