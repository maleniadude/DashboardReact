import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useStats } from "../../context/StatContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

const UserActivityHeatmap = () => {
	const { stats } = useStats();
	const userActivityData = stats?.userActivityHeatmap || [];

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className="text-xl font-semibold text-gray-100 mb-4">Actividad por Horario</h2>

			<div className="h-[300px] w-full">
				{userActivityData.length > 0 ? (
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={userActivityData}
							margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
						>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis
								dataKey="name"
								stroke="#9CA3AF"
								tick={{ fontSize: 12 }}
								angle={-20}
								textAnchor="end"
							/>
							<YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.85)",
									border: "1px solid #4B5563",
									borderRadius: "6px",
								}}
								itemStyle={{ color: "#E5E7EB", fontSize: "14px" }}
								cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
							/>
							<Legend
								wrapperStyle={{ color: "#D1D5DB", fontSize: "13px" }}
								iconSize={12}
							/>
							<Bar dataKey="0-4" stackId="a" fill="#8884d8" />
							<Bar dataKey="4-8" stackId="a" fill="#82ca9d" />
							<Bar dataKey="8-12" stackId="a" fill="#ffc658" />
							<Bar dataKey="12-16" stackId="a" fill="#ff8042" />
							<Bar dataKey="16-20" stackId="a" fill="#0088FE" />
							<Bar dataKey="20-24" stackId="a" fill="#6366F1" />
						</BarChart>
					</ResponsiveContainer>
				) : (
					<div className="text-gray-400 text-center pt-10">
						No hay datos disponibles por el momento.
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default UserActivityHeatmap;
