<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const navItems = [
  { label: 'Home', path: 'home' }, { label: 'About', path: 'about' },
  { label: 'Services', path: 'services' }, { label: 'Pricing', path: 'pricing' },
  { label: 'Portfolio', path: 'portfolio' }, { label: 'Contact', path: 'contact' },
]

const socialLinks = [
  { label: 'Instagram', url: 'https://www.instagram.com/pics2picinfo?stkn=MWFzcTlqaWE2MHo5ZQ%3D%3D&utm_source=qr' },
  { label: 'WhatsApp', url: 'https://wa.me/917845078220' },
]

const services = [
  { title: 'HDR IMAGE EDITING', image: '/img/services/hdr-editing.jpg', text: 'Balance interior and exterior light, recover natural detail, and create bright, realistic property images with consistent colour and contrast.' },
  { title: 'ITEM REMOVAL', image: '/img/services/item-removal.jpg', text: 'Remove unwanted furniture, appliances, or clutter, then restore walls, floors, and shadows for clean, natural property photos ready for listing.' },
  { title: 'Day to Dusk', image: '/img/services/day-to-dusk.jpg', text: 'Transform daylight exteriors into inviting twilight scenes with balanced skies, warm windows, natural evening colour, and realistic property detail.' },
]

const serviceOptions = [
  ['IMAGE ENHANCEMANT', 'Refine colour, lighting, and detail to create clean, natural-looking photos ready for real-estate listings.'],
  ['FLASH AMBIENT IMAGE EDITING', 'Blend flash and ambient exposures to balance interior lighting, preserve window detail, and deliver a natural final image.'],
  ['DAY TO DUSK', 'Transform daylight exteriors into inviting twilight scenes with balanced skies, warm windows, and realistic evening colour.'],
  ['TWLIGHT IMAGE EDITING', 'Create atmospheric exterior photos with deep twilight skies, warm interior lights, and carefully balanced property details.'],
  ['ITEM REMOVAL', 'Remove unwanted furniture, appliances, or clutter while rebuilding surfaces and shadows for a clean, believable finish.'],
  ['VIRTUAL STAGING', 'Add selected furniture and decor to empty rooms while preserving scale, lighting, and natural perspective.'],
]

