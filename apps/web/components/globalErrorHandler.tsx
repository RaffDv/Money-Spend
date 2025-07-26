"use client";

import { useEffect } from "react";

export default function GlobalErrorHandler() {
	useEffect(() => {
		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			// Log do erro no console
			console.error("Erro capturado:", event.reason);

			// Previne que o erro apareça na tela
			event.preventDefault();
		};

		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		return () => {
			window.removeEventListener(
				"unhandledrejection",
				handleUnhandledRejection,
			);
		};
	}, []);

	return null; // Componente não renderiza nada
}
