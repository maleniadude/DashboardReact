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
    <div className="flex flex-col items-center">
      <p className="text-gray-400 mb-4">¿Seguro que quieres cerrar sesión?</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default LogoutTab;
