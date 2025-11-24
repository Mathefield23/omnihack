import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { Cadastro } from './pages/Cadastro.tsx';
import { Empresa } from './pages/Empresa.tsx';
import { Desenvolvedor } from './pages/Desenvolvedor.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/empresa/:id" element={<Empresa />} />
        <Route path="/desenvolvedor/:id" element={<Desenvolvedor />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
