import conectarAoBanco from '../config/dbConfig.js'; // Importa a função para conectar ao banco de dados

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export default async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instalike'
    const db = conexao.db('imersao-instalike');

    // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');

    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}
