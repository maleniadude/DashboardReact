import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";

const InfoTab = ({ form, setForm, handleImageChange }) => {
  return (
    <SettingSection icon={Lock} title="Información">
      {/* Imagen de perfil */}
        <div className="flex flex-col items-center mb-4">
            {form.avatar && (
            <img
                src={form.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mb-2"
            />
            )}
            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-300"
            />
        </div>

        <div className="space-y-3 w-full">
            <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nombre"
            className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    </SettingSection>
  );
};

export default InfoTab;

