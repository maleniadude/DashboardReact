import { motion } from "framer-motion";
import {
	ResponsiveContainer,
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Legend,
	Tooltip,
} from "recharts";

const generateCustomerSegmentationData = () => {
	const categories = ["Engagement", "Loyalty", "Satisfaction", "Spend", "Frequency", "Recency"];
	return categories.map((subject) => ({
		subject,
		A: Math.floor(Math.random() * 150),
		B: Math.floor(Math.random() * 150),
		fullMark: 150,
	}));
};

const CustomerSegmentation = () => {
	const customerSegmentationData = generateCustomerSegmentationData();
	const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-gray-700 overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6 }}
		>
			{/* Título oculto en móviles */}
			<h2 className='hidden md:block text-lg md:text-xl font-semibold text-gray-100 mb-3 md:mb-4'>
				Segmentación de Clientes
			</h2>

			{/* Aspect ratio adaptable: cuadrado en mobile, rectangular en desktop */}
			<div className='w-full aspect-[1/1] md:aspect-[4/3] min-h-[250px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadarChart cx='50%' cy='50%' outerRadius='80%' data={customerSegmentationData}>
						<PolarGrid stroke='#374151' />
						<PolarAngleAxis dataKey='subject' stroke='#9CA3AF' />
						<PolarRadiusAxis angle={30} domain={[0, 150]} stroke='#9CA3AF' />
						<Radar name='Segmento A' dataKey='A' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.6} />
						<Radar name='Segmento B' dataKey='B' stroke='#10B981' fill='#10B981' fillOpacity={0.6} />
						{isDesktop && <Legend />}
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default CustomerSegmentation;
