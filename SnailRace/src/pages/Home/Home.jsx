import React from 'react'
import '../../styles/Home.scss'; 

const Home = () => {
return (
  <div>
    <div className="home-container">
      <h1 className="home-title" >Bienvenido a <strong>SnailRace</strong></h1>

      <section className="home-card vehicles-card">
        <div className="home-text">
          <h2>Vehicles</h2>
          <p>
            En SnailRace, ofrecemos una base de datos detallada de vehículos, tanto autos como motos, para todos los entusiastas del mundo motor. 
            Podés explorar una gran variedad de modelos organizados por tipo, año, combustible, motor, precio y otras especificaciones técnicas. 
            Nuestro objetivo es que tengas toda la información necesaria para conocer a fondo cualquier vehículo, ya sea por curiosidad, comparación o decisión de compra.
            Además, cada modelo cuenta con etiquetas específicas para facilitar la búsqueda y navegación, y podés visualizar imágenes representativas que ayudan a reconocerlos fácilmente.
          </p>
        </div>
        <div className="home-image">
          <img src="../../../img/Vehicle.jpg" alt="Vehículos" />
        </div>
      </section>

      <section className="home-card brands-card">
        <div className="home-image">
          <img src="../../../img/Marca.jpg" alt="Marcas" />
        </div>
        <div className="home-text">
          <h2>Brands</h2>
          <p>
            Las marcas son una parte esencial en SnailRace. Proveemos información completa sobre las marcas fabricantes de vehículos, incluyendo su nombre, país de origen y logotipo. 
            Esto permite a los usuarios entender el legado, estilo y procedencia de cada modelo que visualizan. 
            Ya sea una marca clásica de automóviles europeos o una innovadora fábrica de motocicletas asiáticas, SnailRace te conecta con sus raíces y catálogo.
            Nuestra sección de marcas también funciona como filtro para explorar fácilmente qué modelos corresponden a cada fabricante.
          </p>
        </div>
      </section>
      </div>


          <section className="snailrace-goals-section">
          <div className="home-goals-content">
            <h2>Nuestro propósito</h2>
            <p>
              En <strong>SnailRace</strong>, creemos que la información clara y confiable es clave para cualquier decisión relacionada con vehículos.  
              Ya seas un apasionado del automovilismo, estés comparando motos o simplemente explorando por curiosidad, queremos darte un espacio donde puedas acceder rápidamente a todos los datos importantes.
            </p>
            <p>
              Nuestro objetivo es ayudarte a comprender cada detalle técnico, el contexto de cada marca y cómo cada modelo se adapta a tus necesidades.  
              SnailRace es más que una base de datos: es una herramienta para descubrir, aprender y tomar decisiones con confianza.
            </p>
            <p>
              Queremos fomentar una comunidad informada, apasionada por los motores y conectada por el conocimiento.
            </p>
          </div>
        </section>
    </div>

  );
};

export default Home