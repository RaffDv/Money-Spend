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
				const access_code = data.access;

				if (access_code) {
					console.debug("redirect to widget");
					window.location.href = `https://widget.belvo.io/
	?access_token=${access_code}
	&locale=pt
	&integration_type=openfinance
	&institution_types=retail
	&country_codes=BR
	&access_mode=recurrent
	&external_id=belvo_test_janice
	&resources=OWNERS,ACCOUNTS`;
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
