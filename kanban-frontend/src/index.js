// Importa o React
import React from 'react';

// Importa o ReactDOM para renderizar a aplicação na página HTML
import ReactDOM from 'react-dom/client';

// Importa o arquivo de estilos globais
import './styles/index.css';

// Importa o componente App principal
import App from './App';

// Cria a raiz da aplicação React, apontando para o elemento com id 'root' no HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
