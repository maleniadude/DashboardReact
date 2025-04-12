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
		<SettingSection icon={Bell} title={"Notificaciones"}>
			<ToggleSwitch
				label="Notificaciones Push"
				isOn={notifications.push}
				onToggle={() => handleToggle("push")}
			/>
			<ToggleSwitch
				label="Notificaciones por Email"
				isOn={notifications.email}
				onToggle={() => handleToggle("email")}
			/>
			<ToggleSwitch
				label="Notificaciones por SMS"
				isOn={notifications.sms}
				onToggle={() => handleToggle("sms")}
			/>
		</SettingSection>
	);
};

export default Notifications;
