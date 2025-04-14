import { Lock, Eye, EyeOff } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const getPasswordStrength = (password) => {
	if (!password) return "";
	const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const medium = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

	if (strong.test(password)) return "fuerte";
	if (medium.test(password)) return "media";
	return "débil";
};

const strengthColor = {
	fuerte: "text-green-400",
	media: "text-yellow-400",
	débil: "text-red-400",
};

const Security = ({ userId }) => {
	const { updateUser } = useUser();
	const [twoFactor, setTwoFactor] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const passwordStrength = getPasswordStrength(newPassword);

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

	useEffect(() => {
		if (success || error) {
			const timer = setTimeout(() => {
				setSuccess("");
				setError("");
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [success, error]);

	const renderPasswordInput = (label, value, setValue) => (
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				placeholder={label}
				className="w-full p-2 pr-10 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button
				type="button"
				className="absolute top-2.5 right-2 text-gray-400 hover:text-gray-200"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</div>
	);

	return (
		<SettingSection icon={Lock} title="Seguridad">
			<div className="space-y-6">
				<ToggleSwitch
					label="Autenticación en dos pasos"
					isOn={twoFactor}
					onToggle={() => setTwoFactor(!twoFactor)}
				/>

				<div className="grid gap-3">
					{renderPasswordInput("Nueva contraseña", newPassword, setNewPassword)}
					{newPassword && (
						<p className={`text-sm ${strengthColor[passwordStrength]}`}>
							Fuerza: {passwordStrength}
						</p>
					)}

					{renderPasswordInput("Confirmar contraseña", confirmPassword, setConfirmPassword)}

					{error && <p className="text-red-400 text-sm text-center">{error}</p>}
					{success && <p className="text-green-400 text-sm text-center">{success}</p>}

					<button
						onClick={handleChangePassword}
						className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
					>
						Cambiar contraseña
					</button>
				</div>
			</div>
		</SettingSection>
	);
};

export default Security;
