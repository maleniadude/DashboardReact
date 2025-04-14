import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { useStats } from "../context/StatContext.jsx";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

const OverviewPage = () => {
	const { stats } = useStats();
	const categories = ["sales", "users", "products", "orders"];

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

				{/* STATS */}
				<motion.div
				className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}>
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

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage

// SalesOverviewChart, CategoryDistributionChart, SalesChannelChart cargan datos desde context(stats)
// para mostrar como funcionan el grafico de tortas, lineas y de barras
// aqui utilizamos statcard y aplicamos 'const item = stats[category]?.[0];' para cargar la primera stat de cada categoria