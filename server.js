import express from 'express';

const posts = [
    {
        id: 1,
        descricao: 'Uma foto teste',
        imagem: 'https://placecats.com/millie/300/150'
    },
    {
        id: 2,
        descricao: 'Paisagem montanhosa',
        imagem: 'https://source.unsplash.com/random/300x200/?mountain'
    },
    {
        id: 3,
        descricao: 'Cachorro brincando',
        imagem: 'https://source.unsplash.com/random/300x200/?dog'
    },
    {
        id: 4,
        descricao: 'Comida deliciosa',
        imagem: 'https://source.unsplash.com/random/300x200/?food'
    },
    {
        id: 5,
        descricao: 'Cidade à noite',
        imagem: 'https://source.unsplash.com/random/300x200/?city,night'
    },
    {
        id: 6,
        descricao: 'Pôr do sol na praia',
        imagem: 'https://source.unsplash.com/random/300x200/?sunset,beach'
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor escutando...');
});

function buscarPostPorId(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

app.get('/api', (req, res) => {
    res.status(200).send('Boas vindas à imersão!');
});

app.get('/livro', (req, res) => {
    res.status(200).send({
        "titulo": "O Senhor dos Anéis",
        "autor": "J.R.R. Tolkien",
        "ano": 1954,
        "genero": "Fantasia"
    });
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});