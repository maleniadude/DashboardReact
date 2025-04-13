import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

const Security = ({ userId }) => {
	const { updateUser } = useUser();
	const [twoFactor, setTwoFactor] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChangePassword = () => {
		setError("");
		setSuccess("");

		if (!newPassword || !confirmPassword) {
			setError("Por favor completa todos los campos.");
			return;
		}

		if (newPassword.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres.");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("Las contraseñas no coinciden.");
			return;
		}

		if (userId) {
			updateUser(userId, { password: newPassword });
			setSuccess("✅ Contraseña actualizada correctamente.");
			setNewPassword("");
			setConfirmPassword("");
		} else {
			setError("Usuario no válido.");
		}
	};

	return (
		<SettingSection icon={Lock} title="Seguridad">
			<ToggleSwitch
				label="Autenticación en dos pasos"
				isOn={twoFactor}
				onToggle={() => setTwoFactor(!twoFactor)}
			/>

			<div className="mt-6 space-y-3">
				<input
					type="password"
					placeholder="Nueva contraseña"
					className="w-full p-2 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirmar contraseña"
					className="w-full p-2 bg-gray-700 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				{error && <p className="text-red-500 text-sm">{error}</p>}
				{success && <p className="text-green-500 text-sm">{success}</p>}

				<button
					onClick={handleChangePassword}
					className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
				>
					Cambiar contraseña
				</button>
			</div>
		</SettingSection>
	);
};

export default Security;
