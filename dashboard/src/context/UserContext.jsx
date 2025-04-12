import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const defaultUsers = [
  {
    id: crypto.randomUUID(),
    name: "Usuario Demo",
    email: "demo@ejemplo.com",
    password: "123456",
    avatar: "", // Aquí agregamos un campo de avatar vacío
    role: "admin",
    status: "activo",
  },
];

const getLocalUsers = () => {
  const local = JSON.parse(localStorage.getItem("users"));
  if (!local || local.length === 0) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return local;
};

const getLocalCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(getLocalUsers);
  const [currentUser, setCurrentUser] = useState(getLocalCurrentUser);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const register = (name, email, password, image = "") => {
    if (users.find((u) => u.email === email)) return { error: "Email ya registrado" };
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      avatar: image,
      role: "cliente",
      status: "activo",
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { error: "Credenciales inválidas" };
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  const updateUser = (id, updatedData) => {
    const updatedUsers = users.map((user) => (user.id === id ? { ...user, ...updatedData } : user));
    setUsers(updatedUsers);
    if (currentUser?.id === id) setCurrentUser({ ...currentUser, ...updatedData });
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
  
    if (currentUser?.id === userId) {
      setCurrentUser(null);
    }
  };  

  return (
    <UserContext.Provider
      value={{ users, currentUser, register, login, logout, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
