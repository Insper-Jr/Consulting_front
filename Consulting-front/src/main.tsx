import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { router } from './router'
import "./i18n";
import "./styles/index.css";
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <Toaster position='bottom-left'/>
  </>
);