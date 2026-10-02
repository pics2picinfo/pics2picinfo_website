<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crop,
  Eraser,
  House,
  Image,
  Sofa,
  Star,
  Sun,
  UsersRound,
} from '@lucide/vue'

const emit = defineEmits(['navigate'])
const menuOpen = ref(false)
const projectPage = ref(0)
const heroGallery = ref(null)
const heroSlide = ref(0)
const trustGallery = ref(null)
const trustSlide = ref(0)
let heroAutoplay
let trustAutoplay

const navItems = [
  { label: 'Home', path: 'home' },
  { label: 'About', path: 'about' },
  { label: 'Services', path: 'services' },
  { label: 'Portfolio', path: 'portfolio' },
  { label: 'Contact', path: 'contact' },
]

const benefits = [
  { title: 'Natural Enhancement', text: 'Brighter, clearer and true to life.', icon: Sun },
  { title: 'Advanced editing', text: 'Colour correction and object removal.', icon: Crop },
  { title: 'Real-estate specialists', text: 'Images that sell the space.', icon: House },
  { title: 'Quick turnaround', text: 'Reliable, on-time delivery.', icon: Clock3 },
]

const projects = [
  { type: 'BEDROOM', title: 'Modern comfort', text: 'Bright, warm and inviting spaces.', image: '/img/categories/reference-bedroom.jpg' },
  { type: 'KITCHEN', title: 'Stylish & Clean', text: 'Well balanced colours and details.', image: '/img/categories/reference-kitchen.jpg' },
  { type: 'EXTERIOR', title: 'Day to Dusk', text: 'A striking evening presentation.', image: '/img/portfolio/day-to-dusk/day-to-dusk-01.jpg' },
  { type: 'VIRTUAL STAGING', title: 'Room to imagine', text: 'Thoughtful styling for empty spaces.', image: '/img/portfolio/virtual-staging-03.jpg' },
  { type: 'TWILIGHT', title: 'Evening presence', text: 'Warm windows and a balanced sky.', image: '/img/portfolio/twilight/twilight-01.jpg' },
  { type: 'IMAGE ENHANCEMENT', title: 'A clearer picture', text: 'True colour and carefully refined detail.', image: '/img/portfolio/image-enhancement/image-enhancement-01.jpg' },
  { type: 'ITEM REMOVAL', title: 'Clear the space', text: 'A clean finish with natural detail.', image: '/img/portfolio/item-removal/item-removal-01.jpg' },
  { type: 'DAY TO DUSK', title: 'Golden hour', text: 'Warm light and balanced exteriors.', image: '/img/portfolio/day-to-dusk/day-to-dusk-02.jpg' },
  { type: 'IMAGE ENHANCEMENT', title: 'A brighter welcome', text: 'Careful colour, light and clarity.', image: '/img/portfolio/image-enhancement/image-enhancement-02.jpg' },
  { type: 'VIRTUAL STAGING', title: 'Room to settle in', text: 'A natural sense of home.', image: '/img/portfolio/virtual-staging-05.jpg' },
  { type: 'TWILIGHT', title: 'After the sun sets', text: 'A softly lit evening finish.', image: '/img/portfolio/twilight/twilight-02.jpg' },
  { type: 'ITEM REMOVAL', title: 'Details restored', text: 'Unwanted distractions, carefully removed.', image: '/img/portfolio/item-removal/item-removal-02.jpg' },
]

const heroImages = [
  { src: '/img/hero/hero-01.jpg', alt: 'A beautifully enhanced interior' },
  { src: '/img/hero/hero-02.jpg', alt: 'A bright and welcoming home' },
  { src: '/img/hero/hero-03.jpg', alt: 'A thoughtfully styled living space' },
  { src: '/img/hero/hero-04.jpg', alt: 'A polished property interior' },
  { src: '/img/hero/hero-05.jpg', alt: 'A warm and inviting room' },
]

const visibleProjects = computed(() => projects.slice(projectPage.value * 3, projectPage.value * 3 + 3))
const projectPages = Math.ceil(projects.length / 3)

const services = [
  { title: 'Image enhancement', text: 'Brighter, sharper and more vibrant.', image: '/img/services/home-image-enhancement.jpg', icon: Image, path: 'IMAGE ENHANCEMENT' },
  { title: 'Virtual staging', text: 'Furnish empty spaces beautifully.', image: '/img/services/home-virtual-staging.jpg', icon: Sofa, path: 'VIRTUAL STAGING' },
  { title: 'Item removal', text: 'Remove unwanted objects cleanly.', image: '/img/services/home-item-removal.jpg', icon: Eraser, path: 'ITEM REMOVAL' },
  { title: 'Day to dusk', text: 'Transform daylight into evening.', image: '/img/services/home-day-to-dusk.jpg', icon: Sun, path: 'DAY TO DUSK' },
  { title: 'Twilight', text: 'Warm lighting for a striking evening exterior.', image: '/img/services/home-twilight.jpg', icon: Clock3, path: 'TWILIGHT' },
]

const highlights = [
  { id: 'natural-edits', title: 'Natural, true-to-life edits', text: 'Balanced light and color keep each room looking clear and authentic.', icon: Sun },
  { id: 'virtual-staging', title: 'Spaces with possibility', text: 'Thoughtful furnishings help buyers picture how an empty room could feel.', icon: Sofa },
  { id: 'item-removal', title: 'Clearer compositions', text: 'Remove distracting objects while preserving realistic textures and details.', icon: Eraser },
  { id: 'day-to-dusk', title: 'Warm evening exteriors', text: 'Turn daylight property photos into inviting dusk scenes.', icon: House },
  { id: 'reliable-delivery', title: 'Reliable turnaround', text: 'Consistent delivery helps keep property listings moving on schedule.', icon: Clock3 },
  { id: 'listing-ready', title: 'Listing-ready images', text: 'Polished, high-resolution photos are ready to share across your listings.', icon: Image },
]

