import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const tracerLength = 20; // Comprimento do pulso

// Definimos as propriedades que este componente vai receber
interface TracerSegmentProps {
	d: string; // A string do caminho (ex: "M 0 0 L 100 100")
	index: number; // O índice para o atraso da animação
}

const TracerSegment: React.FC<TracerSegmentProps> = ({ d, index }) => {
	const pathRef = useRef<SVGPathElement>(null);
	const [pathLength, setPathLength] = useState(0);

	// Efeito para medir o caminho individual
	useEffect(() => {
		if (pathRef.current) {
			setPathLength(pathRef.current.getTotalLength());
		}
	}, []);

	// Não renderiza a animação até que o comprimento seja medido e seja maior que 0
	if (pathLength === 0) {
		// Renderiza o caminho de forma invisível apenas para que possa ser medido
		return <path ref={pathRef} d={d} style={{ display: "none" }} />;
	}
	//BUG: STUTERING EFFECT ON INIT ANIMATION
	return (
		<motion.path
			d={d}
			fill="none"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			// Configuração do pulso com o comprimento medido
			strokeDasharray={`${tracerLength} ${pathLength}`}
			filter="url(#tracerGlow)"
			initial={{ strokeDashoffset: pathLength + tracerLength }}
			animate={{ strokeDashoffset: -tracerLength }}
			transition={{
				duration: 6, // Duração aleatória entre 2.5s e 5.5s
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeIn",
				delay: index * 0.1, // Atraso sequencial e previsível
			}}
		/>
	);
};

export default TracerSegment;
