import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useStats } from "../../context/StatContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

const UserDemographicsChart = () => {
	const { stats } = useStats();
	const userDemographicsData = stats?.userDemographics || [];

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 lg:col-span-2"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<h2 className="text-xl font-semibold text-gray-100 mb-4">Demografo de Usuarios</h2>

			<div className="h-[300px] w-full">
				{userDemographicsData.length > 0 ? (
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={userDemographicsData}
								cx="50%"
								cy="50%"
								outerRadius={70}
								fill="#8884d8"
								dataKey="value"
								nameKey="group"
								label={({ group, percent }) =>
									`${group} ${(percent * 100).toFixed(0)}%`
								}
							>
								{userDemographicsData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.85)",
									borderColor: "#4B5563",
									borderRadius: 6,
								}}
								itemStyle={{ color: "#E5E7EB", fontSize: "14px" }}
							/>
							<Legend
								wrapperStyle={{
									color: "#D1D5DB",
									fontSize: "13px",
								}}
								iconSize={12}
								layout="horizontal"
								align="center"
								verticalAlign="bottom"
							/>
						</PieChart>
					</ResponsiveContainer>
				) : (
					<div className="text-gray-400 text-center pt-10">
						No hay datos de demografía disponibles.
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default UserDemographicsChart;
