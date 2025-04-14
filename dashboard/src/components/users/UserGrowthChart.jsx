import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useStats } from "../../context/StatContext";

const UserGrowthChart = () => {
	const { stats } = useStats();
	const growthData = stats?.userGrowth || [];

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">
				Crecimiento de Usuarios
			</h2>

			<div className="w-full h-64 sm:h-80 md:h-96">
				{growthData.length > 0 ? (
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis
								dataKey="month"
								stroke="#9CA3AF"
								tick={{ fontSize: 12 }}
								interval={0}
								angle={-30}
								textAnchor="end"
							/>
							<YAxis
								stroke="#9CA3AF"
								tick={{ fontSize: 12 }}
								allowDecimals={false}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.9)",
									border: "1px solid #4B5563",
									borderRadius: "6px",
								}}
								itemStyle={{ color: "#E5E7EB", fontSize: "14px" }}
								cursor={{ stroke: "#8B5CF6", strokeWidth: 1 }}
							/>
							<Line
								type="monotone"
								dataKey="users"
								stroke="#8B5CF6"
								strokeWidth={2}
								dot={{ fill: "#8B5CF6", r: 4 }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className="text-gray-400 text-center text-sm pt-8">
						No hay datos disponibles por el momento.
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default UserGrowthChart;
