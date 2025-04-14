import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/UserContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx'
import StatProvider from "./context/StatContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    <StatProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </StatProvider>
		</UserProvider>
    </BrowserRouter>
  </StrictMode>,
  // BrowserRouter(rutas), UserProvider(proveedor del contexto de usuarios)
  // StatProvider(proveedor de las stadisticas aleatorias para probar la visualizacion)
  // ProductProvider(proveedor del contexto de los productos, para cargar desde localstorage)
)
