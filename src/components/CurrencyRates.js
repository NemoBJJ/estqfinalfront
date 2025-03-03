import React, { useEffect, useState, useCallback } from 'react'; // ✅ Adicionando useCallback
import { Link } from 'react-router-dom';
import api from '../api';
import './CurrencyRates.css';

const CurrencyRates = () => {
    const [rates, setRates] = useState(null);
    const [error, setError] = useState(null);
    const [baseCurrency, setBaseCurrency] = useState('BRL');
    const [loading, setLoading] = useState(false);

    // ✅ Usando useCallback para memoizar a função fetchRates
    const fetchRates = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.getExchangeRatesFromApi(baseCurrency);
            setRates(response.data);
            setError(null);
        } catch (error) {
            setError('Erro ao buscar taxas de câmbio.');
        } finally {
            setLoading(false);
        }
    }, [baseCurrency]); // ✅ Adicionando baseCurrency como dependência

    useEffect(() => {
        fetchRates();
    }, [fetchRates]); // ✅ Adicionando fetchRates ao array de dependências

    return (
        <div className="currency-rates-container">
            <h2>Taxas de Câmbio</h2>
            <div>
                <label>Moeda Base:</label>
                <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                    <option value="BRL">BRL</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <button onClick={fetchRates} disabled={loading}>
                    {loading ? 'Carregando...' : 'Recarregar'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <div className="loading-spinner">Carregando...</div>
            ) : rates ? (
                <pre>{JSON.stringify(rates, null, 2)}</pre>
            ) : (
                <p>Nenhuma taxa de câmbio disponível.</p>
            )}
            <div className="back-to-menu">
                <Link to="/">
                    <button>Voltar ao Menu</button>
                </Link>
            </div>
        </div>
    );
};

export default CurrencyRates;