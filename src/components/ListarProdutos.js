import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './ListarProdutos.css';

const ListarProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [currency, setCurrency] = useState('BRL');

    const fetchProdutos = async () => {
        try {
            const response = await api.listarProdutos(currency);
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, [currency]);

    return (
        <div className="produtos-container">
            <h2>Lista de Produtos</h2>
            <div>
                <label>Moeda:</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="BRL">BRL</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Moeda</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>{currency}</td>
                            <td>
                                <Link to={`/produtos/${produto.id}`}>
                                    <button>Detalhes</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="back-to-menu">
                <Link to="/">
                    <button>Voltar ao Menu</button>
                </Link>
            </div>
        </div>
    );
};

export default ListarProdutos;