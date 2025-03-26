import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./serviceCard";
import arrow from "../assets/arrow-right.png";

// Dados dos escopos
const business = [
  {
    title: "Análise Mercadológica",
    description:
      "Realizamos pesquisas detalhadas sobre o cenário econômico, analisamos tendências de mercado, além de conduzir estudos aprofundados sobre a concorrência. Nosso objetivo é fornecer insights que auxiliem na tomada de decisões.",
    link: "/mercadologica",
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
    link: "/financeiro",
  },
  {
    title: "Plano Operacional",
    description:
      "Mapeamos processos e analisamos a estrutura interna da empresa para eliminar gargalos, reduzir ineficiências e aumentar a produtividade, garantindo operações ágeis, menor custo e mais previsibilidade de resultados.",
    link: "/operacional",
  },
];

const engenharia = [
  {
    title: "Análise de Dados",
    description:
      "Coletamos, tratamos e analisamos dados estratégicos da sua operação, gerando insights valiosos. Com análises precisas, sua empresa toma decisões mais assertivas, reduz riscos e identifica novas oportunidades.",
    link: "/dados",
  },
  {
    title: "Desenvolvimento de Produto",
    description:
      "Apoiamos sua empresa no desenvolvimento de novos produtos, alinhando-os às exigências do projeto e do mercado. Assim, você acelera a inovação, reduz riscos e entrega soluções mais assertivas aos clientes.",
    link: "/mvp",
  },
  {
    title: "Desenvolvimento Web",
    description:
      "Desenvolvemos sites, aplicativos e sistemas web personalizados, alinhados às necessidades do seu negócio. Com uma estrutura bem planejada, sua empresa fortalece sua presença digital, melhora a experiência do usuário e amplia seu alcance.",
    link: "/devweb",
  },
];

const SolutionsCarousel = () => {
  const [animateSlider, setAnimateSlider] = useState(false);
  const [scope, setScope] = useState<"business" | "engenharia">("business");
  const [page, setPage] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const navigate = useNavigate();

  const scopes = { business, engenharia };
  const currentCards = scopes[scope];
  const cardsPerPage = scope === "business" ? 4 : 3;
  const totalPages = Math.ceil(currentCards.length / cardsPerPage);

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setScope((prev) => (prev === "business" ? "engenharia" : "business"));
      setPage(0);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  const handleScopeClick = (selected: "business" | "engenharia") => {
      setScope(selected);
      setPage(0);
      setAutoSlide(false);
      setAnimateSlider(true);
      setTimeout(() => setAnimateSlider(false), 400);
  };

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
        <Tab active={scope === "business"} onClick={() => handleScopeClick("business")}>Business</Tab>
        <Tab active={scope === "engenharia"} onClick={() => handleScopeClick("engenharia")}>Engenharia</Tab>
      </Tabs>

      <SliderWrapper>
        <Slider animate={animateSlider} key={scope}>
            {currentCards
            .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
            .map((card) => (
                <ServiceCard key={card.title} {...card} />
            ))}
        </Slider>
      </SliderWrapper>

      <Dots>
        <Dot active={scope === "business"} onClick={() => handleScopeClick("business")} />
        <Dot active={scope === "engenharia"} onClick={() => handleScopeClick("engenharia")} />
      </Dots>


      <OverviewButton onClick={() => navigate("/servicos")}>
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
  `;
  
  export const Slider = styled.div<{ animate?: boolean }>`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  gap: 2rem;
  transform: ${({ animate }) => (animate ? "translateX(-10px)" : "translateX(0)")};
  opacity: ${({ animate }) => (animate ? 0 : 1)};
  transition: transform 0.6s ease, opacity 0.6s ease;
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
  cursor: pointer;
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
`;