# Simples-Api-Java-script



Esta é uma API simples em JavaScript usando Express para integração com o Mercado Pago. A API permite criar pagamentos e consultar o status de pagamentos.

## Configuração do Projeto

### Pré-requisitos

- Node.js e npm instalados
- Conta no Mercado Pago e um token de acesso

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/minha-api-mercado-pago.git
    cd minha-api-mercado-pago
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o token de acesso do Mercado Pago no arquivo `index.js`:

    ```javascript
    const TOKEN_MERCADOPAGO = "SEU-ID-DO-MERCADO-PAGO";  // Substitua pelo seu token do Mercado Pago
    ```

### Executando a API

Para iniciar a API, execute:

```bash
node index.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

### Criar Pagamento

**URL**: `/`

**Método**: `GET`

**Parâmetros de Consulta**:
- `valor`: Valor da transação
- `descricao`: Descrição da transação
- `destinatario`: Email do destinatário

**Exemplo de Requisição**:

```
GET http://localhost:3000/?valor=100.00&descricao=Compra&destinatario=exemplo@email.com
```

**Resposta de Sucesso**:

```json
{
    "mensagem": "Pagamento criado com sucesso",
    "id_mercado_pago": "123456789",
    "qr_code_base64": "data:image/png;base64,....",
    "qr_code_text": "000201010212...."
}
```

### Consultar Status do Pagamento

**URL**: `/status`

**Método**: `GET`

**Parâmetros de Consulta**:
- `codigo`: ID do pagamento no Mercado Pago

**Exemplo de Requisição**:

```
GET http://localhost:3000/status?codigo=123456789
```

**Resposta de Sucesso**:

```json
{
    "status_pagamento": "approved"
}
```

**Resposta de Erro**:

```json
{
    "erro": "Campo obrigatório ausente"
}
```

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato

Para mais informações, entre em contato com [seu-email@email.com](mailto:seu-email@email.com).
```

### Notas

- Substitua `"SEU-ID-DO-MERCADO-PAGO"` pelo seu token real do Mercado Pago no arquivo `index.js`.
- Atualize o link do repositório e as informações de contato conforme necessário.
