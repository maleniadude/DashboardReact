import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence } from 'framer-motion';
import { useProductContext } from "../../context/ProductContext";

const ProductsTable = () => {
	const { products, addProduct, updateProduct, deleteProduct } = useProductContext();

	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
	  name: "",
	  category: "",
	  price: "",
	  stock: "",
	  sales: "",
	});
	
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
	
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	
	const [currentProduct, setCurrentProduct] = useState(null);
	
	const [editErrors, setEditErrors] = useState({});
	const [createErrors, setCreateErrors] = useState({});
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	
	const onEdit = (product) => () => handleEditClick(product);
	
	// Filtrado de productos
	useEffect(() => {
	  const term = searchTerm.toLowerCase();
	  const filtered = products.filter(
		(p) =>
		  p.name.toLowerCase().includes(term) ||
		  p.category.toLowerCase().includes(term)
	  );
	  setFilteredProducts(filtered);
	}, [products, searchTerm]);
	
	// Editar
	const handleEditClick = (product) => {
	  setCurrentProduct(product);
	  setEditErrors({});
	  setEditModalOpen(true);
	};
	
	// Eliminar
	const handleDeleteClick = (product) => {
	  setCurrentProduct(product);
	  setConfirmModalOpen(true);
	};
	
	// Guardar cambios de edición
	const handleSave = async () => {
	  const errors = validateProduct(currentProduct);
	  if (Object.keys(errors).length > 0) {
		setEditErrors(errors);
		return;
	  }
	
	  setIsSaving(true);
	  await new Promise((res) => setTimeout(res, 1000));
	
	  updateProduct({
		...currentProduct,
		price: parseFloat(currentProduct.price),
		stock: parseInt(currentProduct.stock),
	  });
	
	  setIsSaving(false);
	  setEditModalOpen(false);
	  setEditErrors({});
	};
	
	// Confirmar eliminación
	const handleConfirmDelete = async () => {
	  setIsDeleting(true);
	  await new Promise((res) => setTimeout(res, 1000));
	  deleteProduct(currentProduct.id);
	  setIsDeleting(false);
	  setConfirmModalOpen(false);
	  setCurrentProduct(null);
	};
	
	// Validación (para crear y editar)
	const validateProduct = (product) => {
	  const newErrors = {};
	  if (!product.name.trim()) newErrors.name = "El nombre es obligatorio";
	  if (!product.category?.trim()) newErrors.category = "La categoría es obligatoria";
	  if (product.price === "" || isNaN(product.price)) newErrors.price = "Precio inválido";
	  if (product.stock === "" || isNaN(product.stock)) newErrors.stock = "Stock inválido";
	  if (product.sales === "" || isNaN(product.sales)) newErrors.sales = "Ventas inválidas";
	  return newErrors;
	};
	
	// ➕ Crear producto
	const handleCreateProduct = async () => {
	  const errors = validateProduct(newProduct);
	  if (Object.keys(errors).length > 0) {
		setCreateErrors(errors);
		return;
	  }
	
	  setIsCreating(true);
	  await new Promise((res) => setTimeout(res, 1000));
	
	  addProduct({
		...newProduct,
		price: parseFloat(newProduct.price),
		stock: parseInt(newProduct.stock),
		sales: parseInt(newProduct.sales),
	  });
	
	  setNewProduct({ name: "", category: "", price: "", stock: "", sales: "" });
	  setCreateErrors({});
	  setIsCreating(false);
	  setCreateModalOpen(false);
	};	

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
		<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
		<h2 className="text-xl font-semibold text-gray-100">Product List</h2>
		
		<div className="flex gap-2 items-center">
			<button
			onClick={() => setCreateModalOpen(true)}
			className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
			>
			+
			</button>

			<div className="flex relative">
				<input
					type="text"
					placeholder="Buscar productos..."
					className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
			</div>
		</div>
		</div>

    	<div className="overflow-x-auto">
        	<table className="min-w-full divide-y divide-gray-700">
				<thead>
					<tr>
						{["Name", "Category", "Price", "Stock", "Sales", "Actions"].map((h) => (
							<th
								key={h}
								className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-700">
					{filteredProducts.map((product) => (
						<motion.tr
							key={product.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}>
							<td className="px-6 py-4 text-sm font-medium text-gray-100 flex gap-2 items-center">
							<img
								src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500"
								alt="Product"
								className="size-10 rounded-full object-cover"
							/>
							{product.name}
							</td>
							<td className="px-6 py-4 text-sm text-gray-300">{product.category}</td>
							<td className="p-2 text-white">${Number(product.price).toFixed(2)}</td>
							<td className="px-6 py-4 text-sm text-gray-300">{product.stock}</td>
							<td className="px-6 py-4 text-sm text-gray-300">{product.sales}</td>
							<td className="px-6 py-4 text-sm text-gray-300">
								<button
									className="text-indigo-400 hover:text-indigo-300 mr-2"
									onClick={onEdit(product)}>
									<Edit size={18} />
								</button>
								<button
									className="text-red-400 hover:text-red-300"
									onClick={() => handleDeleteClick(product)}>
									<Trash2 size={18} />
								</button>
							</td>
						</motion.tr>
					))}
				</tbody>
        	</table>
      	</div>

    	{/* Modal para crear producto */}
	  	<AnimatePresence>
			{createModalOpen && (
				<motion.div
					className='fixed inset-0 z-100 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					<motion.div
						className='bg-gray-800 text-white rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-xl space-y-4'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}>
						<h3 className='text-lg font-semibold'>Nuevo Producto</h3>

						<input
						type='text'
						className='w-full p-2 rounded bg-gray-700 text-white'
						placeholder='Nombre'
						value={newProduct.name}
						onChange={(e) => {
							setNewProduct({ ...newProduct, name: e.target.value });
							setCreateErrors({ ...createErrors, name: "" });
						}}
						/>
						{createErrors.name && <p className='text-red-700 text-sm'>{createErrors.name}</p>}

						<input
						type='text'
						className='w-full p-2 rounded bg-gray-700 text-white'
						placeholder='Categoría'
						value={newProduct.category}
						onChange={(e) => {
							setNewProduct({ ...newProduct, category: e.target.value });
							setCreateErrors({ ...createErrors, category: "" });
						}}
						/>
						{createErrors.category && <p className='text-red-700 text-sm'>{createErrors.category}</p>}

						<input
						type='number'
						className='w-full p-2 rounded bg-gray-700 text-white'
						placeholder='Precio'
						value={newProduct.price}
						onChange={(e) => {
							setNewProduct({ ...newProduct, price: e.target.value });
							setCreateErrors({ ...createErrors, price: "" });
						}}
						/>
						{createErrors.price && <p className='text-red-700 text-sm'>{createErrors.price}</p>}

						<input
						type='number'
						className='w-full p-2 rounded bg-gray-700 text-white'
						placeholder='Stock'
						value={newProduct.stock}
						onChange={(e) => {
							setNewProduct({ ...newProduct, stock: e.target.value });
							setCreateErrors({ ...createErrors, stock: "" });
						}}
						/>
						{createErrors.stock && <p className='text-red-700 text-sm'>{createErrors.stock}</p>}

						<input
						type='number'
						className='w-full p-2 rounded bg-gray-700 text-white'
						placeholder='Ventas'
						value={newProduct.sales}
						onChange={(e) => {
							setNewProduct({ ...newProduct, sales: e.target.value });
							setCreateErrors({ ...createErrors, sales: "" });
						}}
						/>
						{createErrors.sales && <p className='text-red-700 text-sm'>{createErrors.sales}</p>}

						<div className='flex justify-end gap-2'>
							<button onClick={() => setCreateModalOpen(false)} className='text-gray-300 hover:text-white'>
								Cancelar
							</button>
							<button
								onClick={handleCreateProduct}
								className='bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500 disabled:opacity-50'
								disabled={isCreating}
							>
								{isCreating ? "Creando..." : "Crear"}
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>


		{/* modal para editar */}
		<AnimatePresence>
			{editModalOpen && currentProduct && (
				<motion.div
				className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				>
				<motion.div
					className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-xl space-y-4"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
				>
					<h3 className="text-lg font-semibold">Editar Producto</h3>

					{/* Nombre */}
					<input
						type="text"
						className="w-full p-2 rounded bg-gray-700 text-white"
						value={currentProduct.name || ''}
						onChange={(e) => {
							setCurrentProduct({ ...currentProduct, name: e.target.value });
							setEditErrors((prev) => ({ ...prev, name: '' }));
						}}
						placeholder="Nombre"
					/>
					{editErrors.name && <p className="text-red-500 text-sm">{editErrors.name}</p>}

					{/* Precio */}
					<input
						type="number"
						className="w-full p-2 rounded bg-gray-700 text-white"
						value={currentProduct.price ?? ''}
						onChange={(e) => {
							setCurrentProduct({ ...currentProduct, price: e.target.value });
							setEditErrors((prev) => ({ ...prev, price: '' }));
						}}
						placeholder="Precio"
					/>
					{editErrors.price && <p className="text-red-500 text-sm">{editErrors.price}</p>}

					{/* Stock */}
					<input
						type="number"
						className="w-full p-2 rounded bg-gray-700 text-white"
						value={currentProduct.stock ?? ''}
						onChange={(e) => {
							setCurrentProduct({ ...currentProduct, stock: e.target.value });
							setEditErrors((prev) => ({ ...prev, stock: '' }));
						}}
						placeholder="Stock"
					/>
					{editErrors.stock && <p className="text-red-500 text-sm">{editErrors.stock}</p>}

					{/* Botones */}
					<div className="flex justify-end gap-2">
						<button
							onClick={() => {
							setEditModalOpen(false);
							setCurrentProduct(null);
							setEditErrors({});
							}}
							className="text-gray-300 hover:text-white"
						>
							Cancelar
						</button>
						<button
							onClick={handleSave}
							className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 disabled:opacity-50"
							disabled={isSaving}
						>
							{isSaving ? 'Guardando...' : 'Guardar'}
						</button>
					</div>
				</motion.div>
				</motion.div>
			)}
		</AnimatePresence>



		{/* modal para eliminacion */}
		<AnimatePresence>
			{confirmModalOpen && (
				<motion.div
				className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				>
					<motion.div
						className='bg-gray-800 text-white rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-xl space-y-4'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
					>
						<h3 className='text-lg font-semibold text-red-400'>¿Eliminar producto?</h3>
						<p className='text-gray-300'>
						¿Estás seguro de que quieres eliminar{" "}
						<span className='text-white font-semibold'>{currentProduct?.name}</span>?
						</p>
						<div className='flex justify-end gap-2'>
						<button onClick={() => setConfirmModalOpen(false)} className='text-gray-300 hover:text-white'>
							Cancelar
						</button>
						<button
							onClick={handleConfirmDelete}
							className='bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500 disabled:opacity-50'
							disabled={isDeleting}
						>
							{isDeleting ? "Eliminando..." : "Eliminar"}
						</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
    </motion.div>
  );
};

export default ProductsTable;