function navigate(path) {
  menuOpen.value = false
  emit('navigate', path)
}

function changeProjectPage(direction) {
  projectPage.value = (projectPage.value + direction + projectPages) % projectPages
}

function updateHeroSlide() {
  const gallery = heroGallery.value
  if (gallery) heroSlide.value = Math.round(gallery.scrollLeft / gallery.clientWidth)
}

function scrollHero(direction) {
  const nextSlide = (heroSlide.value + direction + heroImages.length) % heroImages.length
  heroGallery.value?.scrollTo({ left: nextSlide * heroGallery.value.clientWidth, behavior: 'smooth' })
}

function selectHeroSlide(index) {
  heroGallery.value?.scrollTo({ left: index * heroGallery.value.clientWidth, behavior: 'smooth' })
}

function getTrustMetrics() {
  const gallery = trustGallery.value
  const card = gallery?.querySelector('.home-trust-card')
  if (!gallery || !card) return null
  const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 0
  const step = card.getBoundingClientRect().width + gap
  const visibleCount = Math.max(1, Math.round((gallery.clientWidth + gap) / step))
  return { gallery, step, maxIndex: Math.max(0, highlights.length - visibleCount) }
}

function updateTrustSlide() {
  const metrics = getTrustMetrics()
  if (metrics) trustSlide.value = Math.min(metrics.maxIndex, Math.round(metrics.gallery.scrollLeft / metrics.step))
}

function selectTrustSlide(index) {
  const metrics = getTrustMetrics()
  if (!metrics) return
  const nextSlide = Math.max(0, Math.min(index, metrics.maxIndex))
  metrics.gallery.scrollTo({ left: nextSlide * metrics.step, behavior: 'smooth' })
}

function changeTrustSlide(direction) {
  const metrics = getTrustMetrics()
  if (!metrics || metrics.maxIndex === 0) return
  const currentSlide = Math.min(trustSlide.value, metrics.maxIndex)
  const nextSlide = (currentSlide + direction + metrics.maxIndex + 1) % (metrics.maxIndex + 1)
  selectTrustSlide(nextSlide)
}

function advanceTrustSlide() {
  changeTrustSlide(1)
}

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroAutoplay = window.setInterval(() => {
      if (!document.hidden) scrollHero(1)
    }, 6000)
    trustAutoplay = window.setInterval(() => {
      if (!document.hidden) advanceTrustSlide()
    }, 6000)
  }
})

onBeforeUnmount(() => {
  window.clearInterval(heroAutoplay)
  window.clearInterval(trustAutoplay)
})
</script>

