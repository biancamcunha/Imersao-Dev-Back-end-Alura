import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js'; // Importa a função para conectar ao banco de dados

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instalike'
    const db = conexao.db('imersao-instalike');

    // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');

    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    // Seleciona o banco de dados 'imersao-instalike'
    const db = conexao.db('imersao-instalike');

    // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');

    // Insere novo post no banco de dados
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados 'imersao-instalike'
    const db = conexao.db('imersao-instalike');

    // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');

    // Cria objeto ObjectId a partir do id recebido
    const objId = ObjectId.createFromHexString(id);

    // Atualiza post no banco de dados
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: novoPost});
}
