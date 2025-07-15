import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
    return (
        <footer className="site-footer">
        <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} SnailRace. Todos los derechos reservados.</p>
            <p><strong>Alumno:</strong> Gastón Fernández Gutiérrez</p>
            <p><strong>Maestra:</strong> MARCOS GALBAN, Camila Belén</p>
            <p><strong>Materia:</strong> Aplicaciones Híbridas</p>
            <p><strong>Comisión:</strong> DWN4AP</p>
        </div>
    </footer>
);
};

export default Footer;
