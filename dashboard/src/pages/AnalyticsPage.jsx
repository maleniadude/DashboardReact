import Header from "../components/common/Header";
import { motion } from "framer-motion";

import StatCard from "../components/common/StatCard";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import { useStats } from "../context/StatContext";

const AnalyticsPage = () => {
	const { stats } = useStats();
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div	className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}>
					{stats.analytics.map((item, i) => (
						<StatCard
							key={i}
							name={item.name}
							icon={item.icon}
							value={item.value}
							color={item.color}
						/>
					))}
				</motion.div>
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
	);
};

export default AnalyticsPage

//RevenueChart(grafico de area, comparando revenue con target)
// ChannelPerformance(grafico de torta, para visualizar los canales de venta)
// ProductPerformance(grafico de barra, comparativo entre sales, revenue y return)
// UserRetention(grafico de linea, que muestra la retencion de usuarios)
// CustomerSegmentation(grafico de segmentos)
// AIPoweredInsights(comentarios generados aleatoriamente por "ia")