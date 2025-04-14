import Header from "../components/common/Header";
import Profile from "../components/settings/Profile";


const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-950">
      <Header title="Settings" />

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
        <Profile />
      </main>
    </div>
  );
};

export default SettingsPage;

// profile(dentro de este componente vamos a cargar notifications, infotab, security, dangerzone, logout.
// si no se tiene cuenta abierta saldran los botones de inicio de sesion y registrarse)
