<template>
  <div class="min-h-screen bg-slate-950 text-white relative">
    <!-- Subtle background pattern -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Subtle dot grid pattern -->
      <div 
        class="absolute inset-0"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.4) 1px, transparent 0); background-size: 50px 50px; opacity: 0.4;"
      ></div>
      <!-- Subtle gradient orbs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
    <UHeader class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800" :toggle="false">
      <template #left>
        <img @click="scrollToTop" src="/logo.png" alt="Alex Bailon Logo" class="w-18 h-18 cursor-pointer">
      </template>
      
      <template #right>
        <nav class="hidden md:flex gap-6 items-center">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href"
            @click="handleNavClick($event, link.href)"
            class="text-slate-300 hover:text-purple-400 transition-colors text-sm font-medium cursor-pointer"
          >
            {{ link.label }}
          </a>
        </nav>
        
        <div class="flex gap-2">
          <UButton
            v-for="(social, i) in socials"
            :key="i"
            :href="social.link"
            :external="!social.link.startsWith('mailto:')"
            :target="social.link.startsWith('mailto:') ? undefined : '_blank'"
            :rel="social.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
            variant="ghost"
            color="neutral"
            :icon="social.icon"
            :aria-label="social.label"
            size="sm"
          />
        </div>
      </template>
    </UHeader>

    <main class="pt-16 min-h-screen relative z-10">
      <NuxtPage />
    </main>

    <UFooter class="bg-slate-950 border-t border-slate-800">
      <template #left>
        <span class="text-slate-400 text-sm">
          Alex Bailon &copy; {{ new Date().getFullYear() }}
        </span>
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' }
]

// Handle smooth scrolling for hash links
const handleNavClick = (e: Event, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const socials = [
  {
    icon: 'i-heroicons-envelope',
    link: 'mailto:abailon949@gmail.com',
    label: 'Email'
  },
  {
    icon: 'i-simple-icons-linkedin',
    link: 'https://www.linkedin.com/in/alex-bailon',
    label: 'LinkedIn'
  },
  {
    icon: 'i-simple-icons-github',
    link: 'https://github.com/Alex-Bailon',
    label: 'GitHub'
  }
]
</script>
