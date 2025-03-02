import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Sistema de Estoque</h1>
            <div className="menu-grid">
                <Link to="/produtos" className="menu-item">
                    <div className="menu-icon">📦</div>
                    <span>Produtos</span>
                </Link>
                <Link to="/vendas" className="menu-item">
                    <div className="menu-icon">💰</div>
                    <span>Vendas</span>
                </Link>
                <Link to="/currency-rates" className="menu-item">
                    <div className="menu-icon">💱</div>
                    <span>Taxas de Câmbio</span>
                </Link>
            </div>
        </div>
    );
};

export default Menu;