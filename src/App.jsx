import { useEffect, useRef } from 'react'

const IMAGES = {
  vineyard: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=85',
  cellar: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=85',
  earth: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1800&q=85',
  glass: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=1800&q=85',
  table: 'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?auto=format&fit=crop&w=1800&q=85',
}

const scenes = [
  {
    image: IMAGES.vineyard,
    count: 'I',
    title: 'Altitude writes the first line.',
    body: 'At 790 metres, evening comes quickly. Nerello Mascalese ripens in cold air, bright sun, and the long shadow of Etna.',
  },
  {
    image: IMAGES.earth,
    count: 'II',
    title: 'The ground is never still.',
    body: 'Roots move through fractured basalt and black sand. Each parcel carries its own temperature, mineral edge, and pace.',
  },
  {
    image: IMAGES.cellar,
    count: 'III',
    title: 'The cellar listens.',
    body: 'Native fermentations begin without hurry. Old oak and concrete hold the wine until the mountain feels present, not polished away.',
  },
]

const wines = [
  {
    year: '2022',
    name: 'Nocturne Rosso',
    type: 'Nerello Mascalese · Nerello Cappuccio',
    note: 'Sour cherry, warm stone, blood orange and the dry lift of mountain herbs.',
    serving: 'A lucid first view of the north slope.',
  },
  {
    year: '2021',
    name: 'Contrada Luna',
    type: 'Old-vine Nerello Mascalese',
    note: 'Black tea, iron, rose stem and smoke. Narrow at first, then quietly expansive.',
    serving: 'One parcel, 840 metres, 1,260 bottles.',
  },
  {
    year: '2023',
    name: 'Bianco di Cenere',
    type: 'Carricante · Catarratto',
    note: 'Preserved lemon, fennel seed and wet chalk with a saline, cooling finish.',
    serving: 'Pressed slowly and raised on fine lees.',
  },
]

function Arrow({ direction = 'right' }) {
  return (
    <svg className={`arrow arrow-${direction}`} viewBox="0 0 28 12" aria-hidden="true">
      <path d="M1 6h24M20 1l5 5-5 5" />
    </svg>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Nocturne Cellars home">
        <span className="wordmark-moon">N</span>
        <span>Nocturne</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#origin">Origin</a>
        <a href="#wines">Wines</a>
        <a className="nav-inquiry" href="#inquiry">Visit the cellar</a>
      </nav>
    </header>
  )
}

function FilmSequence() {
  const runwayRef = useRef(null)
  const sceneRefs = useRef([])

  useEffect(() => {
    const runway = runwayRef.current
    const elements = sceneRefs.current
    if (!runway || !elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const rect = runway.getBoundingClientRect()
      const distance = Math.max(1, runway.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / distance))

      elements.forEach((element, index) => {
        const center = index / (elements.length - 1)
        const delta = Math.abs(progress - center)
        const visibility = Math.max(0, 1 - delta * 2.35)
        const inset = Math.min(12, delta * 35)
        element.style.opacity = String(visibility)
        element.style.transform = `scale(${1.07 - visibility * 0.07})`
        element.style.clipPath = `inset(${inset}% ${inset * 0.45}% ${inset}% ${inset * 0.45}%)`
        element.style.zIndex = String(Math.round(visibility * 10))
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="film-runway" id="origin" ref={runwayRef} aria-label="The origin of Nocturne">
      <div className="film-stage">
        <div className="film-index" aria-hidden="true">790 M / ETNA NORD</div>
        {scenes.map((scene, index) => (
          <article
            className="film-scene"
            key={scene.count}
            ref={(element) => { sceneRefs.current[index] = element }}
          >
            <img src={scene.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
            <div className="scene-shade" />
            <div className="scene-copy">
              <span>{scene.count} / III</span>
              <h2>{scene.title}</h2>
              <p>{scene.body}</p>
            </div>
          </article>
        ))}
        <div className="frame-corners" aria-hidden="true" />
      </div>
    </section>
  )
}

function WineList() {
  return (
    <section className="wines-section" id="wines">
      <div className="section-heading">
        <p className="eyebrow">Current release</p>
        <h2>Three readings<br />of one mountain.</h2>
      </div>
      <div className="wine-list">
        {wines.map((wine, index) => (
          <article className="wine" key={wine.name}>
            <div className="wine-number">0{index + 1}</div>
            <div className="wine-main">
              <p className="wine-year">{wine.year}</p>
              <h3>{wine.name}</h3>
              <p className="wine-type">{wine.type}</p>
            </div>
            <div className="wine-note">
              <p>{wine.note}</p>
              <span>{wine.serving}</span>
            </div>
            <a href="#inquiry" aria-label={`Inquire about ${wine.name}`}><Arrow /></a>
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <img className="hero-image" src={IMAGES.table} alt="A quiet cellar table prepared with red wine at dusk" />
          <div className="hero-overlay" />
          <div className="grain" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-provenance">Etna Nord · Sicilia · 37°45′N</p>
            <h1><span>Wine grown</span><span>after dark.</span></h1>
            <div className="hero-foot">
              <p>Small-production wines shaped by cold altitude, old vines, and living volcanic ground.</p>
              <a className="text-link" href="#origin">Enter the mountain <Arrow /></a>
            </div>
          </div>
          <div className="scroll-mark" aria-hidden="true"><span>Scroll</span><i /></div>
        </section>

        <FilmSequence />

        <section className="interlude">
          <img src={IMAGES.glass} alt="Red wine catching a narrow band of cellar light" loading="lazy" />
          <div className="interlude-copy">
            <span>Our measure</span>
            <p>Not power. Not polish.</p>
            <h2>We look for the moment<br />stone becomes <em>light.</em></h2>
          </div>
        </section>

        <WineList />

        <section className="practice" id="practice">
          <div className="practice-title">
            <p className="eyebrow">In the cellar</p>
            <h2>Intervene only<br />when silence asks.</h2>
          </div>
          <div className="practice-details">
            <div><span>01</span><h3>Picked by hand</h3><p>Small vineyard parcels arrive cool, intact, and separate.</p></div>
            <div><span>02</span><h3>Native fermentation</h3><p>Ambient yeasts carry each contrada into the cellar.</p></div>
            <div><span>03</span><h3>Raised with patience</h3><p>Old oak and concrete preserve line, perfume, and place.</p></div>
          </div>
        </section>

        <section className="inquiry" id="inquiry">
          <div className="inquiry-backdrop" style={{ backgroundImage: `url(${IMAGES.vineyard})` }} />
          <div className="inquiry-copy">
            <p className="eyebrow">By appointment</p>
            <h2>Meet the mountain<br />at the cellar door.</h2>
            <p>Private tastings take place in Randazzo from April through October. Allocation and trade inquiries are welcome year-round.</p>
            <a className="primary-button" href="mailto:visit@nocturnecellars.example?subject=Cellar%20visit%20inquiry">Request a visit <Arrow /></a>
          </div>
          <div className="inquiry-meta">
            <span>Contrada Calderara</span><span>Randazzo, Sicily</span><span>By appointment</span>
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-moon">N</span><span>Nocturne</span></a>
        <p>A fictional winery concept created as a portfolio showcase.</p>
        <a href="mailto:cellar@nocturnecellars.example">cellar@nocturnecellars.example</a>
      </footer>
    </>
  )
}

export default App
