import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useStats } from "../../context/StatContext";
import { useState } from "react";

const RandomSalesData = () => {
	const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
	return months.map(month => ({
		name: month,
		sales: Math.floor(Math.random() * 4000 + 4000),
	}));
};


const SalesOverviewChart = () => {
	const { stats } = useStats();
	const salesData = stats.salesData;
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Ventas</h2>
				<div className="flex items-center justify-between mb-6">
				

					<select
					className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
					>
					<option>This Week</option>
					<option>This Month</option>
					<option>This Quarter</option>
					<option>This Year</option>
					</select>
				</div>
			</div>


			<div className="w-full h-64 sm:h-80">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
						<XAxis dataKey="month" stroke="#9CA3AF" />
						<YAxis stroke="#9CA3AF" />
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
						stroke="#8B5CF6"
						fill="#8B5CF6"
						fillOpacity={0.3}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesOverviewChart;
