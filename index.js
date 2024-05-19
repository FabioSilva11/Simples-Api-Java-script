import express from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const app = express();
const port = process.env.PORT || 3000;

// Token de acesso do Mercado Pago
const TOKEN_MERCADOPAGO = 'SEU-ID-DO-MERCADO-PAGO';  // Substitua pelo seu token do Mercado Pago

// Inicialize o cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: TOKEN_MERCADOPAGO,
  options: { timeout: 5000 }  // Exemplo de configuração de timeout
});

// Inicialize o objeto de pagamento
const payment = new Payment(client);

// Função para obter o status de um pagamento no Mercado Pago
async function getPaymentStatus(payment_id) {
  try {
    const result = await payment.get(payment_id);
    return result.response.status;
  } catch (error) {
    console.error('Erro ao obter o status do pagamento:', error);
    throw error;
  }
}

// Rota para criar um pagamento
app.get('/', async (req, res) => {
  try {
    const { valor, descricao, destinatario } = req.query;

    // Prepara os dados JSON para a solicitação de pagamento
    const body = {
      transaction_amount: parseFloat(valor),
      description: descricao,
      payment_method_id: 'pix',
      payer: {
        email: destinatario,
        first_name: destinatario  // Substitua pelo nome do pagador
      }
    };

    // Cria o pagamento usando o SDK do Mercado Pago
    const result = await payment.create({ body });

    // Processa a resposta do Mercado Pago
    if (result.response.status === 'approved') {
      const id_mercado_pago = result.response.id;
      const qr_code_base64 = result.response.point_of_interaction.transaction_data.qr_code_base64;
      const qr_code_text = result.response.point_of_interaction.transaction_data.qr_code;

      // Constrói a resposta JSON
      const resposta_json = {
        mensagem: 'Pagamento criado com sucesso',
        id_mercado_pago,
        qr_code_base64,
        qr_code_text
      };

      res.json(resposta_json);
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter o status de um pagamento
app.get('/status', async (req, res) => {
  try {
    const { codigo } = req.query;

    // Verificar se o campo 'codigo' está presente
    if (!codigo) {
      return res.status(400).json({ erro: 'Campo obrigatório ausente' });
    }

    // Obter o status do pagamento usando a função getPaymentStatus
    const status = await getPaymentStatus(codigo);

    if (status) {
      // Construir a resposta com base no status do pagamento
      const status_pagamento = {
        status_pagamento: status
      };

      res.json(status_pagamento);
    } else {
      res.status(404).json({ erro: 'Erro ao obter informações do pagamento' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API ouvindo em http://localhost:${port}`);
});
