import { useState } from "react"; 
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Security from "../settings/Security";
import ConnectedAccounts from "../settings/ConnectedAccounts";
import DangerZone from "../settings/DangerZone";
import SettingSection from "../settings/SettingSection";
import { Lock } from "lucide-react";
import InfoTab from "../settings/InfoTab";
import LogoutTab from "../settings/LogoutTab";


const tabs = ["Información", "Seguridad", "Cuentas Conectadas", "Eliminar Cuenta", "Cerrar Sesión"];  

const EditProfileModal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState("Información");
  const { updateUser, deleteUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
  });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    const updated = { name: form.name, email: form.email, avatar: form.avatar };
    updateUser(user.id, updated);
    onClose();
  };  

  const handleAccountDeletion = () => {
    deleteUser(user.id);
    onClose();
    setTimeout(() => navigate("/settings"), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
    >
      <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded ${
                activeTab === tab ? "bg-indigo-600" : "bg-gray-700"
              } hover:bg-indigo-500 transition`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4 max-h-[40vh] overflow-y-auto">
          {activeTab === "Información" && (
            <InfoTab form={form} setForm={setForm} handleImageChange={handleImageChange} />
          )}

          {activeTab === "Seguridad" && <Security userId={user.id} />}
          {activeTab === "Cuentas Conectadas" && <ConnectedAccounts />}
          {activeTab === "Cerrar Sesión" && <LogoutTab />}
          {activeTab === "Eliminar Cuenta" && (
            <DangerZone deleteUser={handleAccountDeletion} userId={user.id} />
          )}
        </div>

        {/* Acciones */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-indigo-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>

          {activeTab === "Información" && (
            <button
              onClick={handleSave}
              className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EditProfileModal;
