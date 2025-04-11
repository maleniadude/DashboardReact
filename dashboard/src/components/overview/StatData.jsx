import { motion } from "framer-motion";
import StatCard from "../common/StatCard";
import { useStats } from "../../context/StatContext";

const StatData = () => {
	const { stats } = useStats();
    const categories = ["sales", "users", "products", "orders"];

	return (
		<motion.div
			className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
		>
            {categories.map((category) => {
				const item = stats[category]?.[0]; // Primer dato de cada categoría
				if (!item) return null;

				return (
					<StatCard
						key={category}
						name={item.name}
						icon={item.icon}
						value={item.value}
						color={item.color}
					/>
				);
			})}
		</motion.div>
	);
};

export default StatData;
