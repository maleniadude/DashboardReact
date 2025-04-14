import { useContext, useState, useEffect } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { UserContext } from "../../context/UserContext";
import Login from "../registration/Login";
import Register from "../registration/Register";
import { AnimatePresence, motion } from "framer-motion";

import ConnectedAccounts from "../settings/ConnectedAccounts";
import DangerZone from "../settings/DangerZone";
import Notifications from "../settings/Notifications";
import Security from "../settings/Security";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
	const { currentUser } = useContext(UserContext);
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	useEffect(() => {
		if (currentUser) {
			setShowLogin(false);
			setShowRegister(false);
		}
	}, [currentUser]);

	// if para condicionar si no hay una cuenta abierta, mostrando modales para login o register
	if (!currentUser) {
		return (
			<SettingSection icon={User} title="Profile">
				<p className="text-gray-400 mb-4">No hay sesión activa.</p>

				<div className="flex flex-col sm:flex-row gap-4 w-full">
					<button
						onClick={() => {
							setShowLogin(true);
							setShowRegister(false);
						}}
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition w-full sm:w-auto text-center"
					>
						Iniciar sesión
					</button>
					<button
						onClick={() => {
							setShowRegister(true);
							setShowLogin(false);
						}}
						className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition w-full sm:w-auto text-center"
					>
						Registrarse
					</button>
				</div>

				<AnimatePresence>
					{(showLogin || showRegister) && (
						<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 bg-opacity-80 backdrop-blur-sm px-4 py-6"
						>
						<motion.div
							className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-xl relative overflow-y-auto max-h-[90vh]"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
						>
							{showLogin && <Login />}
							{showRegister && <Register />}

							<div className="mt-6 flex justify-end">
							<button
								onClick={() => {
								setShowLogin(false);
								setShowRegister(false);
								}}
								className="bg-gray-700 hover:bg-red-700 px-4 py-2 rounded text-white transition"
							>
								Cancelar
							</button>
							</div>
						</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

			</SettingSection>
		);
	}

	//informacion del usuario
	return (
		<SettingSection icon={User} title="Perfil">
			<div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 gap-6 sm:gap-8">
				{/* Datos del usuario */}
				<div className="text-center sm:text-left flex-1">
				<h3 className="text-lg font-semibold text-gray-100 break-words">
					{currentUser.name}
				</h3>
				<p className="text-gray-400 break-words">{currentUser.email}</p>
				<p className="text-sm text-gray-500 italic capitalize">
					{currentUser.role} — {currentUser.status}
				</p>
				</div>

				{/* Imagen de perfil */}
				<img
				src={currentUser.avatar || "/images/wao.jpg"}
				alt="Profile"
				className="rounded-full w-24 h-24 object-cover mx-auto sm:mx-0"
				/>
			</div>

			<div className="flex justify-center sm:justify-start mb-6">
				<button
				onClick={() => setShowEditModal(true)}
				className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded transition duration-200 w-full sm:w-auto max-w-xs sm:max-w-none"
				>
				Editar perfil
				</button>
			</div>

			<div className="mt-8 space-y-8">
				<Notifications />
				{/* <Security userId={currentUser.id} /> */}
				{/* <ConnectedAccounts /> */}
				{/* <DangerZone deleteUser={() => {}} userId={currentUser.id} /> */}
			</div>

			<AnimatePresence>
				{showEditModal && (
				<EditProfileModal
					user={currentUser}
					onClose={() => setShowEditModal(false)}
				/>
				)}
			</AnimatePresence>
		</SettingSection>

	);
};

export default Profile;
