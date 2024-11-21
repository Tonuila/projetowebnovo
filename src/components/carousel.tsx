import { useState, useEffect, useRef } from 'react';

const images = ['/civic1.webp', '/civic2.jpg', '/civic3.webp'];

interface CarouselProps {
    styles: string;
}

export default function Carousel({ styles }: CarouselProps) {
    const [translateX, setTranslateX] = useState(0); // Posição de rolagem (deslocamento)
    const containerRef = useRef<HTMLDivElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);

    // Função para rolar automaticamente
    const autoScroll = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const maxScroll = objectRef.current?.scrollWidth || 0;
            const nextTranslateX = translateX + containerWidth; // Avança para a próxima imagem

            // Reseta o valor de translateX quando atingir o final
            if (nextTranslateX >= maxScroll) {
                setTranslateX(0); // Volta para o início
            } else {
                setTranslateX(nextTranslateX);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(autoScroll, 3000); // Intervalo de 3 segundos para rolagem automática

        return () => {
            clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
        };
    }, [translateX]);

    return (
        <div className={styles}>
            <div ref={containerRef} className="carousel-container" style={{ overflow: 'hidden', width: '100%' }}>
                <div
                    ref={objectRef}
                    className="carousel-items"
                    style={{
                        display: 'flex',
                        transform: `translateX(-${translateX}px)`, // Aplica a rotação com o valor de translateX
                        transition: 'transform 0.8s ease', // Animação suave de transição
                    }}
                >
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Carousel image ${index}`} style={{ width: '100%', objectFit: 'cover', flexShrink: 0 }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
