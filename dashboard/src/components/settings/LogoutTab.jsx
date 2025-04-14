import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const LogoutTab = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Esto cerrará la sesión
    navigate("/settings");
  };

  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 p-4">
      <p className="text-gray-400 mb-4">
        ¿Seguro que quieres cerrar sesión? 
        <span className="block text-sm text-gray-500">Tu sesión actual se cerrará inmediatamente.</span>
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition duration-200 w-full sm:w-auto text-center"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default LogoutTab;
