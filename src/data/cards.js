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
    {
        id: 6,
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        genre: 'Crime',
        release_year: 1994,
        average_vote: 4.9,
        actors: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        abstract:
            'Le vite di due sicari, un pugile, la moglie di un gangster e due banditi si intrecciano in quattro storie di violenza e redenzione.',
        image: '/movies_cover/pulp_fiction.webp',
        reviews: [
            {
                id: 8,
                author: 'Roberto Blu',
                rating: 5,
                text: 'Dialoghi iconici e una regia magistrale.',
            },
        ],
    },
    {
        id: 7,
        title: 'Le ali della libertà',
        director: 'Frank Darabont',
        genre: 'Drama',
        release_year: 1994,
        average_vote: 5.0,
        actors: ['Tim Robbins', 'Morgan Freeman'],
        abstract:
            'Due uomini imprigionati instaurano un legame nel corso di diversi anni, trovando consolazione e alla fine la redenzione attraverso atti di comune decenza.',
        image: '/movies_cover/the_shawshank_redemption.webp',
        reviews: [
            {
                id: 9,
                author: 'Paola Arancio',
                rating: 5,
                text: 'Una storia di speranza meravigliosa.',
            },
        ],
    },
    {
        id: 8,
        title: 'Il cavaliere oscuro',
        director: 'Christopher Nolan',
        genre: 'Action/Crime',
        release_year: 2008,
        average_vote: 4.9,
        actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        abstract:
            'Batman deve accettare una delle più grandi sfide psicologiche e fisiche della sua lotta contro l’ingiustizia quando il Joker semina il caos a Gotham City.',
        image: '/movies_cover/the_dark_knight.webp',
        reviews: [
            {
                id: 10,
                author: 'Fabio Grigio',
                rating: 5,
                text: 'L’interpretazione di Heath Ledger è leggendaria.',
            },
        ],
    },
    {
        id: 9,
        title: 'Fight Club',
        director: 'David Fincher',
        genre: 'Drama',
        release_year: 1999,
        average_vote: 4.6,
        actors: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
        abstract:
            'Un impiegato d’ufficio insonne e un eccentrico produttore di sapone formano un club di combattimento sotterraneo che si trasforma in qualcosa di molto più oscuro.',
        image: '/movies_cover/fight_club.webp',
        reviews: [
            { id: 11, author: 'Sandro Marrone', rating: 4, text: 'Provocatorio e visionario.' },
        ],
    },
    {
        id: 10,
        title: 'Forrest Gump',
        director: 'Robert Zemeckis',
        genre: 'Drama/Romance',
        release_year: 1994,
        average_vote: 4.8,
        actors: ['Tom Hanks', 'Robin Wright'],
        abstract:
            'La storia di un uomo con un basso quoziente intellettivo che assiste e influenza involontariamente diversi eventi storici del XX secolo negli Stati Uniti.',
        image: '/movies_cover/forrest_gump.webp',
        reviews: [
            { id: 12, author: 'Caterina Viola', rating: 5, text: 'Commovente e intramontabile.' },
        ],
    },
];

export default movies;
