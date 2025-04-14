import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const orderData = [
  { id: "ORD001", customer: "John Doe", total: 235.4, status: "Delivered", date: "2023-07-01" },
  { id: "ORD002", customer: "Jane Smith", total: 412.0, status: "Processing", date: "2023-07-02" },
  { id: "ORD003", customer: "Bob Johnson", total: 162.5, status: "Shipped", date: "2023-07-03" },
  { id: "ORD004", customer: "Alice Brown", total: 750.2, status: "Pending", date: "2023-07-04" },
  { id: "ORD005", customer: "Charlie Wilson", total: 95.8, status: "Delivered", date: "2023-07-05" },
  { id: "ORD006", customer: "Eva Martinez", total: 310.75, status: "Processing", date: "2023-07-06" },
  { id: "ORD007", customer: "David Lee", total: 528.9, status: "Shipped", date: "2023-07-07" },
  { id: "ORD008", customer: "Grace Taylor", total: 189.6, status: "Delivered", date: "2023-07-08" },
];

const ITEMS_PER_PAGE = 5;

const OrdersTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);
  const [currentPage, setCurrentPage] = useState(1);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedOrder(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orderData
      .filter(
        (order) =>
          order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >

		<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
			<h2 className="text-xl font-semibold text-gray-100">Ordenes</h2>

			<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
				<div className="relative w-full sm:w-60">
					<input
						type="text"
						placeholder="Buscar..."
						className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
				</div>
			</div>
		</div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["Order ID", "Customer", "Total", "Status", "Date", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "Processing"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : order.status === "Shipped"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                      title="View Order"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="relative bg-gray-800 text-white rounded-xl p-6 w-full max-w-lg md:max-w-md border border-gray-700 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold">Order Details</h3>
              <div className="space-y-2">
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrdersTable;
