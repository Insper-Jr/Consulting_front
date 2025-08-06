import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./serviceCard";
import arrow from "../assets/arrow-right.png";

const business = [
  {
    title: "Análise Mercadológica",
    description:
      "Realizamos pesquisas detalhadas sobre o cenário econômico, analisamos tendências de mercado, além de conduzir estudos aprofundados sobre a concorrência. Nosso objetivo é fornecer insights que auxiliem na tomada de decisões.",
    link: "/market",
  },
  {
    title: "Estratégia de Marketing",
    description:
      "Desenvolvemos estratégias para impulsionar vendas, fortalecer marcas e aprimorar a segmentação de clientes. Com análise de mercado e comportamento do consumidor, criamos ações que aumentam competitividade, relevância e engajamento da sua empresa.",
    link: "/marketing",
  },
  {
    title: "Planejamento Financeiro",
    description:
      "Analisamos e estruturamos suas finanças para garantir maior controle, previsibilidade e crescimento sustentável. Com isso, sua empresa toma decisões mais seguras, maximiza a rentabilidade e se prepara para oportunidades de expansão.",
    link: "/financial",
  },
  {
    title: "Plano Operacional",
    description:
      "Mapeamos processos e analisamos a estrutura interna da empresa para eliminar gargalos, reduzir ineficiências e aumentar a produtividade, garantindo operações ágeis, menor custo e mais previsibilidade de resultados.",
    link: "/operational",
  },
];

const engenharia = [
  {
    title: "Análise de Dados",
    description:
      "Coletamos, tratamos e analisamos dados estratégicos da sua operação, gerando insights valiosos. Com análises precisas, sua empresa toma decisões mais assertivas, reduz riscos e identifica novas oportunidades.",
    link: "/data",
  },
  {
    title: "Desenvolvimento de Produto",
    description:
      "Apoiamos sua empresa no desenvolvimento de novos produtos, alinhando-os às exigências do projeto e do mercado. Assim, você acelera a inovação, reduz riscos e entrega soluções mais assertivas aos clientes.",
    link: "/products",
  },
  {
    title: "Desenvolvimento Web",
    description:
      "Desenvolvemos sites, aplicativos e sistemas web personalizados, alinhados às necessidades do seu negócio. Com uma estrutura bem planejada, sua empresa fortalece sua presença digital, melhora a experiência do usuário e amplia seu alcance.",
    link: "/devweb",
  },
];

const direito = [
  {
    title: "Criação e Estruturação",
    description:
      "Formalize seu projeto com segurança. Estruturamos contratos, estatutos e documentos essenciais para o nascimento jurídico da sua organização, com base sólida e alinhada ao seu propósito.",
    link: "/creation",
  },
  {
    title: "Operação e Estratégia",
    description:
      "Consolide e expanda seu negócio com segurança. Atuamos na elaboração de contratos, políticas internas e estratégias jurídicas para governança, gestão de riscos e alinhamento entre sócios e parceiros.",
      link: "/strategy",
  },
  {
    title: "Proteção e Regularização",
    description:
      "Proteja seu negócio com segurança jurídica. Cuidamos do registro de marca, patente, software e adequação à LGPD, garantindo conformidade legal e proteção dos seus ativos intangíveis.",
    link: "/protection",
  }

]

const scopeOrder = ["business", "engenharia", "direito"] as const;
type Scope = typeof scopeOrder[number];