<template>
  <div class="home-page">
    <header class="home-header">
      <a class="home-brand" href="/" aria-label="Pics2Pic home" @click.prevent="navigate('home')">
        <span class="home-brand-icon"><Camera :size="27" :stroke-width="1.8" /></span>
        <span class="home-brand-name">PICS2PIC<small>PHOTO EDITING</small></span>
      </a>
      <button class="home-menu-toggle" type="button" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen">
        <span></span><span></span>
      </button>
      <nav class="home-nav" :class="{ open: menuOpen }" aria-label="Main navigation">
        <button v-for="item in navItems" :key="item.path" type="button" :class="{ active: item.path === 'home' }" @click="navigate(item.path)">{{ item.label }}</button>
      </nav>
    </header>

    <div class="home-main">
      <section class="home-hero">
        <div ref="heroGallery" class="home-hero-gallery" aria-label="Featured home images" @scroll="updateHeroSlide">
          <img v-for="(image, index) in heroImages" :key="image.src" class="home-hero-image" :src="image.src" :alt="image.alt" :fetchpriority="index === 0 ? 'high' : 'auto'" decoding="async" />
        </div>
        <div class="home-hero-shade"></div>
        <div class="home-hero-inner">
          <div class="home-hero-copy">
            <p class="home-kicker">Professional photo editing</p>
            <h1>Light in<br /><em>every room.</em></h1>
            <p class="home-hero-description">Clean, realistic image enhancement for spaces that feel like home.</p>
            <div class="home-hero-actions">
              <button class="home-button home-button-warm" type="button" @click="navigate('services')">Get started <ArrowRight :size="16" /></button>
              <button class="home-button home-button-outline" type="button" @click="navigate('portfolio')">View our work</button>
            </div>
            <div class="home-hero-proof" aria-label="Our approach">
              <div><Camera :size="21" /><span><strong>500+</strong><small>Photos edited</small></span></div>
              <div><UsersRound :size="21" /><span><strong>100+</strong><small>Happy clients</small></span></div>
              <div><Star :size="21" /><span><strong>5★</strong><small>Average rating</small></span></div>
            </div>
          </div>
        </div>
        <div class="home-hero-pagination" aria-label="Choose featured image">
          <button v-for="(image, index) in heroImages" :key="image.src" type="button" :class="{ active: heroSlide === index }" :aria-label="`Show image ${index + 1}`" :aria-current="heroSlide === index ? 'true' : undefined" @click="selectHeroSlide(index)"></button>
        </div>
      </section>

      <section class="home-benefits" aria-labelledby="home-benefits-title">
        <div class="home-content home-benefits-layout">
          <div class="home-benefits-intro">
            <p class="home-kicker">Why choose us</p>
            <h2 id="home-benefits-title">Small edits.<br /><em>Big feeling.</em></h2>
            <p>We enhance your property photos to bring out the true beauty of every space. From lighting and colours to fine details, we help your images make a lasting impression.</p>
            <button class="home-button home-button-dark" type="button" @click="navigate('about')">Learn more <ArrowRight :size="16" /></button>
          </div>
          <div class="home-benefit-list">
            <article v-for="benefit in benefits" :key="benefit.title" class="home-benefit">
              <span class="home-benefit-icon"><component :is="benefit.icon" :size="28" :stroke-width="1.7" /></span>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="home-projects" aria-labelledby="home-projects-title">
        <div class="home-content">
          <div class="home-section-heading home-section-heading-dark">
            <div><p class="home-kicker">Featured projects</p><h2 id="home-projects-title">Polished from<br /><em>every angle.</em></h2></div>
            <div class="home-project-controls">
              <p>Explore recent edits and see how we bring out the best in every space.</p>
              <div>
                <button type="button" aria-label="Previous projects" @click="changeProjectPage(-1)"><ChevronLeft :size="19" /></button>
                <button type="button" aria-label="Next projects" @click="changeProjectPage(1)"><ChevronRight :size="19" /></button>
              </div>
            </div>
          </div>
          <div class="home-project-grid" aria-live="polite">
            <article v-for="project in visibleProjects" :key="project.title" class="home-project-card">
              <img :src="project.image" :alt="project.title" loading="lazy" decoding="async" />
              <div class="home-project-copy">
                <p>{{ project.type }}</p>
                <h3>{{ project.title }}</h3>
                <span>{{ project.text }}</span>
                <button type="button" :aria-label="`View ${project.title} in portfolio`" @click="navigate('portfolio')"><ArrowUpRight :size="17" /></button>
              </div>
            </article>
          </div>
          <div class="home-project-dots" aria-label="Project pages">
            <button v-for="page in projectPages" :key="page" type="button" :class="{ active: projectPage === page - 1 }" :aria-label="`Show project page ${page}`" @click="projectPage = page - 1"></button>
          </div>
        </div>
      </section>

      <section class="home-services" aria-labelledby="home-services-title">
        <div class="home-content">
          <div class="home-section-heading">
            <div><p class="home-kicker">Our services</p><h2 id="home-services-title">Find your <em>finish.</em></h2></div>
            <p class="home-section-description">A complete range of photo editing services designed for property professionals.</p>
          </div>
          <div class="home-service-grid">
            <button v-for="service in services" :key="service.title" class="home-service-card" type="button" @click="navigate('portfolio')">
              <span class="home-service-photo"><img :src="service.image" :alt="''" loading="lazy" decoding="async" /><span class="home-service-icon"><component :is="service.icon" :size="21" /></span></span>
              <span class="home-service-copy"><strong>{{ service.title }}</strong><small>{{ service.text }}</small></span>
              <span class="home-service-arrow"><ArrowUpRight :size="16" /></span>
            </button>
          </div>
        </div>
      </section>

      <section class="home-cta">
        <div class="home-cta-copy">
          <p class="home-kicker">Let’s create</p>
          <h2>Want to edit<br />your photos?</h2>
          <p>Professional editors, careful retouching and a finish your clients can trust.</p>
          <button class="home-button home-button-light" type="button" @click="navigate('contact')">Contact us <ArrowRight :size="16" /></button>
        </div>
        <div class="home-cta-photo"><img src="/img/hero/reference-cta-room.jpg" alt="Warm daylight across a thoughtfully styled home" loading="lazy" decoding="async" /></div>
      </section>

      <section class="home-trust" aria-labelledby="home-highlights-title">
        <div class="home-content home-trust-layout">
          <div class="home-trust-intro">
            <p class="home-kicker">Our approach</p>
            <h2 id="home-highlights-title">What you can <em>expect.</em></h2>
            <p class="home-trust-description">Careful property photo editing, from the first color adjustment to the final listing image.</p>
          </div>
          <div class="home-trust-carousel">
          <div ref="trustGallery" class="home-trust-gallery" aria-label="Photo editing benefits" @scroll="updateTrustSlide">
            <article v-for="highlight in highlights" :key="highlight.id" class="home-trust-card">
              <span class="home-highlight-icon"><component :is="highlight.icon" :size="25" :stroke-width="1.7" /></span>
              <h3>{{ highlight.title }}</h3>
              <p>{{ highlight.text }}</p>
            </article>
          </div>
          <div class="home-trust-arrows" aria-label="Benefit controls">
            <button type="button" aria-label="Previous benefits" @click="changeTrustSlide(-1)"><ChevronLeft :size="21" /></button>
            <button type="button" aria-label="Next benefits" @click="changeTrustSlide(1)"><ChevronRight :size="21" /></button>
          </div>
          </div>
        </div>
      </section>
    </div>

    <footer v-if="false" class="site-footer">
      <div class="page-width footer-grid">
        <div class="footer-brand-column">
          <a class="footer-brand" href="/" aria-label="Pics2Pic home" @click.prevent="navigate('home')">
            <span class="footer-brand-badge" aria-hidden="true"><span class="footer-logo-letters">P2P</span></span>
            <span class="footer-brand-copy">PICS2PIC<small>PHOTO EDITING</small></span>
          </a>
          <p>Professional photo editing for real estate, interiors and property professionals.</p>
          <div class="social-links footer-social-links">
            <a href="mailto:pics2picinfo@gmail.com" aria-label="Mail"><Mail :size="15" /></a>
            <a href="https://wa.me/917845078220" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircle :size="15" /></a>
            <a href="https://www.instagram.com/pics2picinfo?stkn=MWFzcTlqaWE2MHo5ZQ%3D%3D&utm_source=qr" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Image :size="15" /></a>
          </div>
        </div>
        <div class="footer-links">
          <p class="eyebrow">Quick links</p>
          <button v-for="item in navItems" :key="item.path" type="button" @click="navigate(item.path)">{{ item.label }}</button>
        </div>
        <div class="footer-services">
          <p class="eyebrow">Our services</p>
          <button type="button" @click="navigate('services')">Image enhancement</button>
          <button type="button" @click="navigate('services')">Virtual staging</button>
          <button type="button" @click="navigate('services')">Item removal</button>
          <button type="button" @click="navigate('services')">Day to dusk</button>
          <button type="button" @click="navigate('services')">Custom editing</button>
        </div>
        <div class="footer-contact">
          <p class="eyebrow">Connect</p>
          <p class="footer-contact-line"><MapPin :size="13" /> <span>Coimbatore, Tamil Nadu, India</span></p>
          <a class="footer-email footer-contact-line" href="mailto:pics2picinfo@gmail.com"><Mail :size="13" /> <span>pics2picinfo@gmail.com</span></a>
          <a class="footer-email footer-contact-line" href="https://wa.me/917845078220" target="_blank" rel="noopener noreferrer"><MessageCircle :size="13" /> <span>WhatsApp</span></a>
          <a class="footer-email footer-contact-line" href="https://www.instagram.com/pics2picinfo?stkn=MWFzcTlqaWE2MHo5ZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><Image :size="13" /> <span>Instagram</span></a>
        </div>
      </div>
      <div class="page-width footer-bottom"><span>© 2026 Pics2Pic Infotech. All rights reserved.</span><span>More than editing. A story.</span></div>
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  --home-ink: #16312d;
  --home-muted: #697771;
  --home-paper: #fbf7f1;
  --home-soft: #f3eee7;
  --home-green: #0d3b32;
  --home-coral: #ef5032;
  --home-gold: #f0bf62;
  background: var(--home-paper);
  color: var(--home-ink);
  font-family: var(--display), 'Instrument Sans', sans-serif;
  letter-spacing: 0;
  overflow: hidden;
}

