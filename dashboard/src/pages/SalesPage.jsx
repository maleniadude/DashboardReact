import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";
import { useStats } from "../context/StatContext";

const SalesPage = () => {
	const { stats } = useStats();

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Sales' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
				className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}>
					{stats.sales.map((item, i) => (
						<StatCard
							key={i}
							name={item.name}
							icon={item.icon}
							value={item.value}
							color={item.color}
						/>
					))}
				</motion.div>

				<SalesOverviewChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<SalesByCategoryChart />
					<DailySalesTrend />
				</div>
			</main>
		</div>
	);
};

export default SalesPage

// SalesOverviewChart(grafico de area), SalesByCategoryChart(grafico de tortas), DailySalesTrend(grafico de barras)
//datos aleatorios de sales cargados en statcards