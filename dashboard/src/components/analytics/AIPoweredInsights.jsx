import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const generateAnalyticsData = () => ({
	revenueGrowth: Math.random() * 20,
	retentionChange: Math.random() * 10,
	topCategory: "Electronics",
	profitOpportunity: 5 + Math.random() * 3,
});

const generateInsights = (data) => {
	return [
		{
			icon: TrendingUp,
			color: "text-green-500",
			insight: `Revenue is up ${data.revenueGrowth.toFixed(1)}% compared to last month, driven by targeted campaigns.`,
		},
		{
			icon: Users,
			color: "text-blue-500",
			insight: `Customer retention improved by ${data.retentionChange.toFixed(1)}% after recent engagement efforts.`,
		},
		{
			icon: ShoppingBag,
			color: "text-purple-500",
			insight: `Product category "${data.topCategory}" is showing the highest growth potential this quarter.`,
		},
		{
			icon: DollarSign,
			color: "text-yellow-500",
			insight: `Optimizing pricing strategy could boost profit margins by an estimated ${data.profitOpportunity.toFixed(1)}%.`,
		},
	];
};

const AIPoweredInsights = () => {
	const analytics = generateAnalyticsData();
	const insights = generateInsights(analytics);
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.0 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>AI-Powered Insights</h2>
			<p className='text-gray-400 mb-2 text-sm'>
				Here’s what our AI suggests based on the latest analytics:
			</p>
			<div className='space-y-4'>
				{insights.map((item, index) => (
					<motion.div
						key={index}
						className='flex items-center space-x-3'
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1.1 + index * 0.2 }}
					>
						<div className={`p-2 rounded-full ${item.color} bg-opacity-20 transition-transform hover:scale-110`}>
							<item.icon className={`size-6 ${item.color}`} />
						</div>
						<p className='text-gray-300'>{item.insight}</p>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
export default AIPoweredInsights;
