import { useRef, useState } from 'react'
import './App.css'

const steps = [
  { number: '01', title: 'Personalize', text: 'Answer a quick survey about how you express yourself, what causes you stress, and what area would you like to work on. This way, we can fully personalize your journal!', image: 'card-1.png', alt: 'A calm workspace with a laptop and a green leaf' },
  { number: '02', title: 'Write & Understand', text: 'Write, draw, reflect, understand. Alivio will guide you through the prompts and will help you manage your stress!', image: 'card-2.png', alt: 'An open personal journal' },
  { number: '03', title: 'Alivio!', text: 'Now you are aware, and have a way to manage and overcome your own stress. What are you waiting for? Alivio today!', image: 'card-3.png', alt: 'A smiling woman enjoying a peaceful day outside' },
]
const links = [['Why Alivio', '#how-it-works'], ['Solutions', '#product'], ['Community', '#story']]

export default function App() {
  const [menu, setMenu] = useState(false)
  const [modal, setModal] = useState('journal')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [note, setNote] = useState(() => {
    try { return localStorage.getItem('alivio-journal') || '' } catch { return '' }
  })
  const dialog = useRef(null)
  function open(type) { setModal(type); setSaved(false); setError(''); setMenu(false); dialog.current.showModal() }
  function save(event) {
    event.preventDefault()
    try { localStorage.setItem('alivio-journal', note); setSaved(true); setError('') }
    catch { setError('Your browser could not save this entry. Please copy your words before closing.') }
  }
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="logo" aria-label="Alivio home">Alivio</a>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? '✕' : '☰'}</button>
          <nav id="navigation" className={menu ? 'navigation expanded' : 'navigation'} aria-label="Main navigation">
            {links.map(([title, href]) => <a key={title} href={href} onClick={() => setMenu(false)}>{title}</a>)}
            <button className="text-button" onClick={() => open('pricing')}>Pricing</button>
            <div className="account"><button className="text-button" onClick={() => open('signin')}>Sign in</button><button className="button" onClick={() => open('journal')}>Start Trial</button></div>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div className="hero-copy"><h1 id="hero-title">Be aware,<br />Manage well.</h1>
              <p>Everyone experiences stress in different ways.<br className="desktop-break" /> Let Alivio guide you, in a personalized journal experience, to overcome your stress.</p>
              <button className="button" onClick={() => open('journal')}>Find Your Way</button>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="steps-section container">
          <div className="section-intro"><div><p className="eyebrow">How it works</p><h2>Understand & Release<br />the stress in 3 steps</h2></div><p className="intro-description">Alivio offers as many journals it takes, tackling different areas such as anxiety, overwhelmedness, sadness, or anger, and a variety of personal causes, to help you become aware of your emotions, and guide you in how to manage stress.</p></div>
          <div className="steps-grid">{steps.map((step, index) => <article className={`step step-${index + 1}`} key={step.number}><div className="step-heading"><span aria-hidden="true">{step.number}</span><h3>{step.title}</h3></div><p>{step.text}</p><img src={`/images/${step.image}`} alt={step.alt} loading="lazy" /></article>)}</div>
        </section>
        <section id="story" className="story-section"><div className="container story-inner"><div className="story-copy"><h2>Let's hear about<br />Kayla's success story</h2><p>See how well Alivio works in a real customer’s life.</p><button className="button" onClick={() => open('journal')}>Let's get started</button></div><button className="story-preview" onClick={() => open('story')} aria-label="Open Kayla's story preview"><img src="/images/showcase.png" alt="Kayla sitting in a bright cafe" loading="lazy" /><span className="play-icon" aria-hidden="true">▷</span></button></div></section>
        <section id="product" className="container product-section"><div className="product-visual"><div className="portrait"><img src="/images/portrait.png" alt="Mikayla smiling" loading="lazy" /></div><div className="custom-card"><p>Customized For</p><span className="card-rule" /><img src="/images/portrait.png" alt="" /><small>Mikayla</small><h3>Your custom contents</h3><ul><li>Understand Your Stress</li><li>Anger Management</li></ul></div></div><div className="product-copy"><p className="eyebrow">Our product</p><h2>You tell us your stress,<br />We make your diary</h2><p>Everyone experiences it, and in different ways.<br />Let Alivio guide you, in a personalized journal experience, to overcome your stress.</p><button className="button" onClick={() => open('journal')}>Find Your Way</button></div></section>
      </main>
      <footer className="footer"><div className="container"><a className="logo" href="#">Alivio</a><nav aria-label="Footer navigation">{links.map(([title, href]) => <a href={href} key={title}>{title}</a>)}<button className="text-button" onClick={() => open('pricing')}>Pricing</button></nav></div></footer>
      <dialog ref={dialog} aria-labelledby="dialog-title" onClick={(event) => { if (event.target === dialog.current) dialog.current.close() }}>
        <button className="close-dialog" aria-label="Close dialog" onClick={() => dialog.current.close()}>✕</button>
        {modal === 'journal' && <><p className="eyebrow">A moment for yourself</p><h2 id="dialog-title">How are you feeling?</h2><p>Start with one thought. Your entry stays in this browser.</p><form onSubmit={save}><label htmlFor="entry">What is on your mind today?</label><textarea id="entry" value={note} onChange={(event) => { setNote(event.target.value); setSaved(false) }} placeholder="Today, I feel…" required rows="6" /><button className="button" type="submit">Save my entry</button><p role="status">{saved ? 'Your entry is saved in this browser.' : error}</p></form></>}
        {modal === 'story' && <><h2 id="dialog-title">Kayla's story</h2><img className="dialog-image" src="/images/showcase.png" alt="Kayla in a cafe" /><p>This is a design preview. A video was not included with the reference images.</p><button className="button" onClick={() => setModal('journal')}>Start your own journal</button></>}
        {modal === 'signin' && <><h2 id="dialog-title">Your personal space</h2><p>This demo saves journal entries on your device. Online accounts are not connected yet.</p><button className="button" onClick={() => setModal('journal')}>Open my journal</button></>}
        {modal === 'pricing' && <><h2 id="dialog-title">Try your first entry</h2><p>The local journal demo is free to explore. Subscription plans and payments are not connected.</p><button className="button" onClick={() => setModal('journal')}>Try the journal</button></>}
      </dialog>
    </>
  )
}

