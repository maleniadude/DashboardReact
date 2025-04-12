import { createContext, useContext, useEffect, useState } from "react";
import {Zap,Users,ShoppingBag,BarChart2,DollarSign,Clock,TrendingUp,PackageCheck,} from "lucide-react";
import { statConfig } from "../config/StatConfig";

//  generar valores aleatorios
const getRandomStatValue = (label) => {
	if (label.toLowerCase().includes("rate")) return `${(Math.random() * 100).toFixed(1)}%`;
	if (label.toLowerCase().includes("value")) return `$${(Math.random() * 200).toFixed(2)}`;
	if (label.toLowerCase().includes("sales") || label.toLowerCase().includes("revenue"))
		return `$${(Math.random() * 2000 + 1000).toFixed(0)}`;
	if (label.toLowerCase().includes("time")) return `${(Math.random() * 10).toFixed(2)} min`;
	return Math.floor(Math.random() * 1000 + 50).toString();
};

const generateCategoryStats = (category) => {
	const categoryLabels = {
		products: ["Total Products", "Low Stock", "New Arrivals", "Discontinued"],
		sales: ["Total Sales", "Revenue Growth", "Refunds", "Avg. Order Value"],
		users: ["New Users", "Active Users", "Churn Rate", "Subscribers"],
		orders: ["Total Orders", "Pending Orders", "Completed Orders", "Canceled Orders"],
		analytics: ["Conversion Rate", "Bounce Rate", "Session Time", "Page Views"],
	};

	return categoryLabels[category].map((label) => {
		const config = statConfig[label] || {};
		return {
			name: label,
			value: getRandomStatValue(label),
			icon: config.icon || BarChart2,
			color: config.color || "#6B7280",
		};
	});
};

// datos para los barcharts
const generateUserActivityHeatmap = () => {
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	return days.map((day) => ({
		name: day,
		"0-4": Math.floor(Math.random() * 20),
		"4-8": Math.floor(Math.random() * 40),
		"8-12": Math.floor(Math.random() * 80),
		"12-16": Math.floor(Math.random() * 60),
		"16-20": Math.floor(Math.random() * 50),
		"20-24": Math.floor(Math.random() * 30),
	}));
};


const generateDailySalesTrend = () => {
	const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
	return days.map((day) => ({
		day,
		sales: Math.floor(Math.random() * 500 + 200),
	}));
};

const generateProductPerformance = () => {
	const products = ["Product A", "Product B", "Product C", "Product D", "Product E"];
	return products.map((name) => ({
		name,
		sales: Math.floor(Math.random() * 5000 + 1000),
		revenue: parseFloat((Math.random() * 2000 + 300).toFixed(1)),
		return: Math.floor(Math.random() * 500),
	}));
};


//datos para los piecharts
const generateCategoryDistribution = () => {
	const categories = ["Electronics", "Clothing", "Home", "Books", "Sports"];
	return categories.map((name) => ({
		name,
		value: Math.floor(Math.random() * 3000 + 1000),
	}));
};

const generateUserDemographics = () => {
	const segments = ["18-24", "25-34", "35-44", "45-54", "55+"];
	return segments.map((group) => ({
		group,
		value: Math.floor(Math.random() * 2000 + 500),
	}));
};

const generateSalesByCategory = () => {
	const categories = ["Electronics", "Clothing", "Books", "Home", "Toys"];
	return categories.map((category) => ({
		category,
		value: Math.floor(Math.random() * 3000 + 1000),
	}));
};

const generateOrderStatusDistribution = () => {
	return [
		{ status: "Completed", value: Math.floor(Math.random() * 500 + 200) },
		{ status: "Pending", value: Math.floor(Math.random() * 300 + 100) },
		{ status: "Canceled", value: Math.floor(Math.random() * 200 + 50) },
		{ status: "Refunded", value: Math.floor(Math.random() * 100 + 20) },
	];
};

const generateChannelPerformance = () => {
	const channels = ["Website", "Mobile App", "Email", "Social Media", "Affiliates", "Others"];
	return channels.map((name) => ({
		name,
		value: Math.floor(Math.random() * 1500 + 300),
	}));
};

//datos para linecharts
const generateRevenueData = () => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
	return months.map((month) => ({
		month,
		revenue: Math.floor(Math.random() * 2000 + 4000),
		target: Math.floor(Math.random() * 2000 + 4000),
	}));
};

const RandomSalesData = () => {
	const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
	return months.map(month => ({
		name: month,
		sales: Math.floor(Math.random() * 4000 + 4000),
	}));
};

const generateSalesTrend = () => {
	const months = ["Jan", "Feb", "Mar", "Apr"];
	return months.map((month) => ({
		month,
		sales: Math.floor(Math.random() * 2000 + 1000),
	}));
};

const generateUserGrowth = () => {
	const months = ["Jan", "Feb", "Mar", "Apr"];
	return months.map((month) => ({
		month,
		users: Math.floor(Math.random() * 1500 + 500),
	}));
};

const generateDailyOrders = () => {
	const days = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
	return days.map((day) => ({
		day,
		orders: Math.floor(Math.random() * 100 + 20),
	}));
};

const generateUserRetention = () => {
	const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
	return weeks.map((week) => ({
		week,
		retention: parseFloat((Math.random() * 40 + 50).toFixed(1)),
	}));
};

const StatContext = createContext();

// Hook personalizado
export const useStats = () => useContext(StatContext);

// Provider
const StatProvider = ({ children }) => {
	const generateStats = () => ({
		// datos generales
		products: generateCategoryStats("products"),
		sales: generateCategoryStats("sales"),
		users: generateCategoryStats("users"),
		orders: generateCategoryStats("orders"),
		analytics: generateCategoryStats("analytics"),
		// datos de linecharts
		revenueChart: generateRevenueData(),
		salesTrend: generateSalesTrend(),
		userGrowth: generateUserGrowth(),
		dailyOrders: generateDailyOrders(),
		userRetention: generateUserRetention(),
		salesData: RandomSalesData(),
		// datos de piecharts
		categoryDistribution: generateCategoryDistribution(),
		userDemographics: generateUserDemographics(),
		salesByCategory: generateSalesByCategory(),
		orderStatusDistribution: generateOrderStatusDistribution(),
		channelPerformance: generateChannelPerformance(),
		// datos para barcharts
		userActivityHeatmap: generateUserActivityHeatmap(),
		dailySalesTrend: generateDailySalesTrend(),
		productPerformance: generateProductPerformance(),
	});
	

	const [stats, setStats] = useState(generateStats());

	return (
		<StatContext.Provider value={{ stats, regenerate: () => setStats(generateStats()) }}>
			{children}
		</StatContext.Provider>
	);
};
export default StatProvider;