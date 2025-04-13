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

	// Cierra el modal si el usuario inicia sesión
	useEffect(() => {
		if (currentUser) {
			setShowLogin(false);
			setShowRegister(false);
		}
	}, [currentUser]);

	if (!currentUser) {
		return (
			<SettingSection icon={User} title={"Profile"}>
				<p className="text-gray-400 mb-4">No hay sesión activa.</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<button
						onClick={() => {
							setShowLogin(true);
							setShowRegister(false);
						}}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
						Iniciar sesión
					</button>
					<button
						onClick={() => {
							setShowRegister(true);
							setShowLogin(false);
						}}
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
						Registrarse
					</button>
				</div>

				<AnimatePresence>
					{(showLogin || showRegister) && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 z-50 flex items-center justify-center
							bg-gray-950 bg-opacity-80 backdrop-blur-sm'>
							<motion.div
								className='bg-gray-900 text-white rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-xl space-y-4'
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}>
								<div className="relative z-10 max-w-md w-full">
									{showLogin && <Login />}
									{showRegister && <Register />}
									<button
										onClick={() => {
											setShowLogin(false);
											setShowRegister(false);
										}}
										className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700 text-sm">
										X
									</button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

			</SettingSection>
		);
	}

	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
				{/* Mostrar la imagen de perfil */}
				<img
					src={currentUser.avatar || "/images/wao.jpg"}  // Si no hay imagen, usar una por defecto
					alt="Profile"
					className="rounded-full w-20 h-20 object-cover"
				/>

				<div className="text-center sm:text-left">
					<h3 className="text-lg font-semibold text-gray-100">
						{currentUser.name}
					</h3>
					<p className="text-gray-400">{currentUser.email}</p>
					<p className="text-sm text-gray-500 italic">
						{currentUser.role} — {currentUser.status}
					</p>
				</div>
			</div>

			<button
				onClick={() => setShowEditModal(true)}
				className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
				Edit Profile
			</button>

			<div className="mt-8 space-y-8">
				<Notifications />
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
