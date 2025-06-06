import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStats } from "../../context/StatContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const SalesByCategoryChart = () => {
  const { stats } = useStats();
  const salesByCategory = stats.salesByCategory;

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">
        Ventas por categoria
      </h2>

      <div className="w-full h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesByCategory}
              cx="50%"
              cy="50%"
              outerRadius="70"
              dataKey="value"
              nameKey="category"
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {salesByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend
              wrapperStyle={{
                color: "#E5E7EB",
                fontSize: "0.875rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesByCategoryChart;
