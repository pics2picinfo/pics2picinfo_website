<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ArrowRight,
  Camera,
  CircleCheck,
  Clock3,
  CloudUpload,
  Download,
  Gem,
  Heart,
  House,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Pencil,
  Phone,
  Settings,
  Star,
  Send,
  SlidersHorizontal,
  Trash2,
  Trophy,
  UsersRound,
} from '@lucide/vue'
import HomePage from './HomePage.vue'

const navItems = [
  { label: 'Home', path: 'home' }, { label: 'About', path: 'about' },
  { label: 'Services', path: 'services' },
  { label: 'Portfolio', path: 'portfolio' }, { label: 'Contact', path: 'contact' },
]

const socialLinks = [
  { label: 'Mail', url: 'mailto:pics2picinfo@gmail.com', icon: Mail },
  { label: 'WhatsApp', url: 'https://wa.me/917845078220', icon: MessageCircle },
  { label: 'Instagram', url: 'https://www.instagram.com/pics2picinfo?stkn=MWFzcTlqaWE2MHo5ZQ%3D%3D&utm_source=qr', icon: Camera },
]

const contactSteps = [
  { title: 'Upload', text: 'Send your photos through your preferred platform.', icon: CloudUpload },
  { title: 'We Edit', text: 'Our experts enhance your images with precision and care.', icon: SlidersHorizontal },
  { title: 'Quality Check', text: 'We ensure the highest quality standards.', icon: CircleCheck },
  { title: 'Receive', text: 'Get your polished images within 24 hours.', icon: Send },
]

const services = [
  { title: 'HDR IMAGE EDITING', heading: 'HDR IMAGE', accent: 'EDITING', before: '/img/services/hdr-editing-before.jpg', after: '/img/services/hdr-editing-after.jpg', text: 'We create natural and balanced HDR images that bring out the best in your property photos with clarity, color and depth.' },
  { title: 'ITEM REMOVAL', heading: 'ITEM', accent: 'REMOVAL', before: '/img/services/item-removal-before.jpg', after: '/img/services/item-removal-after.jpg', text: 'Remove unwanted objects, furniture or distractions to make your real estate images cleaner, neater and more appealing.' },
  { title: 'Day to Dusk', heading: 'Day to', accent: 'Dusk', before: '/img/services/day-to-dusk-before.jpg', after: '/img/services/day-to-dusk-after.jpg', text: 'Transform daytime photos into stunning twilight images that create a warm and inviting look for your property.' },
]

const serviceBenefits = [
  { icon: ImageIcon, title: 'REALISTIC ENHANCEMENT', text: 'Natural edits that make your images look bright, clear and true to life.' },
  { icon: Palette, title: 'COLOR CORRECTION', text: 'Balanced colors for a more natural and attractive look.' },
  { icon: Clock3, title: 'FAST DELIVERY', text: 'Quick turnaround time without compromising on quality.' },
  { icon: House, title: 'TWILIGHT / DUSK EDITING', text: 'Create beautiful evening images that highlight the mood and ambience.' },
  { icon: Trash2, title: 'ITEM REMOVAL', text: 'Remove unwanted objects, people or clutter for clean and professional results.' },
  { icon: Settings, title: 'MULTIPLE FORMATS', text: 'We deliver high-resolution images in multiple formats as per your requirement.' },
]

