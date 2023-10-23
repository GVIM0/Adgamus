import './App.css';
import 'https://kit.fontawesome.com/41bcea2ae3.js';

function App() {
  return (
    <div>
      <header>
        <div className="header__superior">
          {/* <div className="logo">
            <img src="IMG/AdgamusLogo1.png" alt="Adgamus Logo" />
          </div> */}
        </div>
        <div className="container__menu">
          <div className="menu">
            <input type="checkbox" id="check__menu" />
            <label htmlFor="check__menu" id="label__check">
              <i className="fas fa-bars icon__menu"></i>
            </label>
            <nav>
              <ul>
                <li><a href="#" id="selected"></a></li>
                <li>
                  <a href="#">Otras opciones</a>
                  <ul>
                    <li><a href="#">Perfil</a></li>
                    <li><a href="#">Ajustes</a></li>
                    <li><a href="#">Red</a></li>
                    <li><a href="#">Mensajes</a></li>
                    <li><a href="#">Políticas de uso</a></li>
                  </ul>
                </li>
                <li><a href="CuidadoCultivos.html">Cuidado de cultivos</a></li>
                <li><a href="SeleccionArtificial.html">Seleccion artificial</a></li>
                <li><a href="Recursos.html">Recursos</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        <section className="container">
          <h2 className="title_section">Bienvenidos a Adgamus</h2>
          <p className="copy">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="enfoques">
            <div className="enfoque" id="enfoque1">
              <label>
                <h3><em>Plantas</em></h3>
              </label>
            </div>
            <div className="enfoque" id="enfoque2">
              <label>
                <h3><em>Animales</em></h3>
              </label>
            </div>
            <div className="enfoque" id="enfoque3">
              <label>
                <h3><em>Recursos</em></h3>
              </label>
            </div>
          </div>
        </section>
        <section className="Informacion_adgamus">
          <article>
            <h2>¿Cuál es nuestro objetivo?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio est nobis consectetur officia dolore accusamus sunt vel quo exercitationem doloribus dolores repudiandae atque, cupiditate laboriosam id, accusantium ducimus tempore ullam?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque porro nostrum eveniet cumque animi totam error placeat quos molestiae non, aperiam incidunt ratione ipsum. Illum ducimus aliquam, mollitia dicta nulla at et! Alias et facere odio esse consequatur sunt dolorum?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iusto eligendi nesciunt soluta molestias sit.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et eum reiciendis unde dignissimos temporibus ipsa suscipit animi expedita, praesentium recusandae minima quasi mollitia culpa fugiat odit voluptate rerum incidunt.</p>
          </article>
          <article>
            <h2>¿Qué pretendemos lograr?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio est nobis consectetur officia dolore accusamus sunt vel quo exercitationem doloribus dolores repudiandae atque, cupiditate laboriosam id, accusantium ducimus tempore ullam?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque porro nostrum eveniet cumque animi totam error placeat quos molestiae non, aperiam incidunt ratione ipsum. Illum ducimus aliquam, mollitia dicta nulla at et! Alias et facere odio esse consequatur sunt dolorum?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iusto eligendi nesciunt soluta molestias sit.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et eum reiciendis unde dignissimos temporibus ipsa suscipit animi expedita, praesentium recusandae minima quasi mollitia culpa fugiat odit voluptate rerum incidunt.</p>
          </article>
          <article>
            <h2>Visión</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio est nobis consectetur officia dolore accusamus sunt vel quo exercitationem doloribus dolores repudiandae atque, cupiditate laboriosam id, accusantium ducimus tempore ullam?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque porro nostrum eveniet cumque animi totam error placeat quos molestiae non, aperiam incidunt ratione ipsum. Illum ducimus aliquam, mollitia dicta nulla at et! Alias et facere odio esse consequatur sunt dolorum?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iusto eligendi nesciunt soluta molestias sit.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et eum reiciendis unde dignissimos temporibus ipsa suscipit animi expedita, praesentium recusandae minima quasi mollitia culpa fugiat odit voluptate rerum incidunt.</p>
          </article>
          <article>
            <h2>Misión</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio est nobis consectetur officia dolore accusamus sunt vel quo exercitationem doloribus dolores repudiandae atque, cupiditate laboriosam id, accusantium ducimus tempore ullam?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque porro nostrum eveniet cumque animi totam error placeat quos molestiae non, aperiam incidunt ratione ipsum. Illum ducimus aliquam, mollitia dicta nulla at et! Alias et facere odio esse consequatur sunt dolorum?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iusto eligendi nesciunt soluta molestias sit.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et eum reiciendis unde dignissimos temporibus ipsa suscipit animi expedita, praesentium recusandae minima quasi mollitia culpa fugiat odit voluptate rerum incidunt.</p>
          </article>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="title_section">
            <h2>Contáctenos</h2>
          </div>
          <div className="redes_sociales">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-solid fa-envelope"></i></a>
          </div>
          <div className="container">
            <p className="copy">
              2023 Adgamus / Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
