import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";

const InfoTab = ({ form, setForm, handleImageChange }) => {
  return (
    <SettingSection icon={Lock} title="Información">
      {/* Imagen de perfil */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
        <div className="relative group">
          {form.avatar && (
            <img
              src={form.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-600 group-hover:opacity-80 transition duration-200"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <span className="text-xs text-gray-400 mt-2 text-center block">
            Cambiar avatar
          </span>
        </div>

        {/* Campos de texto */}
        <div className="flex-1 space-y-4 w-full">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nombre"
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </SettingSection>
  );
};

export default InfoTab;
