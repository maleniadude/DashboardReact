import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useStats } from "../../context/StatContext";

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

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Sales Overview</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",}}
							itemStyle={{ color: "#E5E7EB" }}/>
						<Line	type='monotone'
								dataKey='sales'
								stroke='#6366F1'
								strokeWidth={3}
								dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
								activeDot={{ r: 8, strokeWidth: 2 }}/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesOverviewChart;
