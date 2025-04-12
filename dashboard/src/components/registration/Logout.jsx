import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div className="text-center text-white mt-20">
      <p>Cerrando sesión...</p>
    </div>
  );
}
