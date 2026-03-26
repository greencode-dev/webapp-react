import MovieCard from '../components/MovieCard';
import { Row, Col } from 'react-bootstrap';
import { getMovies } from '../services/api';
import { useEffect, useRef } from 'react';
import useFetch from '../hooks/useFetch';

function AboutPage() {
    const { data } = useFetch(getMovies, [1, 3]);
    const featuredMovies = data?.data || [];
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('about-visible');
                        observerRef.current.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 },
        );

        const animatedEls = document.querySelectorAll('.about-animate');
        animatedEls.forEach((el) => observerRef.current.observe(el));

        return () => observerRef.current?.disconnect();
    }, [featuredMovies]);

    const stats = [
        { value: '500+', label: 'Film in Database', icon: '🎬' },
        { value: '10k+', label: 'Recensioni', icon: '✍️' },
        { value: '24/7', label: 'Aggiornamenti', icon: '⚡' },
        { value: '4.9', label: 'Rating Utenti', icon: '⭐' },
    ];

    const features = [
        {
            icon: '🔍',
            title: 'Scopri',
            description:
                'Esplora un catalogo in costante espansione con filtri avanzati e raccomandazioni personalizzate.',
        },
        {
            icon: '💬',
            title: 'Condividi',
            description:
                'Lascia le tue recensioni, leggi le opinioni della community e confronta i punti di vista.',
        },
        {
            icon: '🏆',
            title: 'Colleziona',
            description:
                'Crea la tua watchlist personale, tieni traccia dei film visti e scopri nuove gemme nascoste.',
        },
    ];

    return (
        <div className="about-page pb-5">
            {/* Hero Section */}
            <header className="about-hero mb-5 px-3">
                <div className="about-hero-particles"></div>
                <div className="hero-content text-center about-animate">
                    <span className="about-badge mb-4 d-inline-block">
                        🎥 La tua piattaforma cinema
                    </span>
                    <h1 className="display-1 fw-bold mb-3">
                        <span className="text-neon-primary">Cine</span>
                        <span className="text-neon-secondary">Lab</span>
                    </h1>
                    <p
                        className="fs-4 mb-4 text-light opacity-80"
                        style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Sperimenta la magia del cinema. Scopri, analizza e vivi ogni fotogramma.
                    </p>
                    <div className="about-hero-divider mx-auto"></div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="container mb-5">
                <Row className="g-4">
                    {stats.map((stat, index) => (
                        <Col key={index} sm={6} lg={3}>
                            <div
                                className="about-stat-card glass-card text-center about-animate"
                                style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="about-stat-icon">{stat.icon}</div>
                                <h3 className="about-stat-value">{stat.value}</h3>
                                <p className="about-stat-label mb-0">{stat.label}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* Mission Section */}
            <section className="container mb-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6 about-animate">
                        <span className="about-section-tag">Chi Siamo</span>
                        <h2 className="display-4 fw-bold mb-4">
                            <span className="text-gradient">La Nostra Missione</span>
                        </h2>
                        <p className="lead text-light mb-4" style={{ lineHeight: 1.8 }}>
                            CineLab nasce dalla passione per il racconto cinematografico. Il nostro
                            obiettivo è creare un ecosistema dove gli appassionati possano scoprire
                            nuovi capolavori, condividere opinioni sincere e approfondire la
                            conoscenza della settima arte.
                        </p>
                        <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                            Ogni film è una finestra su un mondo diverso. Noi ti forniamo gli
                            strumenti per aprirle tutte, con una libreria in costante espansione e
                            una comunità vibrante.
                        </p>
                    </div>
                    <div className="col-lg-6 about-animate">
                        <div className="about-mission-visual">
                            <div className="about-mission-ring about-mission-ring-1"></div>
                            <div className="about-mission-ring about-mission-ring-2"></div>
                            <div className="about-mission-center">
                                <span className="about-mission-emoji">🎞️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mb-5">
                <div className="text-center mb-5 about-animate">
                    <span className="about-section-tag">Perché CineLab</span>
                    <h2 className="display-5 fw-bold text-gradient">Un'esperienza completa</h2>
                </div>
                <Row className="g-4">
                    {features.map((feature, index) => (
                        <Col key={index} md={4}>
                            <div
                                className="about-feature-card glass-card h-100 about-animate"
                                style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="about-feature-icon">{feature.icon}</div>
                                <h4 className="fw-bold text-neon-primary mb-3">{feature.title}</h4>
                                <p className="text-secondary mb-0">{feature.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* Featured Section */}
            <section className="container about-animate">
                <div className="text-center mb-5">
                    <span className="about-section-tag">In Evidenza</span>
                    <h2 className="display-6 fw-bold text-gradient">
                        Per iniziare la tua ricerca...
                    </h2>
                </div>
                <Row className="g-4">
                    {featuredMovies.map((movie) => (
                        <Col key={movie.id} lg={4} md={6} className="about-animate">
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    );
}

export default AboutPage;
