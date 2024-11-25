import cors from 'cors';
import express from 'express'; // Importa o framework Express para criar a aplicação web
import multer  from 'multer'; // Importa o módulo Multer para lidar com uploads de arquivos
import { criarNovoPost, listarPosts, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js'; // Importa as funções controladoras para manipular os posts

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos utilizando o multer.diskStorage
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
    cb(null, 'uploads/');
    },
  // Define o nome do arquivo no destino
    filename: function (req, file, cb) {
    cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));

  // Rota para obter todos os posts (método GET)
    app.get('/posts', listarPosts);

  // Rota para criar um novo post (método POST)
    app.post('/posts', criarNovoPost)

  // Rota para fazer upload de imagem (método POST)
    app.post('/upload', upload.single('imagem'), uploadImagem);

  // Rota para fazer atualizar imagem (método PUT)
    app.put('/upload/:id', atualizarNovoPost);
};

export default routes;