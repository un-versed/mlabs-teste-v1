# mLabs processo seletivo Node.js

# Problema proposto

Criar uma API de controle de estacionamento (conforme contratos abaixo):

  - Deve registrar entrada, saída e pagamento
  - Não deve liberar saída sem pagamento
  - Deve fornecer um histórico por placa

Essa API deve respeitar os status http corretamente, deve aceitar requisições e responder json.

## Ações que devem ser disponíveis

### Entrada

```
POST /parking

{ plate: 'FAA-1234' }
```

Deve retornar um número de "reserva" e validar a máscara AAA-9999

### Saída

```
PUT /parking/:id/out
```

### Pagamento

```
PUT /parking/:id/pay
```

### Histórico

```
GET /parking/:plate
[
  { id: 42, time: '25 minutes', paid: true, left: false }
]
```

# Solução implementada

A API foi escrita em Node.js, como requisitado, utilizando MongoDB e Express (com alguns outros pacotes de apoio que podem ser encontrados em ```package.json```).

A estrutura do projeto se baseia no padrão MVC (Model-View-Controller), utilizando apenas os conceitos de modelo e controlador, pois nesse caso, não foi necessário configurar uma engine para processar as views no lado do servidor.

### Estrutura de pastas
    .
    ├── config                  # Arquivos de configuração do projeto
    ├── controllers             # Controladores
    |   └── Http                # Controladores HTTP (separação necessária por conta de possíveis integrações com websockets, que possuem seus próprios controladores)
    ├── docs                    # Arquivos de documentação
    ├── exceptions              # Classes de tratamento de erros customizadas para a API
    ├── middlewares             # Middlewares comuns para as rotas
    ├── models                  # Modelos do banco de dados
    ├── public                  # Pasta para futuros arquivos públicos
    ├── routes 
    |   └── api                 # Rotas do endpoint /api
    └── services                # Serviços externos configurados na API
    |   └── Validator           # Serviço de validação das requisições
    |       └── attr            # Extensão de validações customizadas para API
    └──...

# Variáveis de ambiente
No projeto, existe um pacote chamado ```dotenv-safe```, ele permite gerenciar variáveis de ambiente durante o desenvolvimento.

Para configurar as variáveis, é necessário apenas criar um arquivo chamado ```.env``` na raiz do projeto, e seguir os exemplos que estão listados no arquivo ```.env.example```.

# Documentação

A documentação está anexa dentro do próprio projeto, e pode ser acessada usando o [Postman](https://www.postman.com/).

Para realizar a importação, é necessário apenas clicar nessa opção:
![Imgur](https://i.imgur.com/OPNqxnV.jpg)

# Como executar o projeto

Para instalar as depedências, você precisa executar: ```yarn install``` ou ```npm install```

Caso esteja num ambiente que não utilize Docker, e também exista uma instalção prévia do MongoDB rodando na porta ```27017``` só é necessário executar o comando ```yarn dev```, assim, o projeto já estará rodando na porta default (```3000```).

Caso já exista uma instalação do Docker na máquina, é necessário apenas rodar o comando ```yarn run mongo:start```.

Esse comando criariá um container Docker com a configuração MongoDB necessária.

Após o uso, o comando: ```yarn run mongo:stop```, finaliza a execução do container.

### Notas

- Foi utilizado o padrão de `/api/parkings` ao invés de `/api/parking` para atender a conveção de utilizar nomes pluralizados para sinalizar os resources. (https://nordicapis.com/10-best-practices-for-naming-api-endpoints/)
