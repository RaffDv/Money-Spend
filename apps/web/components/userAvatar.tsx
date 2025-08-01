import type { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// 1. Removemos o 'async' e recebemos 'user' como prop.
const UserAvatar = ({ user }: { user: User }) => {
	// 2. Extraímos os metadados do utilizador de forma segura.
	const picture = user?.user_metadata?.picture; // Assumindo que 'picture' é a chave correta. Ajuste se for 'user_picture'.
	const username = user?.user_metadata?.username;

	return (
		<Avatar className="bg-card-foreground border-[1.5px] border-purple-400 cursor-pointer">
			{picture ? (
				// 3. Usamos a variável 'picture' que definimos.
				<AvatarImage src={picture} alt={username || "User Avatar"} />
			) : (
				<AvatarFallback>
					{/* 4. Adicionamos uma verificação para garantir que 'username' existe antes de usar 'substring'.
					       Se não existir, mostramos um fallback genérico como "?". */}
					{username?.substring(0, 1).toUpperCase() || "?"}
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export default UserAvatar;
