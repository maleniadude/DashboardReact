import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { useStats } from "../../context/StatContext";

const SalesTrendChart = () => {
	const { stats } = useStats();
	const salesData = stats.salesTrend;

	return (
		<motion.div
			className="w-full max-w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className="text-base sm:text-lg font-medium mb-4 text-gray-100">
				Tendencia de Ventas
			</h2>

			<div className="h-64 sm:h-72 md:h-80 lg:h-96">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="month" stroke="#9ca3af" />
						<YAxis stroke="#9ca3af" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type="monotone"
							dataKey="sales"
							stroke="#6366F1"
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesTrendChart;
