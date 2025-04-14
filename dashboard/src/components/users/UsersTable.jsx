import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const roles = ["todos", "Admin", "Customer", "Moderator"];

const ITEMS_PER_PAGE = 5;

const UsersTable = () => {
	const { users, updateUser, deleteUser } = useUser();

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRole, setSelectedRole] = useState("todos");

	const [currentPage, setCurrentPage] = useState(1);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);

	const [currentUser, setCurrentUser] = useState(null);
	const [editErrors, setEditErrors] = useState({});
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		let result = users;

		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			result = result.filter((u) =>
				u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
			);
		}

		if (selectedRole !== "todos") {
			result = result.filter((u) => u.role === selectedRole);
		}

		setFilteredUsers(result);
		setCurrentPage(1);
	}, [searchTerm, selectedRole, users]);

	// Paginación
	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
	const paginatedUsers = filteredUsers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleEditClick = (user) => {
		setCurrentUser(user);
		setEditErrors({});
		setEditModalOpen(true);
	};

	const handleAddClick = () => {
		setCurrentUser({ name: "", email: "", role: "Customer" });
		setEditErrors({});
		setAddModalOpen(true);
	};

	const { addUser } = useUser();

	const handleSave = async () => {
		const errors = validateUser(currentUser);
		if (Object.keys(errors).length > 0) {
			setEditErrors(errors);
			return;
		}
		setIsSaving(true);
		await new Promise((res) => setTimeout(res, 1000));

		if (currentUser.id) {
			updateUser(currentUser.id, currentUser);
		} else {
			addUser(currentUser);
		}

		setIsSaving(false);
		setEditModalOpen(false);
		setCurrentUser(null);
	};

	const handleDeleteClick = (user) => {
		setCurrentUser(user);
		setConfirmModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		setIsDeleting(true);
		await new Promise((res) => setTimeout(res, 1000));
		deleteUser(currentUser.id);
		setIsDeleting(false);
		setConfirmModalOpen(false);
		setCurrentUser(null);
	};

	const validateUser = (user) => {
		const errors = {};
		if (!user.name?.trim()) errors.name = "El nombre es obligatorio";
		if (!user.email?.trim()) errors.email = "El correo es obligatorio";
		return errors;
	};

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

	const renderUserModal = (isEdit = false) => (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
			>
				<h3 className="text-lg font-semibold">
					{isEdit ? "Editar Usuario" : "Agregar Usuario"}
				</h3>

				<input
					type="text"
					className="w-full p-2 rounded bg-gray-700 text-white"
					value={currentUser.name}
					onChange={(e) => {
						setCurrentUser({ ...currentUser, name: e.target.value });
						setEditErrors((prev) => ({ ...prev, name: "" }));
					}}
					placeholder="Nombre"
				/>
				{editErrors.name && <p className="text-red-500 text-sm">{editErrors.name}</p>}

				<input
					type="email"
					className="w-full p-2 rounded bg-gray-700 text-white"
					value={currentUser.email}
					onChange={(e) => {
						setCurrentUser({ ...currentUser, email: e.target.value });
						setEditErrors((prev) => ({ ...prev, email: "" }));
					}}
					placeholder="Correo"
				/>
				{editErrors.email && <p className="text-red-500 text-sm">{editErrors.email}</p>}

				<select
					className="w-full p-2 rounded bg-gray-700 text-white"
					value={currentUser.role}
					onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
				>
					{roles
						.filter((r) => r !== "todos")
						.map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
				</select>

				<div className="flex justify-end gap-2">
					<button
						onClick={() => {
							setEditModalOpen(false);
							setAddModalOpen(false);
							setCurrentUser(null);
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
						{isSaving ? "Guardando..." : "Guardar"}
					</button>
				</div>
			</motion.div>
		</motion.div>
	);

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.1 }}
		>
			{/* Header */}
			<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Lista de Usuarios</h2>

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

					<select
						className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none"
						value={selectedRole}
						onChange={(e) => setSelectedRole(e.target.value)}
					>
						{roles.map((r) => (
							<option key={r} value={r}>
								{r.charAt(0).toUpperCase() + r.slice(1)}
							</option>
						))}
					</select>

					<button
						onClick={() => {
							setCurrentUser({ name: "", email: "", role: "usuario" });
							setEditErrors({});
							setAddModalOpen(true);
						}}
						className="bg-blue-700 text-white rounded-lg px-3 py-2 focus:outline-none hover:bg-blue-800"
					>
						+
					</button>
				</div>
			</div>

			{/* Tabla */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							{["Nombre", "Correo", "Rol", "Acciones"].map((h) => (
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
						{paginatedUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<td className="px-6 py-4 text-sm text-gray-100">{user.name}</td>
								<td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
								<td className="px-6 py-4 text-sm text-gray-300 capitalize">{user.role}</td>
								<td className="px-6 py-4 text-sm text-gray-300">
									<button
										className="text-indigo-400 hover:text-indigo-300 mr-2"
										onClick={() => handleEditClick(user)}
									>
										<Edit size={18} />
									</button>
									<button
										className="text-red-400 hover:text-red-300"
										onClick={() => handleDeleteClick(user)}
									>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Paginación */}
			{renderPagination()}

			{/* Modales */}
			<AnimatePresence>
				{editModalOpen && currentUser && renderUserModal(true)}
				{addModalOpen && currentUser && renderUserModal(false)}

				{/* Confirmar eliminación */}
				{confirmModalOpen && (
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
							<h3 className="text-lg font-semibold text-red-400">¿Eliminar usuario?</h3>
							<p className="text-gray-300">
								¿Estás seguro de que quieres eliminar{" "}
								<span className="text-white font-semibold">{currentUser?.name}</span>?
							</p>
							<div className="flex justify-end gap-2">
								<button
									onClick={() => setConfirmModalOpen(false)}
									className="text-gray-300 hover:text-white"
								>
									Cancelar
								</button>
								<button
									onClick={handleConfirmDelete}
									className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500 disabled:opacity-50"
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

export default UsersTable;

// lista de usuarios, para ver los usuarios guardados en localstorage
// y tenemos para renderizar el modal de creacion, edit y eliminacion
//a parte de tener un paginado, filtrado y busqueda 