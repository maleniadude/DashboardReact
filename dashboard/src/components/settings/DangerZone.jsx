import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const DangerZone = ({ deleteUser, userId }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const navigate = useNavigate();


	const handleDeleteAccount = async () => {
		try {
		  deleteUser(userId);
		  toast.success("✅ Cuenta eliminada con éxito.");
		  setTimeout(() => navigate("/"), 1500);
		} catch (error) {
		  toast.error("❌ Error al eliminar la cuenta.");
		}
	};
	  

	return (
		<motion.div
			className="bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className="flex items-center mb-4">
				<Trash2 className="text-red-400 mr-3" size={24} />
				<h2 className="text-xl font-semibold text-gray-100">Danger Zone</h2>
			</div>
			<p className="text-gray-300 mb-4">
				Permanently delete your account and all of your content.
			</p>

			{!showConfirmation ? (
				<button
					onClick={() => setShowConfirmation(true)}
					className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
				>
					Delete Account
				</button>
			) : (
				<div className="mt-4 flex flex-col items-center">
					<p className="text-red-400 mb-2 text-center">
						Are you sure you want to delete your account? This action is irreversible.
					</p>
					<div className="flex gap-4">
						<button
							onClick={handleDeleteAccount}
							className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-200"
						>
							Yes, Delete Account
						</button>
						<button
							onClick={() => setShowConfirmation(false)}
							className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default DangerZone;