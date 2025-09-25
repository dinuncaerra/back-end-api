import pkg from "pg";
import dotenv from "dotenv";
import express from "express";      // Requisição do pacote do express
const { Pool } = pkg; // Obtém o construtor Pool do pacote pg para gerenciar conexões com o banco de dados PostgreSQL
const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta
dotenv.config();         // Carrega e processa o arquivo .env
let pool = null; // Variável para armazenar o pool de conexões com o banco de dados

// Função para obter uma conexão com o banco de dados
function conectarBD() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  return pool;
}

app.get("/questoes", async (req, res) => {

const db = conectarBD(); // Cria uma nova instância do Pool para gerenciar conexões com o banco de dados
	console.log("Rota GET /questoes solicitada"); // Log no terminal para indicar que a rota foi acessada
	
//server.js
try {
    const resultado = await db.query("SELECT * from questoes"); // Executa uma consulta SQL para selecionar todas as questões
    const data = resultado.rows; // Obtém as linhas retornadas pela consulta
    res.json(data); // Retorna o resultado da consulta como JSON
  } catch (e) {
    console.error("Erro ao buscar questões:", e); // Log do erro no servidor
    res.status(500).json({
      erro: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});
app.get("/", async (req, res) => {        // Cria endpoint na rota da raiz do projeto

  const db = conectarBD(); // Cria uma nova instância do Pool para gerenciar conexões com o banco de dados

let dbStatus = "ok";
try {
  await db.query("SELECT 1");
} catch (e) {
  dbStatus = e.message;
}
console.log("Rota GET / solicitada");
  res.json({
		message: "API para a atividade",      // Substitua pelo conteúdo da sua API
    author: "Giovanne de santana pereira",    // Substitua pelo seu nome
    statusBD: dbStatus
  });
});

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço rodando na porta:  ${port}`);
});