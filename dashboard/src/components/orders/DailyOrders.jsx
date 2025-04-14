import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useStats } from "../../context/StatContext";

const DailyOrders = () => {
	const { stats } = useStats();
	const ordersData = stats.dailyOrders;

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg md:text-xl font-semibold text-gray-100 mb-4'>
				Ordenes Diarias
			</h2>

			<div className='w-full h-[200px] md:h-[300px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={ordersData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='date' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line
							type='monotone'
							dataKey='orders'
							stroke='#8B5CF6'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default DailyOrders;
