import {
	Zap,
	Users,
	ShoppingBag,
	BarChart2,
	DollarSign,
	Clock,
	TrendingUp,
	PackageCheck,
} from "lucide-react";

export const statConfig = {
	// Products
	"Total Products": {
		icon: ShoppingBag,
		color: "#3B82F6", // blue-500
	},
	"Low Stock": {
		icon: PackageCheck,
		color: "#F59E0B", // amber-500
	},
	"New Arrivals": {
		icon: TrendingUp,
		color: "#10B981", // emerald-500
	},
	"Discontinued": {
		icon: BarChart2,
		color: "#EF4444", // red-500
	},

	// Sales
	"Total Sales": {
		icon: DollarSign,
		color: "#6366F1", // indigo-500
	},
	"Revenue Growth": {
		icon: TrendingUp,
		color: "#22C55E", // green-500
	},
	"Refunds": {
		icon: BarChart2,
		color: "#F87171", // rose-400
	},
	"Avg. Order Value": {
		icon: DollarSign,
		color: "#8B5CF6", // violet-500
	},

	// Users
	"New Users": {
		icon: Users,
		color: "#3B82F6", // blue-500
	},
	"Active Users": {
		icon: Zap,
		color: "#FBBF24", // yellow-400
	},
	"Churn Rate": {
		icon: BarChart2,
		color: "#EF4444", // red-500
	},
	"Subscribers": {
		icon: Users,
		color: "#A855F7", // purple-500
	},

	// Orders
	"Total Orders": {
		icon: ShoppingBag,
		color: "#06B6D4", // cyan-500
	},
	"Pending Orders": {
		icon: Clock,
		color: "#F59E0B", // amber-500
	},
	"Completed Orders": {
		icon: PackageCheck,
		color: "#10B981", // green-500
	},
	"Canceled Orders": {
		icon: BarChart2,
		color: "#EF4444", // red-500
	},

	// Analytics
	"Conversion Rate": {
		icon: TrendingUp,
		color: "#10B981", // green-500
	},
	"Bounce Rate": {
		icon: BarChart2,
		color: "#F97316", // orange-500
	},
	"Session Time": {
		icon: Clock,
		color: "#60A5FA", // blue-400
	},
	"Page Views": {
		icon: BarChart2,
		color: "#9333EA", // purple-600
	},
};
