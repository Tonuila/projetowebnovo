import { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/utility.css";
import "../styles/carousel.css";
import Carousel from "../components/carousel";
import "../styles/hero.css";
import "../styles/contact.css";
import "../styles/footer.css";
import { Menu, X } from "lucide-react";
import Contact from "../components/contact";

export default function Home() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        if (showMobileMenu) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showMobileMenu]);

    return (
        <>
            <header className="container py-sm">
                <nav className="flex items-center justify-between">
                    <img src={"/logo.svg"} alt="Logo projetostark" width={220} height={80} />
                    <div className="desktop-only">
                        <ul className="flex gap-1">
                            <li>
                                <a href="#">Home</a>
                                <a href="#solution">Soluções</a>
                                <a href="#testimonials">Depoimentos</a>
                                <a href="#pricing">Preços</a>
                                <a href="#contact">Contato</a>
                            </li>
                        </ul>
                    </div>
                    <div className="mobile-menu">
                        {showMobileMenu ? (
                            <div className="mobile-menu-content">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#solution">Soluções</a></li>
                                    <li><a href="#testimonials">Depoimentos</a></li>
                                    <li><a href="#pricing">Preços</a></li>
                                    <li><a href="#contact">Contato</a></li>
                                </ul>
                                <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                    <X />
                                </span>
                            </div>
                        ) : (
                            <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                <Menu />
                            </span>
                        )}
                    </div>
                </nav>
            </header>

            <section id="hero">
                <div className="container content">
                    <h1>Pagina do meu carro tunadão!</h1>
                    <p>Já pensou em turbinar um civic velho? venha acompanhar esse processo comigo.</p>
                </div>
            </section>

            <section id="carousel">
                <Carousel styles="carousel" />
            </section>

            <section id="contact">
                <Contact />
            </section>

            <footer className="footer">
                <div className="container flex footer-content">
                    <div className="footer-section">
                        <h4>Sobre</h4>
                        <p>Entenda mais sobre esse projeto que teve inicio em 2022 e permanece até hoje.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Links Rápidos</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#solution">Soluções</a></li>
                            <li><a href="#testimonials">Depoimentos</a></li>
                            <li><a href="#pricing">Preços</a></li>
                            <li><a href="#contact">Contato</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contato</h4>
                        <p>Email: contato@projetostark.com</p>
                        <p>Telefone: (45) 1234-5678</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Projeto Stark. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}
