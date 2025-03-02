import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Vendas.css';

const Vendas = () => {
    const [vendas, setVendas] = useState([]);
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resultado, setResultado] = useState(null); // ✅ Armazena o resultado atual (frete ou pagamento)
    const [modalAberto, setModalAberto] = useState(false); // ✅ Controla a abertura do modal

    // Busca as vendas sincronizadas ao carregar o componente
    useEffect(() => {
        console.log("🔄 Buscando vendas...");
        const fetchVendas = async () => {
            setLoading(true);
            try {
                const response = await api.sincronizarProdutos();
                console.log("✅ Vendas recebidas:", response.data);
                setVendas(response.data);
            } catch (error) {
                setError('Erro ao buscar vendas.');
                console.error('Erro ao buscar vendas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVendas();
    }, []);

    // Handler para calcular o frete
    const handleCalcularFrete = useCallback(async (id) => {
        if (!cep) {
            setError('Por favor, insira um CEP válido.');
            return;
        }

        if (loading) return;

        setLoading(true);
        setError(null);
        try {
            const response = await api.calcularFrete(Number(id), cep);
            console.log("📦 Resposta do frete:", response.data);
            setResultado({ tipo: 'frete', ...response.data }); // ✅ Armazena o resultado do frete
            setModalAberto(true); // ✅ Abre o modal
        } catch (error) {
            setError('Erro ao calcular frete.');
            console.error('Erro ao calcular frete:', error);
        } finally {
            setLoading(false);
        }
    }, [cep, loading]);

    // Handler para simular o pagamento
    const handleSimularPagamento = useCallback(async (id) => {
        if (loading) return;

        setLoading(true);
        setError(null);
        try {
            const response = await api.simularPagamento(Number(id));
            console.log("💰 Resposta do pagamento:", response.data);
            setResultado({ tipo: 'pagamento', ...response.data }); // ✅ Armazena o resultado do pagamento
            setModalAberto(true); // ✅ Abre o modal
        } catch (error) {
            setError('Erro ao simular pagamento.');
            console.error('Erro ao simular pagamento:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    // Fechar o modal
    const fecharModal = () => {
        setModalAberto(false);
        setResultado(null); // Limpa o resultado ao fechar o modal
    };

    return (
        <div className="vendas-container">
            <h2>Vendas Sincronizadas</h2>

            {error && <p className="error-message">{error}</p>}

            <div>
                <label>CEP:</label>
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="Digite o CEP"
                />
            </div>

            {loading ? (
                <div className="loading-spinner">Carregando...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map((venda, index) => (
                            <tr key={index}>
                                <td>{venda.produto}</td>
                                <td>{venda.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleCalcularFrete(venda.id)}
                                        disabled={loading}
                                    >
                                        Calcular Frete
                                    </button>
                                    <button
                                        onClick={() => handleSimularPagamento(venda.id)}
                                        disabled={loading}
                                    >
                                        Simular Pagamento
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal para exibir resultados */}
            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{resultado.tipo === 'frete' ? 'Frete Calculado' : 'Pagamento Simulado'}</h3>
                        <pre>{JSON.stringify(resultado, null, 2)}</pre>
                        <button onClick={fecharModal}>Fechar</button>
                    </div>
                </div>
            )}

            <div className="back-to-menu">
                <Link to="/">
                    <button>Voltar ao Menu</button>
                </Link>
            </div>
        </div>
    );
};

export default Vendas;