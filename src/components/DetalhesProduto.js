import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import './DetalhesProduto.css';

const DetalhesProduto = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        console.log(`🔄 Buscando detalhes do produto ${id}...`);
        const fetchProduto = async () => {
            try {
                const response = await api.buscarProdutoPorId(id);
                console.log("✅ Produto recebido:", response.data);
                setProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };
        fetchProduto();
    }, [id]); // ✅ Garante que só roda quando o ID muda

    if (!produto) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="detalhes-produto-container">
            <h2>Detalhes do Produto</h2>
            <p><strong>ID:</strong> {produto.id}</p>
            <p><strong>Nome:</strong> {produto.nome}</p>
            <p><strong>Preço:</strong> {produto.preco} {produto.moeda}</p>
            <div className="back-to-menu">
                <Link to="/produtos">
                    <button>Voltar à Lista</button>
                </Link>
            </div>
        </div>
    );
};

export default DetalhesProduto;