.home-page *, .home-page *::before, .home-page *::after { box-sizing: border-box; }
.home-page .sr-only { clip: rect(0, 0, 0, 0); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; white-space: nowrap; width: 1px; }
.home-page button, .home-page a { font: inherit; letter-spacing: 0; }
.home-page button { cursor: pointer; }
.home-page a { color: inherit; text-decoration: none; }
.home-page img { display: block; height: 100%; max-width: 100%; object-fit: cover; width: 100%; }
.home-content { margin: 0 auto; max-width: 1320px; padding-left: 56px; padding-right: 56px; width: 100%; }

.home-header {
  align-items: center;
  background: rgba(251, 247, 241, .82);
  backdrop-filter: blur(16px);
  display: flex;
  height: 76px;
  justify-content: space-between;
  left: 0;
  padding: 0 max(56px, calc((100vw - 1320px) / 2 + 56px));
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
}
.home-brand { align-items: center; display: inline-flex; flex: 0 0 auto; gap: 9px; }
.home-brand-icon { align-items: center; border: 1.5px solid currentColor; border-radius: 7px; display: grid; height: 42px; justify-items: center; width: 45px; }
.home-brand-name { font-size: 14px; font-weight: 800; line-height: 1.05; }
.home-brand-name small { display: block; font-size: 8px; font-weight: 600; margin-top: 4px; }
.home-nav { align-items: center; display: flex; gap: 30px; }
.home-nav > button { background: none; border: 0; color: var(--home-ink); font-size: 13px; font-weight: 600; padding: 10px 0; position: relative; }
.home-nav > button::after { background: var(--home-coral); bottom: 2px; content: ''; height: 2px; left: 0; position: absolute; transform: scaleX(0); transform-origin: left; transition: transform .2s ease; width: 100%; }
.home-nav > button.active, .home-nav > button:hover { color: var(--home-coral); }
.home-nav > button.active::after, .home-nav > button:hover::after { transform: scaleX(1); }
.home-menu-toggle { background: none; border: 0; display: none; padding: 10px; }
.home-menu-toggle span { background: var(--home-ink); display: block; height: 2px; margin: 5px 0; width: 23px; }

