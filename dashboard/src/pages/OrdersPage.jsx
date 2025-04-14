
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import { useStats } from "../context/StatContext";

const OrdersPage = () => {
	const { stats } = useStats();

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Orders' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
				className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}>
					{stats.orders.map((item, i) => (
						<StatCard
							key={i}
							name={item.name}
							icon={item.icon}
							value={item.value}
							color={item.color}
						/>
					))}
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div>

				<OrdersTable />
			</main>
		</div>
	);
};

export default OrdersPage

// DailyOrders, OrderDistribution. cargan desde context(stats)
// grafico de torta y de lineas
// OrdersTable(lista de productos cargados en estatico)