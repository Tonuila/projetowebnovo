import { useState, useEffect } from "react"; // Importa hooks React para estado e efeitos colaterais
import "../styles/header.css"; // Estilos para o cabeçalho
import "../styles/utility.css"; // Estilos utilitários globais
import "../styles/carousel.css"; // Estilos para o carrossel
import Carousel from "../components/carousel"; // Componente de carrossel importado
import "../styles/hero.css"; // Estilos para a seção "hero"
import "../styles/contact.css"; // Estilos para a seção de contato
import "../styles/footer.css"; // Estilos para o rodapé
import { Menu, X } from "lucide-react"; // Ícones de menu (aberto e fechado)
import Contact from "../components/contact"; // Componente de formulário de contato

// Componente funcional `Home`
export default function Home() {
    // Estado que controla a visibilidade do menu mobile
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Efeito para adicionar/remover a classe "no-scroll" no corpo da página quando o menu mobile é aberto
    useEffect(() => {
        if (showMobileMenu) {
            document.body.classList.add('no-scroll'); // Impede o scroll quando o menu está aberto
        } else {
            document.body.classList.remove('no-scroll'); // Permite o scroll quando o menu está fechado
        }

        // Cleanup: remove a classe "no-scroll" ao desmontar o componente
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showMobileMenu]); // Executa o efeito sempre que `showMobileMenu` mudar

    return (
        <>
            {/* Cabeçalho */}
            <header className="container py-sm">
                <nav className="flex items-center justify-between">
                    {/* Logo do site */}
                    <img src={"/logo.svg"} alt="Logo projetostark" width={220} height={80} />
                    
                    {/* Menu para telas grandes */}
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

                    {/* Menu para dispositivos móveis */}
                    <div className="mobile-menu">
                        {showMobileMenu ? (
                            // Menu mobile aberto
                            <div className="mobile-menu-content">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#solution">Soluções</a></li>
                                    <li><a href="#testimonials">Depoimentos</a></li>
                                    <li><a href="#pricing">Preços</a></li>
                                    <li><a href="#contact">Contato</a></li>
                                </ul>
                                {/* Botão para fechar o menu mobile */}
                                <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                    <X /> {/* Ícone de "fechar" */}
                                </span>
                            </div>
                        ) : (
                            // Botão para abrir o menu mobile
                            <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                <Menu /> {/* Ícone de "menu" */}
                            </span>
                        )}
                    </div>
                </nav>
            </header>

            {/* Seção principal "Hero" */}
            <section id="hero">
                <div className="container content">
                    <h1>Pagina do meu carro tunadão!</h1>
                    <p>Já pensou em turbinar um civic velho? venha acompanhar esse processo comigo.</p>
                </div>
            </section>

            {/* Seção do carrossel */}
            <section id="carousel">
                <Carousel styles="carousel" /> {/* Componente de carrossel */}
            </section>

            {/* Seção de contato */}
            <section id="contact">
                <Contact /> {/* Componente de formulário de contato */}
            </section>

            {/* Rodapé */}
            <footer className="footer">
                <div className="container flex footer-content">
                    {/* Informações sobre o projeto */}
                    <div className="footer-section">
                        <h4>Sobre</h4>
                        <p>Entenda mais sobre esse projeto que teve inicio em 2022 e permanece até hoje.</p>
                    </div>
                    {/* Links rápidos */}
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
                    {/* Informações de contato */}
                    <div className="footer-section">
                        <h4>Contato</h4>
                        <p>Email: contato@projetostark.com</p>
                        <p>Telefone: (45) 1234-5678</p>
                    </div>
                </div>
                {/* Rodapé inferior com direitos autorais */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Projeto Stark. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}
/*
Explicação geral
Menu responsivo: O menu alterna entre as versões "desktop" e "mobile". No mobile, o estado showMobileMenu controla a visibilidade.
Efeito useEffect: Evita que o corpo da página role quando o menu mobile está aberto, adicionando/removendo a classe CSS no-scroll.
Componentes reutilizáveis: O carrossel e o formulário de contato são renderizados como componentes importados (Carousel e Contact).
Organização: O código está dividido em várias seções (hero, carrossel, contato, rodapé), cada uma com estilos e componentes específicos.
Responsividade: O menu e outros elementos utilizam classes como desktop-only e mobile-menu para gerenciar estilos em diferentes tamanhos de tela.
*/