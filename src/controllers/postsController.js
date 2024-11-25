import fs from 'fs'; // Importa o módulo fs para realizar operações no sistema de arquivos
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js"; // Importa as funções para obter e criar posts do modelo de dados
import gerarDescricaoComGemini from '../services/geminiService.js';

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Obtém todos os posts da base de dados usando a função getTodosPosts
    const posts = await getTodosPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function criarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body;
    try {
        // Chama a função criarPost para inserir o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia o post criado como resposta JSON com status 200 (OK)
        res.status(201).json(postCriado);
    } catch (erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma mensagem de erro como resposta JSON com status 500 (Internal Server Error)
        res.status(500).json({ 'Erro': 'Falha na requisição.' });
    }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post com a descrição, URL da imagem e texto alternativo
    const novoPost = {
        descricao: '',
        imgUrl: req.file.originalname,
        alt: ''
    };

    try {
        // Chama a função criarPost para inserir o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Constrói o novo nome do arquivo com o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia o post criado como resposta JSON com status 200 (OK)
        res.status(201).json(postCriado);
    } catch (erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma mensagem de erro como resposta JSON com status 500 (Internal Server Error)
        res.status(500).json({ 'Erro': 'Falha na requisição.' });
    }
}

// Função assíncrona para atualizar um novo post
export async function atualizarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };
        // Chama a função criarPost para inserir o novo post no banco de dados
        const postCriado = await atualizarPost(id, postAtualizado);
        // Envia o post criado como resposta JSON com status 200 (OK)
        res.status(201).json(postCriado);
    } catch (erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma mensagem de erro como resposta JSON com status 500 (Internal Server Error)
        res.status(500).json({ 'Erro': 'Falha na requisição.' });
    }
}