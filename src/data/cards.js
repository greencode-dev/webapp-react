const movies = [
    {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi',
        release_year: 2010,
        average_vote: 4.8,
        actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        abstract:
            "Un ladro che ruba segreti aziendali attraverso l'uso della tecnologia di condivisione dei sogni riceve l'incarico inverso di piantare un'idea nella mente di un CEO.",
        image: '/movies_cover/inception.jpg',
        reviews: [
            {
                id: 1,
                author: 'Marco Rossi',
                rating: 5,
                text: 'Capolavoro assoluto, trama complessa e avvincente.',
            },
            {
                id: 2,
                author: 'Sofia Bianchi',
                rating: 4,
                text: 'Visivamente incredibile, richiede molta attenzione.',
            },
        ],
    },
    {
        id: 2,
        title: 'Interstellar',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi',
        release_year: 2014,
        average_vote: 4.9,
        actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        abstract:
            "Un team di esploratori viaggia attraverso un wormhole nello spazio nel tentativo di garantire la sopravvivenza dell'umanità.",
        image: '/movies_cover/interstellar.jpg',
        reviews: [
            {
                id: 3,
                author: 'Luca Verdi',
                rating: 5,
                text: 'Emozionante e scientificamente affascinante.',
            },
            {
                id: 4,
                author: 'Elena Neri',
                rating: 5,
                text: 'La colonna sonora di Hans Zimmer è da brividi.',
            },
        ],
    },
    {
        id: 3,
        title: 'Matrix',
        director: 'Lana e Lilly Wachowski',
        genre: 'Action/Sci-Fi',
        release_year: 1999,
        average_vote: 4.7,
        actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
        abstract:
            'Un hacker scopre da misteriosi ribelli la vera natura della sua realtà e il suo ruolo nella guerra contro i suoi controllori.',
        image: '/movies_cover/matrix.jpg',
        reviews: [
            {
                id: 5,
                author: 'Giovanni Gialli',
                rating: 5,
                text: "Ha rivoluzionato il cinema d'azione.",
            },
        ],
    },
    {
        id: 4,
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        genre: 'Crime/Drama',
        release_year: 1972,
        average_vote: 5.0,
        actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
        abstract:
            "L'anziano patriarca di una dinastia della criminalità organizzata trasferisce il controllo del suo impero clandestino al figlio riluttante.",
        image: '/movies_cover/the_godfather.jpg',
        reviews: [
            { id: 6, author: 'Antonio Viola', rating: 5, text: 'Il miglior film di sempre.' },
        ],
    },
    {
        id: 5,
        title: 'Titanic',
        director: 'James Cameron',
        genre: 'Romance/Drama',
        release_year: 1997,
        average_vote: 4.5,
        actors: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
        abstract:
            "Un'aristocratica di diciassette anni si innamora di un artista gentile ma povero a bordo del lussuoso e sfortunato R.M.S. Titanic.",
        image: '/movies_cover/titanic.jpg',
        reviews: [
            {
                id: 7,
                author: 'Giulia Rosa',
                rating: 4,
                text: "Una storia d'amore epica e commovente.",
            },
        ],
    },
];

export default movies;
