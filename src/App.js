import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ListarProdutos from './components/ListarProdutos';
import CriarProduto from './components/CriarProduto';
import DetalhesProduto from './components/DetalhesProduto';
import Vendas from './components/Vendas';
import CurrencyRates from './components/CurrencyRates';

function App() {
    return (
        <Router>
            <Routes key={window.location.pathname}>  {/* 🔥 Corrigido para evitar re-renderizações ao navegar */}
                <Route path="/" element={<Menu />} />
                <Route path="/produtos" element={<ListarProdutos />} />
                <Route path="/produtos/novo" element={<CriarProduto />} />
                <Route path="/produtos/:id" element={<DetalhesProduto />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/currency-rates" element={<CurrencyRates />} />
            </Routes>
        </Router>
    );
}

export default App;
