import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Rola para o topo em navegações novas (PUSH/REPLACE),
// mas preserva a posição ao voltar/avançar (POP) — assim o browser
// restaura o scroll nativo da página anterior.
const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Navegação que pede para abrir a página já na altura de um elemento
    // (ex.: "Saiba mais" de um escopo, no seletor da home). A URL fica limpa,
    // sem hash, porque o alvo viaja no state da rota.
    const target = (state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      // Dois frames para o layout da página nova assentar antes de medir.
      // block: 'center' evita que o header fixo cubra o topo do elemento.
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          document.getElementById(target)?.scrollIntoView({ block: 'center' })
        )
      );
      return () => cancelAnimationFrame(raf);
    }

    if (navType === 'POP') return;
    window.scrollTo(0, 0);
  }, [pathname, navType, state]);

  return null;
};

export default ScrollToTop;
