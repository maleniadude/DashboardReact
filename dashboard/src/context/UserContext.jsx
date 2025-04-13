import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const defaultUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
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
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const combined = [...savedUsers];
  
    defaultUsers.forEach((defUser) => {
      const exists = savedUsers.some((u) => u.id === defUser.id || u.email === defUser.email);
      if (!exists) combined.push(defUser);
    });
  
    setUsers(combined);
    localStorage.setItem("users", JSON.stringify(combined));
  }, []);
  

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

  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: crypto.randomUUID() };
    const updatedUsers = [...users, userWithId];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  

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
      value={{ users, currentUser, register, login, logout, updateUser, deleteUser, addUser, }}
    >
      {children}
    </UserContext.Provider>
  );
};
