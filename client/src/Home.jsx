import React from 'react'
import heroImage from './assets/hero.png'

const Home = () => {
  return (
    <main className="home-page">
      <section className="home-hero" id="home">
        <div className="home-hero-copy">
          <p className="home-eyebrow">Simple tools. Clear progress.</p>
          <h1>Build better work, one focused day at a time.</h1>
          <p className="home-hero-text">
            A calm workspace for managing people, tracking activity, and keeping your team moving forward.
          </p>
          <a className="home-button" href="#services">Explore services</a>
        </div>
        <div className="home-hero-art">
          <img src={heroImage} alt="Layered workspace platform" />
        </div>
      </section>

      <section className="home-section" id="about">
        <div className="section-heading">
          <p className="home-eyebrow">About the platform</p>
          <h2>Everything important, in one clear place.</h2>
          <p>Designed for teams that want less clutter and more confidence in the work ahead.</p>
        </div>
        <div className="about-grid">
          <article className="about-card">
            <span className="about-icon"><i className="bi bi-people"></i></span>
            <h3>Team-first</h3>
            <p>Keep people, roles, and responsibilities easy to find.</p>
          </article>
          <article className="about-card">
            <span className="about-icon"><i className="bi bi-lightning-charge"></i></span>
            <h3>Move faster</h3>
            <p>Use simple workflows that keep everyday actions lightweight.</p>
          </article>
          <article className="about-card">
            <span className="about-icon"><i className="bi bi-bar-chart"></i></span>
            <h3>See clearly</h3>
            <p>Turn activity into useful signals for better decisions.</p>
          </article>
          <article className="about-card">
            <span className="about-icon"><i className="bi bi-shield-check"></i></span>
            <h3>Stay secure</h3>
            <p>Give every account the right access and a dependable home.</p>
          </article>
        </div>
      </section>

      <section className="home-section services-section" id="services">
        <div className="section-heading">
          <p className="home-eyebrow">Services</p>
          <h2>Practical support for the work that matters.</h2>
        </div>
        <article className="service-row">
          <div className="service-image service-image-one" aria-label="People collaborating at a shared workspace"></div>
          <div className="service-copy">
            <span className="service-number">01</span>
            <h3>Organize your people</h3>
            <p>Keep employee details structured and accessible, from first registration through everyday profile management.</p>
            <a href="/register">Create an account <i className="bi bi-arrow-up-right"></i></a>
          </div>
        </article>
        <article className="service-row service-row-reverse">
          <div className="service-image service-image-two" aria-label="Dashboard showing work activity"></div>
          <div className="service-copy">
            <span className="service-number">02</span>
            <h3>Make better decisions</h3>
            <p>Bring the right information into view so your team can focus on progress instead of searching for context.</p>
            <a href="#about">Learn about the approach <i className="bi bi-arrow-up-right"></i></a>
          </div>
        </article>
      </section>

      <footer className="home-footer">
        <div>
          <strong>Suryastar</strong>
          <p>A focused workspace for growing teams.</p>
        </div>
        <p>© 2026 Suryastar. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default Home
