'use client';
import { motion } from 'framer-motion';
import { useState, useRef, useLayoutEffect } from 'react';

interface PulsingLineProps {
	d: string;
	delay?: number;
	duration?: number;
	pulseLength?: number;
}

const PulsingLine: React.FC<PulsingLineProps> = ({
	d,
	delay,
	duration = 5,
	pulseLength = 50,
}) => {
	const [pathLength, setPathLength] = useState(0);
	const pathRef = useRef<SVGPathElement>(null);

	useLayoutEffect(() => {
		if (pathRef.current) {
			const length = pathRef.current.getTotalLength();
			setPathLength(length);
		}
	}, [d]);
	const actualPulseLength = Math.min(pulseLength, pathLength);

	const gapLength = pathLength > 0 ? pathLength - actualPulseLength : 0;

	return (
		<g>
			<path
				ref={pathRef}
				d={d}
				fill="none"
				stroke="rgba(75, 85, 99, 0.2)" // Made it more subtle
				strokeWidth="2"
				strokeLinecap="round"
			/>

			{pathLength > 0 && (
				<motion.path
					d={d}
					fill="none"
					stroke="hsl(180, 100%, 50%)"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeDasharray={`${actualPulseLength} ${gapLength}`}
					initial={{ strokeDashoffset: 0 }}
					animate={{ strokeDashoffset: -pathLength }}
					transition={{
						duration: duration,
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'linear',
						delay: delay,
					}}
				/>
			)}
		</g>
	);
};

export default PulsingLine;
