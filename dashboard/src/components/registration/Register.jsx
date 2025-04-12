import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function Register() {
  const { register } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register(form.name, form.email, form.password, form.image); // 👈 pasamos imagen
    if (res.error) setError(res.error);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-60 backdrop-blur-lg shadow-xl rounded-2xl px-6 py-8 border border-gray-700 w-full max-w-md mx-auto mt-12 sm:mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Crear cuenta</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Campo para imagen */}
        <div className="text-sm text-gray-300">
          <label className="block mb-1">Imagen de perfil (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-gray-400"
          />
        </div>

        {/* Vista previa de la imagen */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-20 h-20 object-cover rounded-full mx-auto border border-gray-600 mt-2"
          />
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 rounded-lg transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </motion.div>
  );
}
