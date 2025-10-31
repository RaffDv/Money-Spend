import { useBelvoGenerateTokens } from "../lib/gen/hooks/useBelvoGenerateTokens";
import { Button } from "./ui/button";

type Props = {
	userId: string;
	fullname: string;
};

export function ConnectBankButton({ userId, fullname }: Props) {
	const { mutate, isPending } = useBelvoGenerateTokens({
		mutation: {
			onSuccess: (data) => {
				const belvoAccessToken = data.access;
				if (belvoAccessToken) {
					window.location.href = `https://widget.belvo.io/?access_token=${belvoAccessToken}&locale=pt&mode=webapp&integration_type=openfinance&institution_types=retail&country_codes=BR&access_mode=recurrent&resources=OWNERS,ACCOUNTS`;
				}
			},
		},
	});

	const handleConnectClick = () => {
		mutate({ data: { userId, fullname } });
	};

	return (
		<Button onClick={handleConnectClick} disabled={isPending}>
			{isPending ? "Conectando..." : "Criar conta"}
		</Button>
	);
}
