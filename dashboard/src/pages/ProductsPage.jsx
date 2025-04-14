import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";
import { useStats } from "../context/StatContext";


const ProductsPage = () => {
	const { stats } = useStats();

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
				className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}>
					{stats.products.map((item, i) => (
						<StatCard
							key={i}
							name={item.name}
							icon={item.icon}
							value={item.value}
							color={item.color}
						/>
					))}
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};

export default ProductsPage

// ProductsPage llama a header, ProductsTable(lista de productos desde context(products) cargados desde localstorage), 
// SalesTrendChart(carga datos aleatorios desde context(stats) para mostrar un grafico de linea) 
// CategoryDistributionChart(carga tambien datos aleatorios desde context(stats) para mostrar un grafico de torta)
// tenemos dentro de un motion.div StatCard para cargar desde context datos aleatorios que se muestran como cards