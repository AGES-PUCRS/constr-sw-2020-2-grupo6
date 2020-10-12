# Configuração
1. Criar um arquivo `.env` na raíz do projeto.
2. Adicionar as variáveis de conexão para o host e conexão com o banco de dados.

Atenção:  
  - Os valores são diferentes para rodar local e em produção na AWS.  
  - Após o deploy, basta alterar esses valores.
  - Para acesso local, basta copiar e colar o conteúdo abaixo no arquivo `.env`  
  

Local: 
```
MONGO_URL="mongodb://127.0.0.1:27017/turma"
HOST="0.0.0.0" 

```

Production: 
```
MONGO_URL=MONGO_PRODUCTION
HOST=HOST_RODUCTION

```


# Running

```
npm install
npm start
```
