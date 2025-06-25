"use client";
import TracerSegment from "./tracerSegment";

const TracerCircuit: React.FC = () => {
	const pathSegments = [
		"M 0 120 H 100 V 550", // 1. Linha vertical esquerda
		"M 0 300 H 500 v 200", // 2. Linha horizontal superior esquerda
		"M 250 0 v 80 h 600 ", // 3. Linha horizontal inferior esquerda
		"M 420 600 V 200 h -100 V 0", // 4. Linha do topo, do centro para a esquerda
		"M 700 600 v -400 h -150 V 0", // 5. Linha vertical do meio (superior)
		"M 650 0 v 140 h 200", // 6. Conector "Z" horizontal
	];
	return (
		<div
			style={{
				background: "#111827",
				padding: "1rem",
				borderRadius: "25px",
				border: "2px solid #4A5568",
			}}
		>
			<svg
				width="100%"
				viewBox="0 0 800 450"
				preserveAspectRatio="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					{/* O filtro de brilho recebe um ID único */}
					<filter id="tracerGlow" x="-50%" y="-50%" width="200%" height="200%">
						{/* Primeiro, aplicamos um desfoque gaussiano no desenho original */}
						<feGaussianBlur stdDeviation="4" result="coloredBlur" />
						{/* Depois, usamos feMerge para colocar o desenho original nítido em cima do desfoque,
                criando um núcleo nítido com um brilho ao redor */}
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>{" "}
				{pathSegments.map((pathData, index) => (
					<g key={index}>
						<path
							key={index + 1}
							d={pathData}
							strokeDasharray={"10 15"}
							fill="none"
							stroke="#4A5560"
						/>
						<TracerSegment key={index + 2} d={pathData} index={index} />
					</g>
				))}
			</svg>
		</div>
	);
};

export default TracerCircuit;
