import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Security from "../settings/Security";
import ConnectedAccounts from "../settings/ConnectedAccounts";
import DangerZone from "../settings/DangerZone";
import InfoTab from "../settings/InfoTab";
import LogoutTab from "../settings/LogoutTab";

const tabs = ["Información", "Seguridad", "Cuentas Conectadas", "Eliminar Cuenta", "Cerrar Sesión"];

const EditProfileModal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState("Información");
  const { updateUser, deleteUser } = useUser();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const tabsContainerRef = useRef(null);

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

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Cerrar al hacer clic fuera del modal
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Scroll automático al tab activo (opcional)
  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeButton = container?.querySelector(".tab-active");
    if (activeButton && container) {
      container.scrollTo({
        left: activeButton.offsetLeft - 16,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClickOutside}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 py-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-2xl h-[95vh] p-4 sm:p-6 flex flex-col"
        >
          <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Editar Perfil</h2>

          {/* Tabs Scrollables */}
          <div
            ref={tabsContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x pb-4 sm:pb-0 border-b border-gray-700 mb-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap transition font-medium snap-start ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white tab-active"
                    : "bg-gray-700 text-gray-300 hover:bg-indigo-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
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

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-auto pt-4">
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-indigo-700 px-4 py-2 rounded w-full sm:w-auto text-center"
            >
              Cancelar
            </button>

            {activeTab === "Información" && (
              <button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded w-full sm:w-auto text-center"
              >
                Guardar Cambios
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
  );
};

export default EditProfileModal;
