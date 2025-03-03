import axios from 'axios';

// Configuração do axios para a API de estoque
const api = axios.create({
    baseURL: 'https://apistq.neemindev.com/api', // URL base da sua API
});

// Exportando o objeto com um nome
const apiEndpoints = {
    // Produtos
    listarProdutos: (currency) => api.get('/produtos', { params: { currency } }),
    criarProduto: (produto) => api.post('/produtos', produto),
    buscarProdutoPorId: (id) => api.get(`/produtos/${id}`),
    deletarProduto: (id) => api.delete(`/produtos/${id}`),
    atualizarProduto: (id, produtoAtualizado) => api.put(`/produtos/${id}`, produtoAtualizado),

    // Vendas
    sincronizarProdutos: async () => {
        console.log("🔄 Buscando vendas...");
        const response = await api.get('/vendas/sincronizar');
        console.log("✅ Vendas recebidas:", response.data);
        return response;
    },
    
    calcularFrete: (id, cep) => {
        if (!id) {
            console.error("❌ Erro: ID do produto está indefinido.");
            return Promise.reject(new Error("ID do produto é obrigatório."));
        }
        console.log(`🚚 Calculando frete para ID: ${id}, CEP: ${cep}`);
        return api.get(`/vendas/calcular-frete/${id}`, { params: { cep } });
    },

    simularPagamento: (id) => {
        if (!id) {
            console.error("❌ Erro: ID do produto está indefinido.");
            return Promise.reject(new Error("ID do produto é obrigatório."));
        }
        console.log(`💳 Simulando pagamento para ID: ${id}`);
        return api.get(`/vendas/simular-pagamento/${id}`);
    },

    // Currency (Moeda)
    getExchangeRatesFromApi: () => api.get('/currency-rates/external'),
    getLatestRatesFromDatabase: () => api.get('/currency-rates/latest'),
};

export default apiEndpoints; // ✅ Exportando o objeto com um nome