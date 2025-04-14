import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

const Notifications = () => {
	const { currentUser, updateUser } = useUser();

	const [notifications, setNotifications] = useState({
		push: false,
		email: false,
		sms: false,
	});

	useEffect(() => {
		if (currentUser?.notifications) {
			setNotifications(currentUser.notifications);
		}
	}, [currentUser]);

	const handleToggle = async (type) => {
		const updated = { ...notifications, [type]: !notifications[type] };
		setNotifications(updated);

		// Actualizamos el usuario en el contexto
		try {
			await updateUser(currentUser.id, { notifications: updated });

			toast.success("✅ Preferencias de notificación actualizadas.");
		} catch (error) {
			// En caso de error
			toast.error("❌ Error al actualizar las preferencias.");
		}
	};

	return (
		<SettingSection icon={Bell} title={""}>
			<ToggleSwitch
				label="Notificaciones Push"
				description="Recibe alertas instantáneas directamente en la app."
				isOn={notifications.push}
				onToggle={() => handleToggle("push")}
			/>
			<ToggleSwitch
				label="Notificaciones por Email"
				description="Te enviaremos un correo para actualizaciones importantes."
				isOn={notifications.email}
				onToggle={() => handleToggle("email")}
			/>
			<ToggleSwitch
				label="Notificaciones por SMS"
				description="Recibe alertas urgentes por mensaje de texto."
				isOn={notifications.sms}
				onToggle={() => handleToggle("sms")}
			/>

		</SettingSection>
	);
};

export default Notifications;

//notificaciones con toast para asi probar como funciona el mostrar notificaciones en pantalla