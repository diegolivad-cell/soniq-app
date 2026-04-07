import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  useEffect(() => {
    // Wave bars
    const waveBars = document.getElementById('waveBars');
    if (waveBars && !waveBars.hasChildNodes()) {
      for (let i = 0; i < 48; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.animationDelay = (i * 0.05) + 's';
        bar.style.height = (Math.random() * 40 + 10) + 'px';
        waveBars.appendChild(bar);
      }
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Counter animation
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const target = parseInt(entry.target.dataset.target);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            const formatted = target >= 1000000
              ? (current / 1000000).toFixed(1) + 'M'
              : target >= 1000
              ? Math.round(current).toLocaleString()
              : Math.round(current) + (target === 98 ? '%' : '+');
            entry.target.textContent = formatted;
          }, 16);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    // Navbar scroll
    const handleScroll = () => {
      const nav = document.getElementById('landing-nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav id="landing-nav" className="landing-navbar">
        <Link to="/" className="logo">SONIQ</Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#gallery">Galería</a>
          <a href="#cta">Descargar</a>
          <Link to="/login" className="btn-nav">Iniciar sesión</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <div>
          <div className="hero-tag"><div className="dot"></div> Ahora con IA generativa</div>
          <h1>Crea música<br /><span>sin límites</span></h1>
          <p>SONIQ transforma tus ideas en canciones completas en segundos. Beats, melodías y letras — todo generado por IA.</p>
          <div className="hero-ctas">
            <Link to="/register" className="btn-primary">Empieza gratis →</Link>
            <button className="btn-outline">Ver demo</button>
          </div>
          <div className="wave-container">
            <div className="wave-bars" id="waveBars"></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-grid">
          <div className="reveal">
            <div className="stat-num" data-target="12000000">0</div>
            <div className="stat-label">Canciones creadas</div>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="stat-num" data-target="2500000">0</div>
            <div className="stat-label">Usuarios activos</div>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="stat-num" data-target="150">0</div>
            <div className="stat-label">Géneros musicales</div>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.45s' }}>
            <div className="stat-num" data-target="98">0</div>
            <div className="stat-label">% de satisfacción</div>
          </div>
        </div>
      </div>

      {/* FEATURE 1 */}
      <section id="features">
        <div className="feature-split">
          <div className="reveal-left">
            <div className="section-tag">Composición IA</div>
            <h2 className="section-title">De idea a canción en 10 segundos</h2>
            <p className="section-sub">Describe el mood que quieres y nuestra IA crea la estructura completa: acordes, beat, melodía y letra.</p>
          </div>
          <div className="reveal-right">
            <div className="feature-visual"><div className="vis-icon">🎼</div></div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 */}
      <section style={{ background: 'var(--bg2)' }}>
        <div className="feature-split reverse">
          <div className="reveal-right">
            <div className="section-tag">Edición intuitiva</div>
            <h2 className="section-title">Control total sobre cada nota</h2>
            <p className="section-sub">Editor de pistas multi-capa con timeline visual. Arrastra, ajusta y mezcla con precisión profesional.</p>
          </div>
          <div className="reveal-left">
            <div className="feature-visual"><div className="vis-icon">🎛️</div></div>
          </div>
        </div>
      </section>

      {/* FEATURE 3 */}
      <section>
        <div className="feature-split">
          <div className="reveal-left">
            <div className="section-tag">Colaboración en tiempo real</div>
            <h2 className="section-title">Crea con artistas de todo el mundo</h2>
            <p className="section-sub">Sesiones colaborativas en vivo. Invita a otros músicos y produzcan juntos sin importar la distancia.</p>
          </div>
          <div className="reveal-right">
            <div className="feature-visual"><div className="vis-icon">🌍</div></div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ background: 'var(--bg2)', paddingTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag reveal">Nuevas funciones</div>
          <h2 className="section-title reveal">Todo lo que necesitas</h2>
        </div>
        <div className="features-grid">
          <div className="feat-card reveal"><div className="feat-icon">🤖</div><div className="feat-title">IA Generativa</div><div className="feat-desc">Genera melodías, armonías y letras con modelos de lenguaje entrenados en millones de canciones.</div></div>
          <div className="feat-card reveal" style={{ transitionDelay: '0.1s' }}><div className="feat-icon">🥁</div><div className="feat-title">Biblioteca de beats</div><div className="feat-desc">Más de 50,000 loops y samples listos para usar. Actualización semanal con nuevos estilos.</div></div>
          <div className="feat-card reveal" style={{ transitionDelay: '0.2s' }}><div className="feat-icon">🎤</div><div className="feat-title">Voz a melodía</div><div className="feat-desc">Tararea o canta y SONIQ convierte tu voz en una melodía MIDI limpia al instante.</div></div>
          <div className="feat-card reveal" style={{ transitionDelay: '0.3s' }}><div className="feat-icon">📱</div><div className="feat-title">Multiplataforma</div><div className="feat-desc">Disponible en iOS, Android, Web y Desktop. Tus proyectos sincronizados en todos tus dispositivos.</div></div>
          <div className="feat-card reveal" style={{ transitionDelay: '0.4s' }}><div className="feat-icon">🔊</div><div className="feat-title">Masterización automática</div><div className="feat-desc">Exporta con calidad profesional. SONIQ aplica masterización IA para streaming automáticamente.</div></div>
          <div className="feat-card reveal" style={{ transitionDelay: '0.5s' }}><div className="feat-icon">💰</div><div className="feat-title">Monetización directa</div><div className="feat-desc">Vende tus canciones o licencias directamente desde SONIQ. Sin intermediarios.</div></div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" id="gallery">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag reveal">Comunidad</div>
          <h2 className="section-title reveal">Lo que están creando</h2>
          <p className="section-sub reveal" style={{ margin: '0 auto' }}>Miles de artistas ya usan SONIQ para producir música increíble. Únete a la comunidad.</p>
        </div>
        <div className="gallery-grid" style={{ marginTop: '60px' }}>
          <div className="gallery-marquee">
            <div className="gallery-track">
              {['🎸','🎹','🎺','🎻','🥁','🎷','🎸','🎵','🎶','🎹','🎸','🎺','🎻','🥁','🎷','🎸','🎵','🎶'].map((e, i) => (
                <div key={i} className="gallery-card">{e}</div>
              ))}
            </div>
          </div>
          <div className="gallery-marquee">
            <div className="gallery-track gallery-track2">
              {['🎤','🎙️','🎚️','🎛️','📻','🔊','🎤','🎼','🎵','🎙️','🎤','🎚️','🎛️','📻','🔊','🎤','🎼','🎵'].map((e, i) => (
                <div key={i} className="gallery-card">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="section-tag reveal">¿Listo para crear?</div>
        <h2 className="section-title reveal">¡Vamos a hacer música!</h2>
        <p className="section-sub reveal" style={{ margin: '16px auto 0' }}>Descarga SONIQ gratis y empieza a crear tu primer track hoy.</p>
        <div className="cta-badges reveal">
          <Link to="/register" className="store-btn">🚀 Empezar gratis</Link>
          <button className="store-btn">⬇ App Store</button>
          <button className="store-btn">⬇ Google Play</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="logo" style={{ fontSize: '18px' }}>SONIQ</div>
        <div className="footer-links">
          <a href="#">Acerca de</a>
          <a href="#">Blog</a>
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '13px' }}>© 2026 SONIQ Inc.</div>
      </footer>
    </div>
  );
}