const portfolio = [
  ['DAY TO DUSK', 'EXTERIOR', '/img/portfolio/day-to-dusk-01.jpg'],
  ['DAY TO DUSK', 'EXTERIOR', '/img/portfolio/day-to-dusk-02.jpg'],
  ['DAY TO DUSK', 'EXTERIOR', '/img/portfolio/day-to-dusk-03.jpg'],
  ['IMAGE ENHANCEMENT', 'BEDROOM', '/img/portfolio/image-enhancement/image-enhancement-01.jpg'],
  ['IMAGE ENHANCEMENT', 'LIVING ROOM', '/img/portfolio/image-enhancement/image-enhancement-02.jpg'],
  ['IMAGE ENHANCEMENT', 'KITCHEN', '/img/portfolio/image-enhancement/image-enhancement-03.jpg'],
  ['IMAGE ENHANCEMENT', 'BATHROOM', '/img/portfolio/image-enhancement/image-enhancement-04.jpg'],
  ['IMAGE ENHANCEMENT', 'OFFICE', '/img/portfolio/image-enhancement/image-enhancement-05.jpg'],
  ['IMAGE ENHANCEMENT', 'LIVING ROOM', '/img/portfolio/image-enhancement/image-enhancement-06.jpg'],
  ['IMAGE ENHANCEMENT', 'BEDROOM', '/img/portfolio/image-enhancement/image-enhancement-07.jpg'],
  ['IMAGE ENHANCEMENT', 'BATHROOM', '/img/portfolio/image-enhancement/image-enhancement-08.jpg'],
  ['IMAGE ENHANCEMENT', 'KITCHEN', '/img/portfolio/image-enhancement/image-enhancement-09.jpg'],
  ['IMAGE ENHANCEMENT', 'LIVING ROOM', '/img/portfolio/image-enhancement/image-enhancement-10.jpg'],
  ['IMAGE ENHANCEMENT', 'OFFICE', '/img/portfolio/image-enhancement/image-enhancement-11.jpg'],
  ['IMAGE ENHANCEMENT', 'BEDROOM', '/img/portfolio/image-enhancement/image-enhancement-12.jpg'],
  ['VIRTUAL STAGING', 'LIVING ROOM', '/img/portfolio/virtual-staging-01.jpg'],
  ['VIRTUAL STAGING', 'LIVING ROOM', '/img/portfolio/virtual-staging-02.jpg'],
  ['VIRTUAL STAGING', 'KITCHEN', '/img/portfolio/virtual-staging-03.jpg'],
  ['VIRTUAL STAGING', 'BEDROOM', '/img/portfolio/virtual-staging-04.jpg'],
  ['VIRTUAL STAGING', 'BATHROOM', '/img/portfolio/virtual-staging-05.jpg'],
  ['VIRTUAL STAGING', 'OFFICE', '/img/portfolio/virtual-staging-06.jpg'],
  ['ITEM REMOVAL', 'LIVING ROOM', '/img/portfolio/item-removal/item-removal-01.jpg'],
  ['ITEM REMOVAL', 'KITCHEN', '/img/portfolio/item-removal/item-removal-02.jpg'],
  ['ITEM REMOVAL', 'BEDROOM', '/img/portfolio/item-removal/item-removal-03.jpg'],
  ['ITEM REMOVAL', 'BATHROOM', '/img/portfolio/item-removal/item-removal-04.jpg'],
  ['ITEM REMOVAL', 'OFFICE', '/img/portfolio/item-removal/item-removal-05.jpg'],
  ['ITEM REMOVAL', 'BEDROOM', '/img/portfolio/item-removal/item-removal-06.jpg'],
  ['TWILIGHT', 'EXTERIOR', '/img/portfolio/twilight/twilight-01.jpg'],
  ['TWILIGHT', 'EXTERIOR', '/img/portfolio/twilight/twilight-02.jpg'],
  ['TWILIGHT', 'EXTERIOR', '/img/portfolio/twilight/twilight-03.jpg'],
]
const categoryShowcase = [
  ['/img/categories/image-enhancement.jpg', 'IMAGE ENHANCEMENT'], ['/img/categories/virtual-staging.jpg', 'VIRTUAL STAGING'],
  ['/img/categories/item-removal.jpg', 'ITEM REMOVAL'], ['/img/categories/day-to-dusk.jpg', 'DAY TO DUSK'], ['/img/portfolio/twilight/twilight-01.jpg', 'TWILIGHT'],
]
const aboutSteps = [
  { title: 'YOU UPLOAD', text: 'Upload your photos through Dropbox, Google Drive, or WeTransfer.', icon: CloudUpload },
  { title: 'WE EDIT', text: 'Our team of photo editing experts will edit your images within 24 hours.', icon: Pencil },
  { title: '100% QUALITY & SATISFACTION', text: 'We have a dedicated quality control team to ensure the quality of the image with 100% satisfaction.', icon: Star },
  { title: 'READY', text: 'You can download the edited images from the link we send in email.', icon: Download },
]
const filters = ['All', 'Image Enhancement', 'Virtual Staging', 'Item Removal', 'Day to Dusk', 'Twilight']
const footerServices = ['Image enhancement', 'Virtual staging', 'Item removal', 'Day to dusk', 'Custom editing']
const validPaths = navItems.map((item) => item.path)
const activePath = ref('home'); const menuOpen = ref(false); const activeFilter = ref('All')
const formSent = ref(false)
const filteredPortfolio = computed(() => {
  return activeFilter.value === 'All'
    ? portfolio
    : portfolio.filter((item) => item[0] === activeFilter.value.toUpperCase())
})
function goTo(path) { activePath.value = path; menuOpen.value = false; window.history.pushState({}, '', path === 'home' ? '/' : `/${path}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }
function syncPath() {
  const hashPath = window.location.hash.replace('#/', '').replace('#', '')
  const path = hashPath || window.location.pathname.split('/').filter(Boolean).pop() || 'home'
  activePath.value = validPaths.includes(path) ? path : 'home'
  if (window.location.hash) window.history.replaceState({}, '', activePath.value === 'home' ? '/' : `/${activePath.value}`)
}
function submitForm() { formSent.value = true }
function scrollToServices() { document.getElementById('service-examples')?.scrollIntoView({ behavior: 'smooth' }) }
onMounted(() => { syncPath(); window.addEventListener('popstate', syncPath); window.addEventListener('hashchange', syncPath) })
onBeforeUnmount(() => { window.removeEventListener('popstate', syncPath); window.removeEventListener('hashchange', syncPath) })
</script>

<template>
  <div class="app-shell" :class="{ 'home-shell': activePath === 'home', 'about-shell': activePath === 'about', 'services-shell': activePath === 'services', 'portfolio-shell': activePath === 'portfolio', 'contact-shell': activePath === 'contact' }">
    <header v-if="activePath !== 'home'" class="site-header">
      <a class="home-brand" href="/" @click.prevent="goTo('home')" aria-label="Pics2Pic home">
        <span class="home-brand-icon"><Camera :size="27" :stroke-width="1.8" /></span>
        <span class="home-brand-name">PICS2PIC<small>PHOTO EDITING</small></span>
      </a>
      <button class="menu-toggle" :class="{ open: menuOpen }" type="button" aria-label="Toggle navigation" aria-controls="site-navigation" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><span></span><span></span></button>
      <nav id="site-navigation" class="home-nav" :class="{ open: menuOpen }" aria-label="Main navigation">
        <button v-for="item in navItems" :key="item.path" type="button" :class="{ active: activePath === item.path }" @click="goTo(item.path)">{{ item.label }}</button>
      </nav>
    </header>
    <main>
      <HomePage v-if="activePath === 'home'" @navigate="goTo" />
      <template v-else-if="activePath === 'about'">
        <section class="about-hero">
          <img class="about-hero-image" src="/img/about/about-editor-workspace.jpg" alt="Photo editing workspace with a desktop display and camera equipment" fetchpriority="high" decoding="async" />
          <div class="about-hero-grid">
            <div class="about-hero-copy">
              <p class="eyebrow green">ABOUT</p>
              <h1>ABOUT US<br /><span>Made with care.</span></h1>
              <p>Pics2pic is a team of photo editing specialists providing quality, excellence and satisfaction.</p>
              <div class="about-feature-list">
                <div class="about-feature"><span class="about-icon"><Gem :size="21" :stroke-width="1.7" /></span><strong>Quality<br />Editing</strong></div>
                <div class="about-feature"><span class="about-icon"><UsersRound :size="22" :stroke-width="1.7" /></span><strong>Expert<br />Team</strong></div>
                <div class="about-feature"><span class="about-icon"><Heart :size="21" :stroke-width="1.7" /></span><strong>Client<br />Satisfaction</strong></div>
              </div>
            </div>
            <div class="about-note">Turning<br />Moments into<br /><em>Masterpieces</em></div>
          </div>
        </section>

        <section class="about-process">
          <div class="about-process-inner">
            <div class="about-process-photo">
              <img src="/img/about/about-photographer-camera.jpg" alt="Photographer holding a DSLR camera outdoors" loading="lazy" decoding="async" />
            </div>
            <div class="about-process-copy">
              <p class="eyebrow green">OUR PROCESS</p>
              <h2>YOU UPLOAD.<br /><span>WE EDIT.</span></h2>
              <p class="about-process-lead">From your first upload to the final download,<br class="desktop-break" /> every step is handled with care.</p>
              <div class="process-list">
                <div v-for="(step, index) in aboutSteps" :key="step.title" class="process-item">
                  <span class="process-icon"><component :is="step.icon" :size="20" :stroke-width="1.8" /></span>
                  <span class="process-number">0{{ index + 1 }}</span>
                  <div class="process-copy">
                    <strong>{{ step.title }}</strong>
                    <p>{{ step.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="stats-strip">
          <div class="page-width stats-grid">
            <div class="stat-item"><ImageIcon class="stat-icon" :size="30" :stroke-width="2" /><div class="stat-copy"><strong>10K+</strong><small>Photos Edited</small></div></div>
            <div class="stat-item"><UsersRound class="stat-icon" :size="31" :stroke-width="2" /><div class="stat-copy"><strong>500+</strong><small>Happy Clients</small></div></div>
            <div class="stat-item"><Trophy class="stat-icon" :size="31" :stroke-width="2" /><div class="stat-copy"><strong>5+</strong><small>Years Experience</small></div></div>
            <div class="stat-item"><Star class="stat-icon" :size="31" :stroke-width="2" /><div class="stat-copy"><strong>99%</strong><small>Client Satisfaction</small></div></div>
          </div>
        </section>

        <section class="cta-banner">
          <div class="page-width cta-banner-inner">
            <p>LET'S CREATE SOMETHING AMAZING</p>
            <h2>Your Photos, <span>Our Expertise.</span></h2>
            <button class="button button-light" @click="goTo('contact')">Get in touch <ArrowRight :size="17" /></button>
          </div>
        </section>
      </template>
      <template v-else-if="activePath === 'services'">
        <section class="services-hero">
          <div class="services-hero-media"><img src="/img/services/hdr-editing.jpg" alt="Warm, professionally edited real estate bedroom" fetchpriority="high" decoding="async" /></div>
          <div class="services-hero-content page-width">
            <div class="services-hero-copy">
              <p class="eyebrow">REAL ESTATE PHOTO EDITING</p>
              <h1>Good images<br />deserve<br /><em>great editing.</em></h1>
              <p class="services-hero-description">Professional photo editing services for real estate, property and more.</p>
              <button class="services-primary-button" @click="scrollToServices">Explore services <ArrowRight :size="16" /></button>
              <div class="services-proof-list">
                <div><span>✎</span><strong>High Quality<br />Editing</strong></div>
                <div><span>◷</span><strong>Fast<br />Turnaround</strong></div>
                <div><span>✓</span><strong>100%<br />Satisfaction</strong></div>
              </div>
            </div>
          </div>
          <p class="services-hero-note">Turning<br />Spaces into<br /><em>Stunning Stories</em></p>
        </section>

        <section id="service-examples" class="services-showcase page-width">
          <article v-for="(service, index) in services" :key="service.title" class="service-example" :class="{ 'is-reversed': index === 1 }">
            <div class="service-comparison">
              <figure class="service-comparison-image">
                <img :src="service.before" :alt="`${service.title} before editing`" loading="lazy" decoding="async" />
                <figcaption>Before</figcaption>
              </figure>
              <span class="service-comparison-arrow" aria-hidden="true"><ArrowRight :size="24" /></span>
              <figure class="service-comparison-image">
                <img :src="service.after" :alt="`${service.title} after editing`" loading="lazy" decoding="async" />
                <figcaption>After</figcaption>
              </figure>
            </div>
            <div class="service-example-copy">
              <p class="eyebrow">OUR SERVICES</p>
              <h2>{{ service.heading }}<br /><em>{{ service.accent }}</em></h2>
              <p>{{ service.text }}</p>
              <button class="services-secondary-button" @click="goTo('portfolio')">Learn more <ArrowRight :size="15" /></button>
            </div>
          </article>
        </section>

        <section class="services-benefits">
          <div class="page-width">
            <p class="eyebrow">WHY CHOOSE PICS2PIC</p>
            <div class="services-benefits-grid">
              <article v-for="benefit in serviceBenefits" :key="benefit.title" class="service-benefit">
                <span class="service-benefit-icon" aria-hidden="true"><component :is="benefit.icon" :size="21" :stroke-width="1.8" /></span>
                <div><h3>{{ benefit.title }}</h3><p>{{ benefit.text }}</p></div>
              </article>
            </div>
          </div>
        </section>
      </template>
      <template v-else-if="activePath === 'portfolio'"><section class="portfolio-hero"><img class="portfolio-hero-image" src="/img/hero/portfolio-home.jpg" alt="Contemporary home surrounded by trees and greenery" fetchpriority="high" decoding="async" /><div class="portfolio-hero-shade"></div><div class="page-width portfolio-hero-content"><p class="eyebrow green">Portfolio</p><h1>Our latest <em>work.</em></h1><p>A collection of our recent property<br class="portfolio-desktop-break" /> imagery, from first space to final finish.</p></div></section><section class="portfolio-page page-width"><div class="filter-bar" aria-label="Filter portfolio by service"><button v-for="filter in filters" :key="filter" :class="{ active: activeFilter === filter }" :aria-pressed="activeFilter === filter" @click="activeFilter = filter">{{ filter }}</button></div><div class="portfolio-grid"><article v-for="(item, index) in filteredPortfolio" :key="`${item[2]}-${index}`" class="portfolio-item"><img :src="item[2]" :alt="`${item[1]} property photography`" loading="lazy" decoding="async" /></article></div></section></template>
      <template v-else-if="activePath === 'contact'"><section class="contact-page"><div class="contact-intro"><p class="eyebrow green">Contact us</p><h1>Let’s bring<br />your photos<br /><em>to life.</em></h1><p class="contact-lead">Have a property that deserves a better first impression? Share your project details and our team will help you choose the right editing finish.</p><div class="contact-details"><article class="contact-detail-card"><span class="contact-detail-icon contact-location-icon"><MapPin :size="20" :stroke-width="2" /></span><div><strong>Our location</strong><span>Coimbatore, Tamil Nadu, India</span></div></article><article class="contact-detail-card"><span class="contact-detail-icon contact-mail-icon"><Mail :size="20" :stroke-width="2" /></span><div><strong>Email</strong><a href="mailto:pics2picinfo@gmail.com">pics2picinfo@gmail.com</a><small>We usually respond within 24 hours.</small></div></article><article class="contact-detail-card"><span class="contact-detail-icon contact-phone-icon"><MessageCircle :size="20" :stroke-width="2" /></span><div><strong>WhatsApp</strong><a href="https://wa.me/917845078220" target="_blank" rel="noopener noreferrer">+91 78450 78220</a><small>Quick replies, any time.</small></div></article></div><div class="contact-follow"><span>Follow us</span><a :href="socialLinks[2].url" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Camera :size="17" /></a><a :href="socialLinks[1].url" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle :size="17" /></a><a :href="socialLinks[0].url" target="_blank" rel="noopener noreferrer" aria-label="Mail"><Mail :size="17" /></a></div></div><div class="contact-showcase"><div class="contact-showcase-image"><img src="/img/contact/contact-image.jpg" alt="Warmly illuminated home at dusk" fetchpriority="high" decoding="async" /></div><div class="contact-showcase-copy"><div class="contact-process-heading"><div><p class="eyebrow green">A simple process</p><h2>From upload<br />to <em>polished.</em></h2></div><p>Share your images through Dropbox, Google Drive or WeTransfer. We edit with care and return a clean, client-ready finish within 24 hours.</p></div><div class="contact-process-steps"><article v-for="step in contactSteps" :key="step.title"><span class="contact-step-icon"><component :is="step.icon" :size="22" :stroke-width="1.8" /></span><strong>{{ step.title }}</strong><p>{{ step.text }}</p></article></div></div></div></section></template>
    </main>
      <footer class="site-footer" :class="{ 'portfolio-footer': activePath === 'portfolio' }">
        <div class="page-width footer-grid">
          <div class="footer-brand-column">
            <a class="footer-brand" href="/" @click.prevent="goTo('home')">
              <span class="footer-brand-badge" aria-hidden="true"><span class="footer-logo-letters">P2P</span></span>
              <span class="footer-brand-copy">PICS2PIC<small>PHOTO EDITING</small></span>
            </a>
            <p>Pics2pic is a team of photo editing specialists providing quality, precision and satisfaction.</p>
            <div class="social-links footer-social-links">
              <a v-for="social in socialLinks" :key="social.label" :href="social.url" :aria-label="social.label" target="_blank" rel="noopener noreferrer"><component :is="social.icon" :size="15" /></a>
            </div>
          </div>
          <div class="footer-links">
            <p class="eyebrow">Quick links</p>
            <button v-for="item in navItems.slice(0, 6)" :key="item.path" @click="goTo(item.path)">{{ item.label }}</button>
          </div>
          <div class="footer-services">
            <p class="eyebrow">Our services</p>
            <button v-for="service in footerServices" :key="service" type="button" @click="goTo('services')">{{ service }}</button>
          </div>
          <div class="footer-contact">
            <p class="eyebrow">Connect</p>
            <p class="footer-contact-line"><MapPin :size="13" /> <span>Coimbatore, Tamil Nadu, India</span></p>
            <a class="footer-email footer-contact-line" href="mailto:pics2picinfo@gmail.com"><Mail :size="13" /> <span>pics2picinfo@gmail.com</span></a>
            <a class="footer-email footer-contact-line" href="https://wa.me/917845078220" target="_blank" rel="noopener noreferrer"><MessageCircle :size="13" /> <span>WhatsApp</span></a>
            <a class="footer-email footer-contact-line" href="https://www.instagram.com/pics2picinfo?stkn=MWFzcTlqaWE2MHo5ZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><Camera :size="13" /> <span>Instagram</span></a>
          </div>
        </div>
        <div class="page-width footer-bottom"><span>© {{ new Date().getFullYear() }} Pics2Pic Infotech. All rights reserved.</span><span>More than editing. A story.</span></div>
      </footer>
  </div>
</template>

<style scoped>
.portfolio-hero {
  isolation: isolate;
  height: clamp(220px, 30.5vw, 380px);
  overflow: hidden;
  position: relative;
}

.portfolio-shell .site-header {
  align-items: center;
  background: rgba(251, 247, 241, 0.82);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(22, 49, 45, 0.08);
  box-shadow: 0 10px 35px rgba(16, 24, 32, 0.08);
  color: #16312d;
  display: flex;
  height: 76px;
  justify-content: space-between;
  padding: 0 max(56px, calc((100vw - 1320px) / 2 + 56px));
  position: sticky;
  top: 0;
  z-index: 30;
}

.portfolio-shell .site-header .home-brand {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 9px;
}

.portfolio-shell .site-header .home-brand-icon {
  align-items: center;
  border: 1.5px solid currentColor;
  border-radius: 7px;
  color: #16312d;
  display: grid;
  height: 42px;
  justify-items: center;
  padding: 0;
  width: 45px;
}

.portfolio-shell .site-header .home-brand-name {
  color: #16312d;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.05;
}

.portfolio-shell .site-header .home-brand-name small {
  color: #697771;
  display: block;
  font-size: 8px;
  font-weight: 600;
  margin-top: 4px;
}

.portfolio-shell .site-header nav {
  align-items: center;
  display: flex;
  gap: 30px;
  margin-left: auto;
}

.portfolio-shell .site-header nav button {
  background: none;
  border: 0;
  color: #16312d;
  font-family: var(--display);
  font-size: 13px;
  font-weight: 600;
  padding: 10px 0;
  position: relative;
}

.portfolio-shell .site-header nav button::after {
  background: #ef5032;
  bottom: 2px;
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
  width: 100%;
}

.portfolio-shell .site-header nav button.active,
.portfolio-shell .site-header nav button:hover {
  color: #ef5032;
}

.portfolio-shell .site-header nav button.active::after,
.portfolio-shell .site-header nav button:hover::after {
  transform: scaleX(1);
}

.portfolio-shell .site-header .menu-toggle {
  background: none;
  border: 0;
  display: none;
  padding: 10px;
}

.portfolio-shell .site-header .menu-toggle span {
  background: #16312d;
  display: block;
  height: 2px;
  margin: 5px 0;
  width: 23px;
}

.portfolio-hero-image,
.portfolio-hero-shade {
  inset: 0;
  position: absolute;
  width: 100%;
}

.portfolio-hero-image {
  filter: brightness(1.04) contrast(1.05) saturate(1.06);
  height: 100%;
  object-position: center 56%;
}

.portfolio-hero-shade {
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, .96) 30%, rgba(255, 255, 255, .78) 46%, rgba(255, 255, 255, .3) 68%, transparent 84%);
}

.portfolio-hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-height: 0;
  padding: 0 27px;
  position: relative;
}

.portfolio-hero-content .eyebrow {
  color: #d69d34;
  font-family: var(--display);
  font-size: 8px;
  letter-spacing: 0;
  margin: 0 0 10px;
  text-transform: uppercase;
}

.portfolio-hero-content .eyebrow::before {
  background: var(--red);
  content: '';
  display: inline-block;
  height: 2px;
  margin: 0 12px 4px 0;
  width: 23px;
}

.portfolio-hero-content h1 {
  color: #142522;
  font-family: var(--serif);
  font-size: clamp(50px, 8vw, 96px);
  font-weight: 500;
  letter-spacing: 0;
  line-height: .95;
  margin: 0 0 10px;
}

.portfolio-hero-content h1 em {
  color: #ef644e;
  font-style: normal;
}

.portfolio-hero-content > p:last-child {
  color: #333d39;
  font-size: 12px;
  line-height: 1.45;
  margin: 0;
  max-width: 500px;
}

.portfolio-page {
  padding-bottom: 60px;
  padding-top: 20px;
  width: min(1240px, calc(100% - 80px));
}

.portfolio-page .filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 20px;
}

.portfolio-page .filter-bar button {
  background: #fff;
  border: 1px solid #cbd2cf;
  border-radius: 7px;
  color: #35403e;
  font-family: var(--display);
  box-shadow: 0 3px 8px rgba(17, 31, 28, .08);
  font-size: 10px;
  flex: 0 0 auto;
  min-height: 31px;
  padding: 0 16px;
  text-transform: uppercase;
  transform: none;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}

.portfolio-page .filter-bar button:hover {
  border-color: #14332e;
}

.portfolio-page .filter-bar button:focus-visible {
  outline: 2px solid #14332e;
  outline-offset: 2px;
}

.portfolio-page .filter-bar button.active {
  background: #12332e;
  border-color: #12332e;
  color: #fff;
  text-decoration: none;
}

.portfolio-page .portfolio-grid {
  display: grid;
  gap: 6px;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.portfolio-page .portfolio-item,
.portfolio-page .portfolio-item.wide,
.portfolio-page .portfolio-item.tall {
  aspect-ratio: 1.31;
  border-radius: 4px;
  box-shadow: 0 2px 7px rgba(17, 31, 28, .17);
  margin: 0;
  overflow: hidden;
}

.portfolio-page .portfolio-item img {
  height: 100%;
  transition: transform .45s ease;
  width: 100%;
}

.portfolio-page .portfolio-item:hover img {
  transform: scale(1.04);
}

.site-footer {
  background: var(--night);
  border-top: 1px solid color-mix(in srgb, var(--yellow) 24%, transparent);
  color: #fff;
  padding: 92px 0 24px;
}

.site-footer .footer-grid {
  align-items: start;
  display: grid;
  gap: clamp(30px, 4vw, 70px);
  grid-template-columns: 1.4fr 1fr 1.2fr;
}

.site-footer .footer-brand-column {
  max-width: 330px;
}

.site-footer .footer-brand-column > p,
.site-footer .footer-contact-line,
.site-footer .footer-email,
.site-footer .footer-links button,
.site-footer .footer-contact a {
  color: rgba(255,255,255,.78);
  font-size: 12px;
  line-height: 1.7;
}

.site-footer .footer-brand-column > p {
  margin: 18px 0 0;
}

.site-footer .footer-links,
.site-footer .footer-contact {
  display: grid;
  gap: 10px;
}

.site-footer .footer-links button,
.site-footer .footer-contact a,
.site-footer .footer-contact-line {
  align-items: center;
  background: none;
  border: 0;
  display: flex;
  gap: 8px;
  padding: 0;
  text-align: left;
  text-decoration: none;
}

.site-footer .eyebrow {
  color: var(--yellow);
  margin-bottom: 14px;
}

.site-footer .footer-contact-line svg,
.site-footer .footer-contact a svg,
.site-footer .footer-contact-line svg {
  flex: 0 0 auto;
  opacity: 0.9;
}

.site-footer .footer-bottom {
  align-items: center;
  border-top: 1px solid rgba(255,255,255,.14);
  color: rgba(255,255,255,.7);
  display: flex;
  font-size: 10px;
  justify-content: space-between;
  letter-spacing: 0.08em;
  margin-top: 36px;
  padding-top: 16px;
  text-transform: uppercase;
}

.site-footer button:hover,
.site-footer .footer-email:hover,
.site-footer .footer-contact a:hover {
  color: var(--yellow);
}

@media (max-width: 768px) {
  .site-footer .footer-grid {
    grid-template-columns: 1fr;
  }

  .site-footer .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 900px) {
  .portfolio-shell .site-header {
    height: 78px;
    padding: 0 24px;
  }

  .portfolio-shell .site-header nav {
    background: #fbf7f1;
    border-top: 1px solid rgba(22, 49, 45, 0.08);
    display: none;
    flex-direction: column;
    gap: 0;
    left: 0;
    margin: 0;
    padding: 18px 24px 24px;
    position: absolute;
    right: 0;
    top: 78px;
  }

  .portfolio-shell .site-header nav.open { display: flex; }
  .portfolio-shell .site-header nav button { font-size: 10px; text-align: left; }
  .portfolio-shell .site-header .menu-toggle { display: block; margin-left: auto; }
}

@media (max-width: 600px) {
  .portfolio-shell .site-header {
    padding: 0 18px;
  }

  .portfolio-shell .site-header nav {
    background: #fbf7f1;
    border-top: 1px solid rgba(22, 49, 45, 0.08);
    display: none;
    flex-direction: column;
    left: 0;
    margin: 0;
    padding: 12px 20px 18px;
    position: absolute;
    right: 0;
    top: 78px;
  }

  .portfolio-shell .site-header nav.open { display: flex; }
  .portfolio-shell .site-header nav button { font-size: 10px; text-align: left; }
  .portfolio-shell .site-header .menu-toggle { display: block; margin-left: auto; }
  .portfolio-shell .site-header .menu-toggle span { background: #f1c55c; }

  .portfolio-hero {
    height: 250px;
  }

  .portfolio-hero-image {
    object-position: 61% center;
  }

  .portfolio-hero-shade {
    background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, .9) 42%, rgba(255, 255, 255, .35) 100%);
  }

  .portfolio-hero-content { padding-left: 20px; padding-right: 20px; }
  .portfolio-hero-content h1 {
    font-size: clamp(48px, 12vw, 62px);
  }

  .portfolio-hero-content > p:last-child {
    font-size: 15px;
  }

  .portfolio-desktop-break {
    display: none;
  }

  .portfolio-page {
    padding-bottom: 40px;
    padding-top: 16px;
    width: calc(100% - 36px);
  }

  .portfolio-page .filter-bar {
    gap: 6px;
    margin-bottom: 14px;
  }

  .portfolio-page .filter-bar button {
    font-size: 9px;
    min-height: 30px;
    padding: 0 10px;
  }

  .portfolio-page .portfolio-grid {
    gap: 6px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .portfolio-footer .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .portfolio-footer .footer-focus,
  .portfolio-footer .footer-links {
    grid-column: auto;
    grid-row: auto;
  }
}
</style>