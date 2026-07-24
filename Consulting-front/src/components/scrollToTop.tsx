import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Rola para o topo em navegações novas (PUSH/REPLACE),
// mas preserva a posição ao voltar/avançar (POP) — assim o browser
// restaura o scroll nativo da página anterior.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP') return;
    window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
};

export default ScrollToTop;