const portfolio = [
  ['DAY TO DUSK COLLECTION', 'DAY TO DUSK', '/img/portfolio/day-to-dusk/day-to-dusk-01.jpg'],
  ['DAY TO DUSK COLLECTION', 'DAY TO DUSK', '/img/portfolio/day-to-dusk/day-to-dusk-02.jpg'],
  ['DAY TO DUSK COLLECTION', 'DAY TO DUSK', '/img/portfolio/day-to-dusk/day-to-dusk-03.jpg'],
  ['VIRTUAL STAGING COLLECTION', 'VIRTUAL STAGING', '/img/portfolio/virtual-staging-01.jpg'],
  ['VIRTUAL STAGING COLLECTION', 'VIRTUAL STAGING', '/img/portfolio/virtual-staging-02.jpg'],
  ['VIRTUAL STAGING COLLECTION', 'VIRTUAL STAGING', '/img/portfolio/virtual-staging-03.jpg'],
  ['VIRTUAL STAGING COLLECTION', 'VIRTUAL STAGING', '/img/portfolio/virtual-staging-04.jpg'],
  ['VIRTUAL STAGING COLLECTION', 'VIRTUAL STAGING', '/img/portfolio/virtual-staging-05.jpg'],
  ['VIRTUAL STAGING COLLECTION', 'VIRTUAL STAGING', '/img/portfolio/virtual-staging-06.jpg'],
  ['ITEM REMOVAL COLLECTION', 'ITEM REMOVAL', '/img/portfolio/item-removal/item-removal-01.jpg'],
  ['ITEM REMOVAL COLLECTION', 'ITEM REMOVAL', '/img/portfolio/item-removal/item-removal-02.jpg'],
  ['ITEM REMOVAL COLLECTION', 'ITEM REMOVAL', '/img/portfolio/item-removal/item-removal-03.jpg'],
  ['ITEM REMOVAL COLLECTION', 'ITEM REMOVAL', '/img/portfolio/item-removal/item-removal-04.jpg'],
  ['ITEM REMOVAL COLLECTION', 'ITEM REMOVAL', '/img/portfolio/item-removal/item-removal-05.jpg'],
  ['ITEM REMOVAL COLLECTION', 'ITEM REMOVAL', '/img/portfolio/item-removal/item-removal-06.jpg'],
  ['TWILIGHT COLLECTION', 'TWILIGHT', '/img/portfolio/twilight/twilight-01.jpg'],
  ['TWILIGHT COLLECTION', 'TWILIGHT', '/img/portfolio/twilight/twilight-02.jpg'],
  ['TWILIGHT COLLECTION', 'TWILIGHT', '/img/portfolio/twilight/twilight-03.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-01.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-02.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-03.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-04.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-05.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-06.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-07.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-08.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-09.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-10.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-11.jpg'],
  ['IMAGE ENHANCEMENT COLLECTION', 'IMAGE ENHANCEMENT', '/img/portfolio/image-enhancement/image-enhancement-12.jpg'],
]
const categoryShowcase = [
  ['/img/categories/image-enhancement.jpg', 'IMAGE ENHANCEMENT'], ['/img/categories/virtual-staging.jpg', 'VIRTUAL STAGING'],
  ['/img/categories/item-removal.jpg', 'ITEM REMOVAL'], ['/img/categories/day-to-dusk.jpg', 'DAY TO DUSK'], ['/img/portfolio/twilight/twilight-01.jpg', 'TWILIGHT'],
]
const pricing = [
  ['$99', '1 hour', 'Basic'], ['$199', '2 hour', 'Standard'], ['$299', '3 hour', 'Extended'], ['$399', '5 hour', 'Ultimate'],
]
const faq = ['Filming and Editing', 'Engagement photography', 'Comercial photography', 'Social media photography', 'Event Photography', 'personal photography']
const aboutSteps = [
  ['YOU UPLOAD', 'Upload your photos through Dropbox, Google drive or Wetransfer.'],
  ['WE EDIT', 'Our team of photo editing experts will edit your images within 24 hours.'],
  ['100% QUALITIY & SATISFACTION', 'We have a dedicated quality control team to ensure the quality of the image with 100% satisfaction.'],
  ['READY', 'You can download the edited images form the link we send in email.'],
]
const filters = ['All', 'IMAGE ENHANCEMENT', 'VIRTUAL STAGING', 'ITEM REMOVAL', 'DAY TO DUSK', 'TWILIGHT']
const validPaths = navItems.map((item) => item.path)
const activePath = ref('home'); const menuOpen = ref(false); const activeFilter = ref('All')
const heroIndex = ref(0); const formSent = ref(false); let heroTimer
const heroSlides = [
  { eyebrow: 'PICS2PIC INFOTECH', title: 'Real estate photos, refined.', text: 'Professional editing that helps every property make a stronger first impression.', image: '/img/hero/hero-01.jpg' },
  { eyebrow: 'PICS2PIC INFOTECH', title: 'Spaces worth showing.', text: 'Thoughtful retouching, natural color and polished detail for property professionals.', image: '/img/hero/hero-02.jpg' },
  { eyebrow: 'PICS2PIC INFOTECH', title: 'Twilight, made inviting.', text: 'Warm, atmospheric finishes that help every exterior stand out.', image: '/img/hero/hero-03.jpg' },
  { eyebrow: 'PICS2PIC INFOTECH', title: 'Details worth noticing.', text: 'Bright, balanced imagery that brings the character of every home forward.', image: '/img/hero/hero-04.jpg' },
  { eyebrow: 'PICS2PIC INFOTECH', title: 'A better first impression.', text: 'Polished property photography for listings that deserve to be seen.', image: '/img/hero/hero-05.jpg' },
  { eyebrow: 'PICS2PIC INFOTECH', title: 'Light in every room.', text: 'Clean, natural image enhancement for spaces that feel ready to live in.', image: '/img/hero/hero-06.jpg' },
  { eyebrow: 'PICS2PIC INFOTECH', title: 'Make space feel like home.', text: 'Careful editing that lets the architecture and atmosphere speak clearly.', image: '/img/hero/hero-07.jpg' },
]
const currentHero = computed(() => heroSlides[heroIndex.value])
const filteredPortfolio = computed(() => activeFilter.value === 'All' ? portfolio : portfolio.filter((item) => item[1] === activeFilter.value))
function goTo(path) { activePath.value = path; menuOpen.value = false; window.history.pushState({}, '', path === 'home' ? '/' : `/${path}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }
function syncPath() {
  const hashPath = window.location.hash.replace('#/', '').replace('#', '')
  const path = hashPath || window.location.pathname.split('/').filter(Boolean).pop() || 'home'
  activePath.value = validPaths.includes(path) ? path : 'home'
  if (window.location.hash) window.history.replaceState({}, '', activePath.value === 'home' ? '/' : `/${activePath.value}`)
}
function submitForm() { formSent.value = true }
function preloadNextHeroImage() {
  if (activePath.value !== 'home') return
  const image = new Image()
  image.decoding = 'async'
  image.fetchPriority = 'low'
  image.src = heroSlides[(heroIndex.value + 1) % heroSlides.length].image
}
onMounted(() => { syncPath(); preloadNextHeroImage(); window.addEventListener('popstate', syncPath); window.addEventListener('hashchange', syncPath); heroTimer = window.setInterval(() => { heroIndex.value = (heroIndex.value + 1) % heroSlides.length; preloadNextHeroImage() }, 6500) })
onBeforeUnmount(() => { window.removeEventListener('popstate', syncPath); window.removeEventListener('hashchange', syncPath); window.clearInterval(heroTimer) })
</script>

<template>
  <div class="app-shell">
    <header class="site-header"><a class="brand" href="/" @click.prevent="goTo('home')" aria-label="Pics2Pic home"><span class="brand-mark">P<span>2</span>P</span><span class="brand-copy">Pics2Pic <small>Infotech</small></span></a><button class="menu-toggle" :class="{ open: menuOpen }" aria-label="Toggle navigation" @click="menuOpen = !menuOpen"><span></span><span></span></button><nav :class="{ open: menuOpen }"><button v-for="item in navItems" :key="item.path" :class="{ active: activePath === item.path }" @click="goTo(item.path)">{{ item.label }}</button></nav></header>
    <main>
      <section v-if="activePath === 'home'" class="hero" :class="`hero-slide-${heroIndex + 1}`"><img :key="currentHero.image" class="hero-media" :src="currentHero.image" :alt="currentHero.title" width="1600" height="900" fetchpriority="high" decoding="async" /><div class="hero-content page-width"><p class="eyebrow">{{ currentHero.eyebrow }}</p><h1>{{ currentHero.title }}</h1><p class="hero-copy">{{ currentHero.text }}</p><div class="hero-actions"><button class="button button-light" @click="goTo('contact')">Contact us <span>↗</span></button><button class="text-link" @click="goTo('portfolio')">Our latest works <span>↗</span></button></div></div><div class="hero-meta"><span>0{{ heroIndex + 1 }}</span><i></i><span>0{{ heroSlides.length }}</span><span class="hero-location">Coimbatore, Tamil Nadu, India</span></div></section>
      <template v-if="activePath === 'home'"><section class="intro page-width section-pad"><div><p class="eyebrow green">ABOUT US</p><h2>Small edits.<br /><em>Big feeling.</em></h2></div><div class="intro-copy"><p>Pics2Pic is a team of photo-editing specialists providing quality, precision and satisfaction.</p><button class="arrow-link" @click="goTo('about')">Read about us <span>↗</span></button></div></section><section class="service-band"><div class="page-width"><div class="section-heading"><div><p class="eyebrow green">What we do</p><h2>Polished from<br /><em>every angle.</em></h2></div><button class="arrow-link dark" @click="goTo('services')">All services <span>↗</span></button></div><div class="service-grid"><article v-for="(service, index) in services" :key="service.title" class="service-card"><div class="service-image"><img :src="service.image" :alt="service.title" loading="lazy" decoding="async" /><span>0{{ index + 1 }}</span></div><h3>{{ service.title }}</h3><p>{{ service.text }}</p></article></div></div></section><section class="category-strip section-pad"><div class="page-width"><div class="section-heading"><div><p class="eyebrow green">We do the following</p><h2>Find your <em>finish.</em></h2></div><p class="heading-note">Real-estate photo editing services shaped around the way your listings need to look.</p></div><div class="category-row"><article v-for="(item, index) in categoryShowcase" :key="item[0]" class="category-card"><img :src="item[0]" :alt="item[1]" loading="lazy" decoding="async" /><div><span>0{{ index + 1 }}</span><h3>{{ item[1] }}</h3></div></article></div></div></section><section class="statement"><div class="page-width"><p class="eyebrow">A better first impression</p><h2>Want to edit<br />your <em>photos?</em></h2><p class="statement-copy">Professional editors, careful retouching and a finish your clients can trust.</p><button class="button button-green" @click="goTo('contact')">Contact us <span>↗</span></button></div></section></template>
      <template v-else-if="activePath === 'about'"><section class="page-hero page-width"><p class="eyebrow green">About</p><h1>ABOUT US<br /><em>Made with care.</em></h1><p>Pics2pic is a team of photo editing specialists to providing quality, excellence and satisfaction.</p></section><section class="about-layout page-width"><img src="/img/about/about-image.jpg" alt="About Pics2Pic" loading="lazy" decoding="async" /><div><p class="eyebrow green">Our process</p><h2>YOU UPLOAD.<br /><em>WE EDIT.</em></h2><p>From your first upload to the final download, every step is handled with care.</p><div class="process-list"><div v-for="(step, index) in aboutSteps" :key="step[0]"><span>0{{ index + 1 }}</span><strong>{{ step[0] }}</strong><p>{{ step[1] }}</p></div></div></div></section></template>
      <template v-else-if="activePath === 'services'"><section class="page-hero page-width"><p class="eyebrow green">Services</p><h1>Good images deserve<br /><em>great editing.</em></h1><p>Professional photo editing services for real-estate photographers.</p></section><section class="service-page-grid page-width"><article v-for="service in services" :key="service.title" class="service-card large"><div class="service-image"><img :src="service.image" :alt="service.title" loading="lazy" decoding="async" /></div><div><h2>{{ service.title }}</h2><p>{{ service.text }}</p></div></article></section><section class="options-band"><div class="page-width"><p class="eyebrow green">More ways we help</p><div class="options-grid"><article v-for="(option, index) in serviceOptions" :key="option[0]"><span>0{{ index + 1 }}</span><h3>{{ option[0] }}</h3><p>{{ option[1] }}</p></article></div></div></section></template>
      <template v-else-if="activePath === 'pricing'"><section class="page-hero page-width pricing-hero"><p class="eyebrow green">Pricing</p><h1>Clear work.<br /><em>Honest rates.</em></h1><p>Choose a focused editing package for your next property set. Every plan is shaped for a clean, client-ready finish.</p></section><section class="pricing-grid page-width"><article v-for="(plan, index) in pricing" :key="plan[2]" class="price-card" :class="{ featured: index === 1 }"><span class="plan-index">0{{ index + 1 }}</span><span v-if="index === 1" class="plan-badge">Most popular</span><div class="price">{{ plan[0] }} <small>{{ plan[1] }}</small></div><h2>{{ plan[2] }}</h2><p class="plan-summary">A simple package for property imagery that needs to look its best.</p><ul><li>up to 30 photos</li><li>natural color correction</li><li>consistent final finish</li><li>24-hour turnaround</li></ul><button class="button button-green" @click="goTo('contact')">Get appointment <span>↗</span></button></article></section><section class="faq page-width"><p class="eyebrow green">Frequently asked questions</p><div class="faq-grid"><article v-for="(item, index) in faq" :key="item"><span>0{{ index + 1 }}</span><h3>{{ item }}</h3><p>Tell us what you are shooting, how many images you have and the finish you want. We will guide you to the right editing package.</p></article></div></section></template>
      <template v-else-if="activePath === 'portfolio'"><section class="page-hero page-width compact"><p class="eyebrow green">Portfolio</p><h1>Our latest <em>work.</em></h1><p>One collection of edited property imagery, from first pass to final finish.</p></section><section class="portfolio-page page-width"><div class="filter-bar"><button v-for="filter in filters" :key="filter" :class="{ active: activeFilter === filter }" @click="activeFilter = filter">{{ filter }}</button></div><div class="portfolio-grid"><article v-for="(item, index) in filteredPortfolio" :key="`${item[2]}-${index}`" class="portfolio-item" :class="index % 4 === 0 ? 'wide' : index % 4 === 1 ? 'tall' : ''"><img :src="item[2]" :alt="`${item[1]} ${item[0]}`" loading="lazy" decoding="async" /><div><span>{{ item[1] }}</span><h3>{{ item[0] }}</h3></div></article></div></section></template>
      <template v-else-if="activePath === 'contact'"><section class="contact-page page-width"><div class="contact-intro"><p class="eyebrow green">Contact</p><h1>Get in<br /><em>touch.</em></h1><p class="contact-lead">Have a property that deserves a better first impression? Send us your project details and our team will help you choose the right editing finish.</p><div class="contact-details"><strong>Address</strong><span>Coimbatore, Tamil Nadu, India</span><strong>Phone</strong><div class="contact-phone-links"><a href="tel:+917845078220">+91 78450 78220</a></div><strong>Email</strong><a href="mailto:pics2picinfo@gmail.com">pics2picinfo@gmail.com</a></div></div><div class="contact-showcase"><div class="contact-showcase-image"><img src="/img/contact/contact-image.jpg" alt="Polished real estate exterior" loading="lazy" decoding="async" /></div><div class="contact-showcase-copy"><p class="eyebrow green">A simple process</p><h2>From upload <em>to polished.</em></h2><p>Share your images through Dropbox, Google Drive or WeTransfer. We edit with care and return a clean, client-ready finish within 24 hours.</p><button class="button button-green" @click="goTo('portfolio')">See our work <span>↗</span></button></div></div></section></template>
    </main>
      <footer class="site-footer"><div class="page-width footer-grid"><div class="footer-brand-column"><a class="brand footer-brand" href="/" @click.prevent="goTo('home')"><img src="/img/brand/logo.png" alt="Pics2Pic logo" loading="lazy" decoding="async" /></a><p>Pics2pic is a team of photo editing specialists providing quality, precision and satisfaction.</p><div class="social-links" aria-label="Social media links"><a v-for="social in socialLinks" :key="social.label" :href="social.url" target="_blank" rel="noopener noreferrer">{{ social.label }} <span>↗</span></a></div></div><div class="footer-focus"><p class="eyebrow">Editing focus</p><ul class="footer-list"><li>Image enhancement</li><li>Virtual staging</li><li>Item removal</li><li>Day to dusk</li><li>Twilight</li></ul></div><div><p class="eyebrow">Quick links</p><button v-for="item in navItems.slice(0, 6)" :key="item.path" @click="goTo(item.path)">{{ item.label }}</button></div><div><p class="eyebrow">Contact</p><p>Coimbatore, Tamil Nadu, India</p><a class="footer-email" href="mailto:pics2picinfo@gmail.com">pics2picinfo@gmail.com ↗</a><a class="footer-email" href="tel:+917845078220">+91 78450 78220</a></div></div><div class="page-width footer-bottom"><span>© 2025 Pics2Pic Infotech</span><span>Made for spaces with a story.</span></div></footer>
  </div>
</template>