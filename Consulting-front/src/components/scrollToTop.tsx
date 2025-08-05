import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente para rolar para o topo da página
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;