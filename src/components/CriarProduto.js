import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom'; // Adicione o Link aqui
import './CriarProduto.css';

const CriarProduto = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [moeda, setMoeda] = useState('BRL');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/produtos', { nome, preco, moeda });
            navigate('/produtos'); // Redireciona para a lista de produtos
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    };

    return (
        <div className="criar-produto-container">
            <h2>Criar Novo Produto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Moeda:</label>
                    <select value={moeda} onChange={(e) => setMoeda(e.target.value)}>
                        <option value="BRL">BRL</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <button type="submit">Criar</button>
            </form>
            <div className="back-to-menu">
                <Link to="/produtos">
                    <button>Voltar à Lista</button>
                </Link>
            </div>
        </div>
    );
};

export default CriarProduto;