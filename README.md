# api
Repositório criado para desenvolvimento da API para Aplicação Cleanup para a disciplina de Projeto Integrado 2 do curso de SMD - UFC

Essa api faz integração com o Whatsapp e com a IA llama da meta. São utilizadas para dar suporte ao usuário no cadastro.


Instruções de inicialização

Execute o comando npm i -> para baixar as dependências;

Caso não queira usar a IA e o Bot do whatsapp, basta comentar o código a partir da linha 32 no App.js;

É nessária a instalação da IA ollama caso queira usar a IA -> https://ollama.com/download/windows
Abrir o terminal e rodar o seguinte comando -> ollama run llama3

O qrcode gerado no terminal na sua primeira execução deve ser lido no seu whatsapp nas configurações para conectar um novo dispositivo (que nem no whatsapp web). Use uma conta especifica whatsapp para isso e não a sua pessoal.

Lebre-se de modificar seu usuário do banco no arquivo ConnectionDB.js e configurar o arquivo .env com Usuário e senha autenticadores das rotas. A collection do postman com todas as rotas se encontra na pasta postman.

