import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const generateAnalyticsData = () => ({
	revenueGrowth: Math.random() * 20,
	retentionChange: Math.random() * 10,
	topCategory: "Electronics",
	profitOpportunity: 5 + Math.random() * 3,
});

const generateInsights = (data) => [
	{
		icon: TrendingUp,
		color: "text-green-500",
		insight: `Los ingresos aumentaron un ${data.revenueGrowth.toFixed(1)}% en comparación con el mes pasado, impulsados ​​por campañas específicas.`,
	},
	{
		icon: Users,
		color: "text-blue-500",
		insight: `La retención de clientes mejoró en un ${data.retentionChange.toFixed(1)}% después de los recientes esfuerzos de interacción.`,
	},
	{
		icon: ShoppingBag,
		color: "text-purple-500",
		insight: `La categoría de producto "${data.topCategory}" muestra el mayor potencial de crecimiento este trimestre.`,
	},
	{
		icon: DollarSign,
		color: "text-yellow-500",
		insight: `La optimización de la estrategia de precios podría aumentar los márgenes de ganancia en un estimado de ${data.profitOpportunity.toFixed(1)}%.`,
	},
];

const AIPoweredInsights = () => {
	const analytics = generateAnalyticsData();
	const insights = generateInsights(analytics);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.0 }}
		>
			<h2 className='text-lg md:text-xl font-semibold text-gray-100 mb-3 md:mb-4'>
				AI-Powered Insights
			</h2>
			<p className='text-gray-400 mb-3 text-sm md:text-base'>
			según los últimos análisis:
			</p>
			<div className='space-y-4'>
				{insights.map((item, index) => (
					<motion.div
						key={index}
						className='flex flex-col sm:flex-row sm:items-center gap-3'
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1.1 + index * 0.2 }}
					>
						<div
							className={`p-2 rounded-full ${item.color} bg-opacity-20 transition-transform hover:scale-110 self-start sm:self-auto`}
						>
							<item.icon className={`size-6 ${item.color}`} />
						</div>
						<p className='text-gray-300 text-sm sm:text-base'>
							{item.insight}
						</p>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default AIPoweredInsights;
