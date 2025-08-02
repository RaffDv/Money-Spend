"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function ProfileEditor() {
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	// Função para atualizar a role do usuário para 'MODERATOR'
	const handleUpdateRole = async () => {
		setLoading(true);
		setMessage("");

		// 1. Pega os dados do usuário atual para preservar os metadados existentes.
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			// 2. Chama a função updateUser.
			const { data, error } = await supabase.auth.updateUser({
				data: {
					...user.user_metadata, // <-- Preserva os metadados antigos
					user_role: "ADMIN", // <-- Define ou atualiza a nova role
				},
			});

			if (error) {
				setMessage(`Erro ao atualizar: ${error.message}`);
				console.error("Erro:", error);
			} else {
				setMessage("Role atualizada para MODERATOR com sucesso!");
				console.log("Usuário atualizado:", data.user);
			}
		} else {
			setMessage("Usuário não encontrado.");
		}

		setLoading(false);
	};

	return (
		<div>
			<h3>Atualizar Minha Role</h3>
			<button
				type="button"
				onClick={handleUpdateRole}
				disabled={loading}
				className="border border-purple-500 p-4 m-5"
			>
				{loading ? "Atualizando..." : "Tornar-se Moderador"}
			</button>
			{message && <p>{message}</p>}
		</div>
	);
}
