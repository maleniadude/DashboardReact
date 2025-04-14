import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { useStats } from "../../context/StatContext";

const ProductPerformance = () => {
	const { stats } = useStats();
	const productPerformanceData = stats.productPerformance;

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-gray-700 overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			{/* Título oculto en dispositivos móviles */}
			<h2 className='hidden md:block text-lg md:text-xl font-semibold text-gray-100 mb-3 md:mb-4'>
				Rendimiento del Producto
			</h2>

			{/* Ajuste del aspecto en pantallas grandes y pequeñas */}
			<div className='w-full aspect-[1/1] md:aspect-[4/3] min-h-[250px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={productPerformanceData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						{/* Oculto la leyenda en pantallas pequeñas */}
						<Legend className='hidden md:block' />
						<Bar dataKey='sales' fill='#8884d8' />
						<Bar dataKey='revenue' fill='#10B981' />
						<Bar dataKey='return' fill='#ffc658' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default ProductPerformance;
