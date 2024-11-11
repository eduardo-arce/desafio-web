import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '/node_modules/primeflex/primeflex.css'
import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 

createRoot(document.getElementById('root')!).render(
    <App />,
)
