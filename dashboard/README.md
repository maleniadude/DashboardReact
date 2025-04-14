# DashboardReact

**DashboardReact** es un proyecto académico que consiste en un panel de administración web desarrollado con **React** y **Vite**, utilizando **Tailwind CSS** para el diseño de la interfaz y **Framer Motion** para animaciones fluidas. Este dashboard permite gestionar productos, usuarios y visualizar estadísticas generadas aleatoriamente para probar la representación gráfica de datos.

## Características

- Gestión de productos y usuarios.
- Visualización de estadísticas mediante gráficos interactivos.
- Diseño responsivo y moderno gracias a Tailwind CSS.
- Animaciones suaves e interactivas con Framer Motion.
- Estructura modular y escalable para facilitar el mantenimiento y la extensión del proyecto.

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Instalación y ejecución

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/maleniadude/DashboardReact.git

2. Accede al directorio del proyecto:
    ```bash
    cd DashboardReact/dashboard

3. Instala Tailwind CSS y sus dependencias:
    ```bash
    npm install -D tailwindcss@3 postcss autoprefixer
    npx tailwindcss init -p

4. Instala las dependencias del proyecto:
    ```bash
    npm install
5. Inicia el servidor de desarrollo:
    ```bash
    npm run dev

Esto abrirá la aplicación en http://localhost:5173 o el puerto configurado por Vite.

## Estructura del proyecto
El proyecto está organizado de la siguiente manera:

DashboardReact/
├── dashboard/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore

- `components/`: Contiene los componentes reutilizables de la interfaz.
- `pages/`: Incluye las diferentes páginas del dashboard, como gestión de productos, usuarios y estadísticas.
- `App.jsx`: Componente principal que configura las rutas y la estructura general de la aplicación.
- `main.jsx`: Punto de entrada de la aplicación donde se renderiza el componente principal.

## Contribuciones
Este proyecto es de carácter académico y está abierto a mejoras y sugerencias. 