const SolutionsCarousel = () => {
  const [animateSlider, setAnimateSlider] = useState(false);
  const [scope, setScope] = useState<Scope>("business");
  const [page, setPage] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const navigate = useNavigate();
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [prevScope, setPrevScope] = useState(scope);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const scopes: Record<Scope, typeof business> = { business, engenharia, direito };
  const currentCards = scopes[scope];

  useEffect(() => {
    if (!autoSlide || isHoveringCard || isAnimating) return;
    const interval = setInterval(() => {
      const currentIndex = scopeOrder.indexOf(scope);
      const nextIndex = (currentIndex + 1) % scopeOrder.length;
      const newScope = scopeOrder[nextIndex];
      // direção: se estiver avançando no array, desliza pra esquerda
      const isToLeft = nextIndex > currentIndex;
      setDirection(isToLeft ? "left" : "right");
      setPrevScope(scope);
      setIsAnimating(true);

      setTimeout(() => {
        setScope(newScope);
        setPage(0);
        setIsAnimating(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoSlide, isHoveringCard, isAnimating, scope]);

  const handleScopeClick = (selected: Scope) => {
    if (selected === scope || isAnimating) return;
    setAutoSlide(false); // interrup auto-slide ao clicar
    const currentIndex = scopeOrder.indexOf(scope);
    const targetIndex = scopeOrder.indexOf(selected);
    const isToLeft = targetIndex > currentIndex;
    setDirection(isToLeft ? "left" : "right");
    setPrevScope(scope);
    setIsAnimating(true);

    setTimeout(() => {
      setScope(selected);
      setPage(0);
      setIsAnimating(false);
    }, 600);
  };
  
  useEffect(() => {
    const shouldAutoSlide = window.innerWidth > 800;
    setAutoSlide(shouldAutoSlide);
  }, []);

  return (
    <Wrapper>
      <Header>
        <Line />
        <h2>Nossas Soluções</h2>
        <Line />
      </Header>

      <Subtitle>
        A Insper Jr. oferece serviços nas áreas de Business e Engenharia, proporcionando soluções estratégicas adaptadas a diversas necessidades.
      </Subtitle>

      <Tabs>
        {scopeOrder.map((sc) => (
          <Tab
            key={sc}
            active={scope === sc}
            onClick={() => handleScopeClick(sc)}
          >
            {sc.charAt(0).toUpperCase() + sc.slice(1)}
          </Tab>
        ))}
      </Tabs>

      <SliderWrapper>
        {isAnimating && (
          <Slider animateOut direction={direction}>
            {scopes[prevScope].map((card) => (
              <ServiceCard key={`prev-${card.title}`} {...card} onHoverChange={setIsHoveringCard} />
            ))}
          </Slider>
        )}
        <Slider animateIn={isAnimating} direction={direction}>
          {currentCards.map((card) => (
            <ServiceCard key={card.title} {...card} onHoverChange={setIsHoveringCard} />
          ))}
        </Slider>
      </SliderWrapper>

      <Dots>
        {scopeOrder.map((sc) => (
          <Dot key={sc} active={scope === sc} onClick={() => handleScopeClick(sc)} />
        ))}
      </Dots>


      <OverviewButton onClick={() => navigate("/overview")}>
        Conheça todos Nossos Serviços <img src={arrow} alt="seta" />
      </OverviewButton>
    </Wrapper>
  );
};

export default SolutionsCarousel;


export const Wrapper = styled.section`
  padding: 4rem 0rem;
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 36px;
    color: #A10F23;
    white-space: nowrap;
  }
      @media (max-width: 600px) {
  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 26px;
    color: #A10F23;
    white-space: nowrap;
  }
  }
`;

export const Line = styled.div`
  height: 2px;
  background-color: black;
  width: 100%;
`;

export const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  @media (max-width: 600px) {
    font-size: 15px;
}
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
`;

export const Tab = styled.button<{ active: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;
  background: none;
  border: none;
  color: black;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ active }) => (active ? "#A10F23" : "transparent")};
    transition: background-color 0.3s ease;
  }
    @media (max-width: 600px) {
  font-size: 16px;
  padding: 1px;}
`;


export const Underline = styled.div<{ activeTab: "business" | "engenharia" }>`
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #A10F23;
  width: ${({ activeTab }) => (activeTab === "business" ? "100px" : "120px")};
  transition: all 0.3s ease;
  left: ${({ activeTab }) => (activeTab === "business" ? "calc(50% - 135px)" : "calc(50% + 17px)")};

  @media (max-width: 600px) {
    width: 60px;
    left: ${({ activeTab }) => (activeTab === "business" ? "calc(50% - 100px)" : "calc(50% + 40px)")};
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 320px;

  @media (max-width: 1200px) {
    width: 90%;
    height: auto; /* altura automática para acomodar duas linhas */
    margin: 0 auto;
  }
`;

export const Slider = styled.div<{
  animateIn?: boolean;
  animateOut?: boolean;
  direction?: "left" | "right";
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap; 
  gap: 20px; 
  width: 100%;
  top: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  
  transform: ${({ animateIn, animateOut, direction }) => {
    if (animateOut)
      return direction === "left" ? "translateX(-100%)" : "translateX(100%)";
    if (animateIn)
      return direction === "left" ? "translateX(100%)" : "translateX(-100%)";
    return "translateX(0)";
  }};
  
  opacity: ${({ animateOut }) => (animateOut ? 0 : 1)};
  
  @media (max-width: 1200px) {
    position: static;         /* Remove a posição absoluta */
    flex-wrap: wrap;          /* Permite quebra dos cards em múltiplas linhas */
    gap: 16px;                /* Espaçamento reduzido entre os cards */
    width: 100%;
    top: auto;
    transform: none;          /* Desativa as transformações de slide */
    opacity: 1;
  }
`;



export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#A10F23" : "#ccc")};
  border-radius: 50%;
  margin-top: 1rem;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 8px;
    height: 8px;
    }
`;

export const OverviewButton = styled.button`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 2rem;
  background: none;
  border: none;
  color: #A10F23;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: gap 0.3s ease;

  img {
    width: 18px;
    transition: transform 0.3s ease;
  }

  &:hover {
    gap: 0.6rem;

    img {
      transform: translateX(5px);
    }
  }
  @media (max-width: 600px) {
    font-size: 14px;
    img {
        width: 24px;
        height: 24px;
    }
  }
`;