.home-hero { align-items: center; display: flex; min-height: 690px; overflow: hidden; padding: 112px 56px 44px; position: relative; }
.home-hero-gallery { display: flex; inset: 0; overflow-x: auto; overscroll-behavior-x: contain; position: absolute; scrollbar-width: none; scroll-snap-type: x mandatory; z-index: 0; }
.home-hero-gallery::-webkit-scrollbar { display: none; }
.home-hero-image { flex: 0 0 100%; height: 100%; object-position: center 55%; scroll-snap-align: start; }
.home-hero-shade { inset: 0; position: absolute; z-index: 1; background: linear-gradient(90deg, var(--home-paper) 0%, var(--home-paper) 71%, rgba(251, 247, 241, .68) 87%, rgba(251, 247, 241, 0) 100%); clip-path: ellipse(52% 112% at 0% 50%); }
.home-hero-inner { align-items: end; display: flex; justify-content: space-between; margin: 0 auto; max-width: 1208px; position: relative; width: 100%; z-index: 2; }
.home-hero-copy { max-width: 580px; padding-bottom: 5px; width: 53%; }
.home-kicker { color: var(--home-coral); font-size: 10px; font-weight: 700; line-height: 1.4; margin: 0 0 19px; text-transform: uppercase; }
.home-hero-copy > .home-kicker { color: #a25d42; }
.home-page h1, .home-page h2 { font-family: var(--serif), 'Newsreader', Georgia, serif; font-weight: 500; letter-spacing: 0; }
.home-page h1 { font-size: 76px; line-height: .91; margin: 0; }
.home-page h1 em { color: var(--home-coral); font-style: normal; }
.home-page h2 em { color: var(--home-coral); font-style: normal; }
.home-hero-description { color: #3e4c48; font-size: 17px; line-height: 1.5; margin: 19px 0 23px; max-width: 385px; }
.home-hero-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 14px; }
.home-button { align-items: center; border: 1px solid transparent; border-radius: 10px; display: inline-flex; font-size: 13px; font-weight: 650; gap: 11px; justify-content: center; min-height: 46px; padding: 0 20px; transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .2s ease; }
.home-button:hover { transform: translateY(-2px); }
.home-button-warm { background: var(--home-coral); color: white; }
.home-button-warm:hover { background: #c74731; }
.home-button-outline { background: rgba(255, 255, 255, .35); border-color: var(--home-coral); color: #a93f2d; }
.home-button-outline:hover { background: white; }
.home-hero-proof { align-items: center; display: flex; gap: 26px; margin-top: 30px; }
.home-hero-proof > div { align-items: center; color: var(--home-coral); display: flex; gap: 9px; }
.home-hero-proof span { display: grid; gap: 3px; }
.home-hero-proof strong { color: var(--home-ink); font-size: 18px; line-height: 1; }
.home-hero-proof > div:not(:first-child) { border-left: 1px solid rgba(22, 49, 45, .15); padding-left: 15px; }
.home-hero-proof small { color: var(--home-muted); font-size: 10px; }
.home-hero-pagination { bottom: 22px; display: flex; gap: 8px; left: max(56px, calc((100vw - 1208px) / 2)); position: absolute; }
.home-hero-pagination button { background: rgba(22, 49, 45, .3); border: 1px solid rgba(22, 49, 45, .24); border-radius: 50%; height: 12px; padding: 0; width: 12px; }
.home-hero-pagination button.active { background: var(--home-gold); }
.home-benefits { background: var(--home-paper); border-bottom: 1px solid rgba(22, 49, 45, .08); padding: 27px 0 31px; }
.home-benefits-layout { align-items: center; display: grid; gap: 38px; grid-template-columns: minmax(260px, .95fr) 1.6fr; }
.home-section-heading .home-kicker { margin-bottom: 13px; }
.home-page h2 { font-size: 48px; line-height: .98; margin: 0; }
.home-about { background: var(--home-paper); }
.home-about-layout { align-items: stretch; display: grid; grid-template-columns: .88fr 1.12fr; max-width: 1320px; }
.home-about-copy { align-self: center; max-width: 480px; padding: 58px 38px 58px 0; }
.home-about-copy > p:not(.home-kicker) { color: #4e5b57; font-size: 14px; line-height: 1.65; margin: 16px 0 19px; max-width: 420px; }
.home-about-image { min-height: 360px; overflow: hidden; position: relative; }
.home-about-image > img { border-radius: 260px 0 0 260px; min-height: 360px; object-position: center; }
.home-about-image > span { color: var(--home-ink); font-family: var(--serif), Georgia, serif; font-size: 18px; font-weight: 600; left: 10%; line-height: 1.3; position: absolute; top: 43%; }
.home-button-dark { background: var(--home-green); color: white; }
.home-button-dark:hover { background: #165244; }
.home-benefit-list { align-items: center; display: grid; gap: 16px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.home-benefit { min-width: 0; text-align: center; }
.home-benefit-icon { align-items: center; background: #fff0df; border-radius: 12px; color: var(--home-coral); display: flex; height: 60px; justify-content: center; margin: 0 auto 10px; width: 60px; }
.home-benefit h3 { font-size: 13px; line-height: 1.3; margin: 0 auto 7px; max-width: 150px; }
.home-benefit p { color: var(--home-muted); font-size: 11px; line-height: 1.5; margin: 0 auto; max-width: 145px; }

.home-projects { background: var(--home-green); color: white; overflow: hidden; padding: 62px 0 35px; position: relative; }
.home-projects::after { background: radial-gradient(ellipse at 72% 10%, rgba(45, 109, 87, .24), transparent 55%); content: ''; inset: 0; pointer-events: none; position: absolute; }
.home-projects > .home-content { position: relative; z-index: 1; }
.home-section-heading { align-items: end; display: flex; justify-content: space-between; margin-bottom: 24px; }
.home-section-heading-dark .home-kicker { color: var(--home-gold); }
.home-section-heading-dark h2 { color: white; }
.home-section-heading-dark h2 em { color: var(--home-gold); }
.home-project-controls { align-items: end; display: flex; gap: 30px; justify-content: space-between; max-width: 460px; }
.home-project-controls > p { color: rgba(255,255,255,.8); font-size: 12px; line-height: 1.55; margin: 0; max-width: 280px; }
.home-project-controls > div { display: flex; gap: 10px; }
.home-project-controls button { align-items: center; background: transparent; border: 1px solid rgba(255,255,255,.42); border-radius: 50%; color: white; display: flex; height: 40px; justify-content: center; transition: background .2s ease; width: 40px; }
.home-project-controls button:hover { background: rgba(255,255,255,.16); }
.home-project-grid { display: grid; gap: 15px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.home-project-card { background: white; border-radius: 10px; color: var(--home-ink); min-width: 0; overflow: hidden; }
.home-project-card > img { aspect-ratio: 1.48; height: auto; transition: transform .4s ease; }
.home-project-card:hover > img { transform: scale(1.03); }
.home-project-copy { min-height: 91px; padding: 13px 45px 14px 16px; position: relative; }
.home-project-copy > p { color: #aa664c; font-size: 9px; font-weight: 700; margin: 0 0 4px; }
.home-project-copy h3 { font-size: 14px; margin: 0 0 3px; }
.home-project-copy > span { color: var(--home-muted); font-size: 10px; }
.home-project-copy > button { align-items: center; background: transparent; border: 1px solid #e68b6f; border-radius: 50%; color: var(--home-coral); display: flex; height: 31px; justify-content: center; position: absolute; right: 13px; top: 25px; width: 31px; }
.home-project-dots { display: flex; gap: 7px; justify-content: center; margin-top: 20px; }
.home-project-dots button { background: rgba(255,255,255,.36); border: 0; border-radius: 50%; height: 7px; padding: 0; width: 7px; }
.home-project-dots button.active { background: var(--home-gold); }

.home-services { background: #fffdfa; padding: 62px 0 70px; }
.home-section-description { color: var(--home-muted); font-size: 13px; line-height: 1.6; margin: 0 0 5px; max-width: 320px; }
.home-service-grid { display: grid; gap: 12px; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.home-service-card { background: #f8f3ec; border: 0; border-radius: 9px; color: var(--home-ink); min-width: 0; overflow: hidden; padding: 0 0 15px; position: relative; text-align: center; }
.home-service-photo { display: block; height: 143px; position: relative; }
.home-service-photo > img { transition: transform .4s ease; }
.home-service-card:hover .home-service-photo > img { transform: scale(1.04); }
.home-service-icon { align-items: center; background: white; border-radius: 10px; bottom: -13px; color: var(--home-ink); display: flex; height: 36px; justify-content: center; left: calc(50% - 18px); position: absolute; width: 36px; }
.home-service-copy { display: grid; gap: 5px; padding: 21px 10px 0; }
.home-service-copy strong { font-size: 12px; line-height: 1.3; }
.home-service-copy small { color: var(--home-muted); font-size: 10px; line-height: 1.4; }
.home-service-arrow { align-items: center; background: white; border: 1px solid #e7a18a; border-radius: 50%; color: var(--home-coral); display: none; height: 28px; justify-content: center; margin: 10px auto 0; width: 28px; }
.home-service-card:hover .home-service-arrow { display: flex; }

.home-cta { background: var(--home-coral); color: white; display: grid; grid-template-columns: 1fr 1fr; min-height: 330px; overflow: hidden; position: relative; }
.home-cta-copy { align-self: center; justify-self: end; max-width: 660px; padding: 48px 64px 48px 56px; width: 100%; }
.home-cta-copy .home-kicker { color: #ffe1a7; }
.home-cta-copy h2 { color: white; font-size: 50px; }
.home-cta-copy > p:not(.home-kicker) { color: rgba(255,255,255,.92); font-size: 13px; line-height: 1.6; margin: 14px 0 18px; max-width: 390px; }
.home-button-light { background: #fffdfa; color: var(--home-coral); }
.home-button-light:hover { background: #ffe9d9; }
.home-cta-photo { clip-path: ellipse(100% 120% at 100% 50%); height: 100%; min-height: 330px; overflow: hidden; }
.home-cta-photo > img { object-position: center 55%; }

.home-trust { background: var(--home-paper); padding: 76px 0 82px; }
.home-trust-layout { align-items: center; display: grid; gap: 34px; grid-template-columns: minmax(250px, .75fr) minmax(0, 1.7fr); }
.home-trust-intro .home-kicker { margin-bottom: 13px; }
.home-trust-intro h2 { font-size: clamp(38px, 4vw, 58px); line-height: 1.02; }
.home-trust-intro h2 em { color: #d4944f; }
.home-trust-description { color: var(--home-muted); font-size: 15px; line-height: 1.6; margin: 21px 0 0; max-width: 390px; }
.home-trust-carousel { min-width: 0; position: relative; }
.home-trust-gallery { display: grid; gap: 14px; grid-auto-columns: calc((100% - 28px) / 3); grid-auto-flow: column; min-width: 0; overflow-x: auto; overscroll-behavior-x: contain; scrollbar-width: none; scroll-snap-type: x mandatory; }
.home-trust-gallery::-webkit-scrollbar { display: none; }
.home-trust-card { background: #fffdfa; border: 1px solid rgba(22, 49, 45, .08); border-radius: 10px; display: flex; flex-direction: column; min-height: 300px; padding: 22px 20px; scroll-snap-align: start; }
.home-highlight-icon { align-items: center; background: #fff0e9; border-radius: 50%; color: var(--home-coral); display: flex; height: 52px; justify-content: center; margin-bottom: 23px; width: 52px; }
.home-trust-card h3 { color: var(--home-ink); font-size: 16px; line-height: 1.35; margin: 0 0 10px; }
.home-trust-card > p { color: #394843; font-size: 14px; line-height: 1.6; margin: 0; }
.home-trust-arrows { display: flex; inset: 0 -19px; justify-content: space-between; pointer-events: none; position: absolute; }
.home-trust-arrows button { align-items: center; align-self: center; background: #fff; border: 0; border-radius: 50%; box-shadow: 0 3px 15px rgba(22, 49, 45, .08); color: var(--home-green); display: flex; height: 42px; justify-content: center; padding: 0; pointer-events: auto; width: 42px; }
.home-trust-arrows button:hover { background: #fff0e9; }

.site-footer {
  background: var(--night);
  border-top: 1px solid color-mix(in srgb, var(--yellow) 24%, transparent);
  color: white;
  padding: 100px 0 28px;
}

.home-hero, .home-benefits, .home-about, .home-projects, .home-cta, .home-trust, .home-footer { isolation: isolate; }
.home-benefits > .home-content, .home-about > .home-content, .home-trust > .home-content { position: relative; z-index: 2; }
.home-hero::before, .home-benefits::before, .home-about::before, .home-projects::before, .home-cta::before, .home-trust::before, .home-footer::before, .home-footer::after {
  background: url('/img/brand/botanical-corner.webp') center / contain no-repeat;
  content: '';
  height: 300px;
  left: -45px;
  filter: grayscale(1) sepia(.25) saturate(.4) brightness(1.2);
  mix-blend-mode: multiply;
  opacity: .12;
  pointer-events: none;
  position: absolute;
  width: 190px;
  z-index: 1;
}
.home-hero::before { bottom: 0; height: 270px; left: -95px; opacity: .14; }
.home-benefits, .home-about, .home-trust { overflow: hidden; position: relative; }
.home-benefits::before { bottom: -28px; height: 190px; left: -110px; opacity: .12; }
.home-about::before { height: 330px; top: 0; }
.home-projects::before { bottom: -42px; filter: grayscale(1) invert(.82) sepia(.24); left: -92px; mix-blend-mode: screen; opacity: .14; }
.home-projects::after { z-index: 0; }
.home-projects > .home-content { z-index: 2; }
.home-cta::before { bottom: -50px; filter: grayscale(1) invert(.82) sepia(.24); height: 250px; left: -70px; mix-blend-mode: screen; opacity: .18; }
.home-cta > * { position: relative; z-index: 2; }
.home-trust::before { bottom: -52px; height: 220px; left: -110px; opacity: .12; }
.home-footer { isolation: isolate; overflow: hidden; position: relative; }
.home-footer::before { bottom: -40px; filter: grayscale(1) invert(.82) sepia(.24); height: 290px; left: auto; mix-blend-mode: screen; opacity: .13; right: -35px; }
.home-footer::after { bottom: -40px; filter: grayscale(1) invert(.82) sepia(.24); height: 290px; left: -35px; mix-blend-mode: screen; opacity: .13; transform: scaleX(-1); }
.home-footer > .home-content { position: relative; z-index: 2; }
.home-hero-inner { position: relative; z-index: 2; }
.home-hero-pagination { z-index: 2; }

@media (max-width: 900px) {
  .home-content { padding-left: 32px; padding-right: 32px; }
  .home-header { height: 54px; padding: 0 32px; }
  .home-brand-icon { height: 34px; width: 37px; }
  .home-brand-name { font-size: 12px; }
  .home-nav { gap: 19px; }
  .home-nav > button { font-size: 11px; }
  .home-nav .home-nav-quote { margin-left: 3px; }
  .home-hero { min-height: 390px; padding: 74px 32px 30px; }
  .home-hero-image { object-position: center 55%; }
  .home-hero-copy { width: 55%; }
  .home-page h1 { font-size: 52px; }
  .home-hero-description { font-size: 12px; line-height: 1.4; margin: 12px 0 14px; max-width: 300px; }
  .home-hero-actions { gap: 10px; }
  .home-button { border-radius: 8px; font-size: 10px; min-height: 34px; padding: 0 14px; }
  .home-hero-proof { gap: 10px; margin-top: 18px; }
  .home-hero-proof > div { gap: 5px; }
  .home-hero-proof > div > svg { height: 18px; width: 18px; }
  .home-hero-proof strong { font-size: 14px; }
  .home-hero-proof small { font-size: 8px; }
  .home-hero-pagination { bottom: 13px; left: 32px; }
  .home-benefits { padding: 15px 0 19px; }
  .home-benefits-layout { align-items: center; gap: 20px; grid-template-columns: minmax(200px, .92fr) 1.55fr; }
  .home-benefits-intro .home-kicker { font-size: 8px; margin-bottom: 8px; }
  .home-benefits-intro h2 { font-size: 38px; }
  .home-benefits-intro > p:not(.home-kicker) { font-size: 11px; line-height: 1.45; margin: 10px 0 12px; }
  .home-benefits-intro .home-button { min-height: 32px; }
  .home-benefit-list { gap: 8px; }
  .home-benefit-icon { height: 50px; margin-bottom: 8px; width: 50px; }
  .home-benefit h3 { font-size: 11px; margin-bottom: 5px; }
  .home-benefit p { font-size: 9px; }
  .home-projects { padding: 20px 0 14px; }
  .home-section-heading { margin-bottom: 16px; }
  .home-projects h2, .home-services h2 { font-size: 31px; }
  .home-project-controls { gap: 14px; max-width: 400px; }
  .home-project-controls > p { font-size: 10px; max-width: 230px; }
  .home-project-controls button { height: 34px; width: 34px; }
  .home-project-grid { gap: 10px; }
  .home-project-card > img { aspect-ratio: 1.9; }
  .home-project-copy { min-height: 72px; padding: 8px 38px 8px 11px; }
  .home-project-copy > p { font-size: 8px; margin-bottom: 2px; }
  .home-project-copy h3 { font-size: 13px; margin-bottom: 1px; }
  .home-project-copy > span { font-size: 9px; }
  .home-project-copy > button { height: 27px; right: 9px; top: 21px; width: 27px; }
  .home-project-dots { margin-top: 12px; }
  .home-services { padding: 24px 0 26px; }
  .home-service-grid { gap: 10px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .home-service-card:nth-child(n+4) { display: block; }
  .home-service-card { padding-bottom: 11px; }
  .home-service-photo { height: 112px; }
  .home-service-copy { padding: 17px 8px 0; }
  .home-service-copy strong { font-size: 11px; }
  .home-service-copy small { font-size: 9px; }
  .home-cta { min-height: 186px; }
  .home-cta-copy { padding: 14px 30px 14px 32px; }
  .home-cta-copy .home-kicker { font-size: 8px; margin-bottom: 6px; }
  .home-cta-copy h2 { font-size: 29px; }
  .home-cta-copy > p:not(.home-kicker) { font-size: 9px; line-height: 1.4; margin: 6px 0 8px; }
  .home-cta-photo { height: 186px; min-height: 0; }
  .home-trust { padding: 34px 0 38px; }
  .home-trust-layout { gap: 22px; grid-template-columns: minmax(190px, .7fr) minmax(0, 1.3fr); }
  .home-trust-intro { grid-column: auto; }
  .home-trust-intro h2 { font-size: 34px; }
  .home-trust-description { font-size: 11px; margin-top: 12px; }
  .home-trust-gallery { grid-auto-columns: calc((100% - 14px) / 2); }
  .home-trust-card { min-height: 270px; padding: 16px; }
  .home-highlight-icon { height: 44px; margin-bottom: 16px; width: 44px; }
  .home-trust-card h3 { font-size: 13px; }
  .home-trust-card > p { font-size: 11px; line-height: 1.5; }
  .home-trust-arrows { inset: 0 -13px; }
  .home-trust-arrows button { height: 34px; width: 34px; }
  .home-footer { padding-top: 26px; }
  .home-footer-grid { gap: 18px; grid-template-columns: 1.35fr .8fr 1fr 1.2fr; padding-bottom: 20px; }
  .home-footer h3 { font-size: 10px; margin-bottom: 10px; }
  .home-footer-brand > p, .home-footer-grid > div:last-child > p { font-size: 9px; margin: 10px 0; }
  .home-footer-grid > div:not(:first-child) > button, .home-footer-grid > div:last-child > a { font-size: 8px; margin-bottom: 7px; }
}

@media (max-width: 620px) {
  .home-content { padding-left: 21px; padding-right: 21px; }
  .home-header { height: 66px; padding: 0 20px; }
  .home-brand-icon { height: 37px; width: 39px; }
  .home-brand-name { font-size: 12px; }
  .home-menu-toggle { display: block; }
  .home-nav { align-items: stretch; background: #fffdfa; box-shadow: 0 15px 30px rgba(20,35,30,.12); display: none; flex-direction: column; gap: 3px; left: 0; padding: 12px 21px 20px; position: absolute; right: 0; top: 66px; }
  .home-nav.open { display: flex; }
  .home-nav > button { padding: 11px 0; text-align: left; }
  .home-nav > button:not(.home-nav-quote)::after { display: none; }
  .home-nav .home-nav-quote { justify-content: center; margin: 8px 0 0; padding: 12px 18px; }
  .home-hero { align-items: end; min-height: 730px; padding: 110px 21px 53px; }
  .home-hero-image { object-position: 58% center; }
  .home-hero-shade { background: linear-gradient(0deg, rgba(251,247,241,.99) 0%, rgba(251,247,241,.96) 42%, rgba(251,247,241,.54) 67%, rgba(251,247,241,.08) 100%); clip-path: none; }
  .home-hero-inner { align-items: end; min-height: 100%; }
  .home-hero-copy { max-width: 100%; width: 100%; }
  .home-page h1 { font-size: 54px; }
  .home-hero-description { font-size: 15px; max-width: 300px; }
  .home-hero-proof { flex-wrap: wrap; gap: 14px 18px; margin-top: 23px; }
  .home-hero-proof > div { gap: 6px; }
  .home-hero-proof > div > svg { height: 18px; width: 18px; }
  .home-hero-proof strong { font-size: 10px; }
  .home-hero-proof small { font-size: 9px; }
  .home-hero-pagination { bottom: 18px; left: 21px; }
  .home-benefits { padding: 50px 0; }
  .home-benefits-layout { gap: 32px; grid-template-columns: minmax(0, 1fr); }
  .home-about-layout { grid-template-columns: minmax(0, 1fr); }
  .home-about-copy { max-width: 430px; padding: 44px 0 32px; }
  .home-about-image { min-height: 280px; }
  .home-about-image > img { border-radius: 150px 0 0 0; min-height: 280px; }
  .home-page h2 { font-size: 40px; }
  .home-benefit-list { gap: 20px 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-benefit-icon { height: 58px; width: 58px; }
  .home-benefit h3 { font-size: 12px; }
  .home-benefit p { font-size: 10px; }
  .home-projects { padding: 48px 0 29px; }
  .home-section-heading { align-items: start; flex-direction: column; gap: 16px; margin-bottom: 20px; }
  .home-project-controls { align-items: center; max-width: none; width: 100%; }
  .home-project-controls > p { max-width: 230px; }
  .home-project-controls button { height: 36px; width: 36px; }
  .home-project-grid { gap: 12px; grid-template-columns: 1fr; }
  .home-project-card:nth-child(n+2) { display: none; }
  .home-project-card > img { aspect-ratio: 1.5; }
  .home-project-dots { margin-top: 15px; }
  .home-services { padding: 48px 0 50px; }
  .home-section-description { max-width: 370px; }
  .home-service-grid { gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-service-card:nth-child(n+4) { display: block; }
  .home-service-card:last-child { grid-column: 1 / -1; justify-self: center; width: calc((100% - 10px) / 2); }
  .home-service-photo { height: 125px; }
  .home-service-copy strong { font-size: 11px; }
  .home-service-copy small { font-size: 9px; }
  .home-cta { grid-template-columns: 1fr; }
  .home-cta-copy { justify-self: stretch; padding: 43px 22px 35px; }
  .home-cta-copy h2 { font-size: 42px; }
  .home-cta-photo { clip-path: none; height: 235px; min-height: 0; }
  .home-trust { padding: 46px 0; }
  .home-trust-layout { gap: 16px; grid-template-columns: minmax(0, 1fr); }
  .home-trust-intro { grid-column: auto; margin-bottom: 8px; }
  .home-trust-gallery { grid-auto-columns: 100%; }
  .home-trust-intro h2 { font-size: 34px; }
  .home-trust-description { font-size: 13px; margin-top: 13px; }
  .home-trust-card { min-height: 260px; padding: 20px; }
  .home-trust-card h3 { font-size: 16px; }
  .home-trust-card > p { font-size: 14px; }
  .home-trust-arrows { gap: 10px; inset: auto; justify-content: flex-end; margin-top: 13px; pointer-events: auto; position: static; }
  .home-trust-arrows button { height: 38px; width: 38px; }
  .home-footer { padding-top: 36px; }
  .home-footer-grid { gap: 30px 18px; grid-template-columns: 1fr 1fr; padding-bottom: 28px; }
  .home-footer-brand { grid-column: 1 / -1; }
  .home-footer h3 { font-size: 11px; }
  .home-footer-grid > div:not(:first-child) > button, .home-footer-grid > div:last-child > a { font-size: 10px; }
  .home-footer-bottom { align-items: start; flex-direction: column; gap: 6px; }
}

@media (prefers-reduced-motion: reduce) {
  .home-page *, .home-page *::before, .home-page *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
</style>
