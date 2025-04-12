import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

import Sidebar from "./components/common/Sidebar";


function App() {

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
		<div className='fixed inset-0 z-0'>
			<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
			<div className='absolute inset-0 backdrop-blur-sm' />
		</div>

      <Sidebar />

      	<Routes>
			<Route path='/' element={<OverviewPage />} />
			<Route path='/products' element={<ProductsPage />} />
			<Route path='/users' element={<UsersPage />} />
			<Route path='/sales' element={<SalesPage />} />
			<Route path='/orders' element={<OrdersPage />} />
			<Route path='/analytics' element={<AnalyticsPage />} />
			<Route path='/settings' element={<SettingsPage />} />
		</Routes>

		<ToastContainer
		position="bottom-right"
		autoClose={900}
		theme="dark"
		toastClassName={() =>
			"bg-gray-800 text-white backdrop-blur-sm border border-gray-700 rounded shadow-lg"
		}
		bodyClassName={() => "text-sm font-medium"}
		closeButton={false}
		/>

    </div>
  )
}

export default App
