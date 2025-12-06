<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse"></div>
      
      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="flex justify-center md:justify-start">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="/AlexBailon.jpg" 
                alt="Alex Bailon"
                class="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl object-cover shadow-2xl ring-4 ring-slate-800"
                loading="eager"
              />
            </div>
          </div>
          
          <div class="text-center md:text-left space-y-6">
            <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span class="block">Hi, I'm</span>
              <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Alex Bailon
              </span>
            </h1>
            <p class="text-2xl md:text-3xl text-slate-300 font-light">
              Technical Team Lead<br />
              Senior Full Stack Developer
            </p>
            <p class="text-lg text-slate-400 max-w-xl">
              Building scalable solutions and leading high-performing teams in modern web technologies.
            </p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <UButton 
                to="#about" 
                size="xl"
                color="primary"
                variant="solid"
                class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                About Me
              </UButton>
              <UButton 
                href="/A_Bailon_Resume.pdf"
                external
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                variant="outline"
                color="neutral"
              >
                Download Resume
              </UButton>
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <UIcon name="i-heroicons-arrow-down" class="w-6 h-6 text-slate-400" />
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 px-4 scroll-mt-20">
      <div class="container mx-auto max-w-5xl">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="md:col-span-2">
            <p class="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
              {{ bio }}
            </p>
          </div>
          <div class="space-y-4">
            <UCard class="bg-slate-800/50 border border-slate-700">
              <template #header>
                <h3 class="text-xl font-semibold text-white">Quick Facts</h3>
              </template>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-slate-400 mb-1">Location</p>
                  <p class="text-white">Chicago, IL</p>
                </div>
                <div>
                  <p class="text-sm text-slate-400 mb-1">Experience</p>
                  <p class="text-white">{{ yearsOfExperience }}+ Years</p>
                </div>
                <div>
                  <p class="text-sm text-slate-400 mb-1">Status</p>
                  <p class="text-purple-400">Available for opportunities</p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-24 px-4 bg-slate-900/50 scroll-mt-20">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </span>
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard 
            v-for="(technologies, category) in techStack" 
            :key="category"
            class="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors"
          >
            <template #header>
              <h3 class="text-lg font-semibold text-white">{{ category }}</h3>
            </template>
            <ul class="space-y-2">
              <li 
                v-for="tech in technologies" 
                :key="tech"
                class="text-slate-300 text-sm flex items-start"
              >
                <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                {{ tech }}
              </li>
            </ul>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-24 px-4 scroll-mt-20">
      <div class="container mx-auto max-w-7xl">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard 
            v-for="(project, index) in projects" 
            :key="index"
            class="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
              <p class="text-slate-300 text-sm mb-4 line-clamp-3">{{ project.description }}</p>
              
              <div class="flex gap-2 flex-wrap">
                <UButton 
                  v-if="project.liveUrl && project.liveUrl !== 'private'"
                  :href="project.liveUrl"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="ghost"
                  color="primary"
                  icon="i-heroicons-arrow-top-right-on-square"
                  class="text-purple-400 hover:text-purple-300"
                >
                  Live
                </UButton>
                <UButton 
                  v-if="project.githubUrl && project.githubUrl !== 'private'"
                  :href="project.githubUrl"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="ghost"
                  color="neutral"
                  icon="i-simple-icons-github"
                >
                  Code
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
        
        <!-- Projects Disclosure -->
        <div class="mt-12 text-center">
          <p class="text-slate-500 text-sm max-w-2xl mx-auto">
            Most of my projects are proprietary and cannot be publicly linked. I'm happy to discuss these in detail during conversations.
          </p>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-24 px-4 bg-slate-900/50 scroll-mt-20">
      <div class="container mx-auto max-w-7xl">
        <h2 class="text-4xl md:text-5xl font-bold mb-16 text-center">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        
        <ExperienceTimeline :experience="experience" />
        
        <div class="text-center mt-16">
          <UButton 
            href="/A_Bailon_Resume.pdf"
            external
            target="_blank"
            rel="noopener noreferrer"
            size="xl"
            color="primary"
            variant="solid"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            icon="i-heroicons-arrow-down-tray"
          >
            Download Resume
          </UButton>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-24 px-4 scroll-mt-20">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <UCard 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors"
          >
            <div class="mb-4">
              <p class="text-slate-300 text-sm leading-relaxed line-clamp-6 italic">
                "{{ testimonial.text }}"
              </p>
            </div>
            <template #footer>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-white">{{ testimonial.name }}</p>
                  <p class="text-sm text-slate-400">{{ testimonial.role }}</p>
                </div>
                <UButton 
                  :href="testimonial.linkedin"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="ghost"
                  color="primary"
                  icon="i-simple-icons-linkedin"
                  aria-label="LinkedIn"
                  class="text-purple-400 hover:text-purple-300"
                />
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 px-4 bg-slate-900/50 scroll-mt-20">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </span>
        </h2>
        <p class="text-lg text-slate-300 mb-8">
          Interested in working together? I'd love to hear from you.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
          <UButton 
            href="mailto:abailon949@gmail.com"
            size="xl"
            variant="solid"
            color="primary"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            icon="i-heroicons-envelope"
          >
            Email Me
          </UButton>
          <div class="flex gap-4 justify-center">
            <UButton 
              href="https://www.linkedin.com/in/alex-bailon"
              external
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              variant="outline"
              color="neutral"
              icon="i-simple-icons-linkedin"
            >
              LinkedIn
            </UButton>
            <UButton 
              href="https://github.com/Alex-Bailon"
              external
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              variant="outline"
              color="neutral"
              icon="i-simple-icons-github"
            >
              GitHub
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Bio
const bio = `Senior Full Stack Developer and Technical Team Lead with extensive expertise in modern web technologies and a proven track record of delivering enterprise-level applications. I specialize in Vue.js/Nuxt and React ecosystems, with comprehensive experience in cloud infrastructure and DevOps practices.

Currently serving as a Senior Front-End Developer and Technical Team Lead at Fusion92, where I architect and implement full-stack solutions using Node.js/Express, Nuxt/Vue, MongoDB, and Microsoft Azure. I lead development teams, establish technical best practices, and drive architectural decisions that align with business objectives.

I actively integrate AI tools and workflows throughout the development process to enhance productivity, improve code quality, and streamline team workflows. This includes leveraging AI for code generation, documentation, testing strategies, and architectural decision-making.

My approach combines technical excellence with strategic thinking, focusing on delivering scalable, maintainable solutions that drive business value. I thrive in fast-paced, collaborative environments and am passionate about leveraging technology to solve complex business challenges while building high-performing development teams.`

// Tech Stack
const techStack = {
  'AI & Productivity': [
    'Jest, Cypress, Playwright',
    'AI-assisted development workflows',
    'Code generation & optimization tools',
    'AI-powered testing & documentation',
    'Workflow automation with AI'
  ],
  Frontend: [
    'Vue.js/Nuxt (Vue 3, Nuxt 3, Pinia, Vue Router)',
    'React (React, Redux, React Router)',
    'React Native',
    'TypeScript',
    'Tailwind CSS'
  ],
  'Backend & Database': [
    'Node.js/Express.js',
    '.NET',
    'PostgreSQL, MongoDB',
    'Redis'
  ],
  DevOps: [
    'Microsoft Azure, AWS',
    'OpenSRS',
    'Docker',
    'Git, GitHub Actions'
  ]
}

// Projects
const projects = [
  {
    title: 'Airbud',
    description: 'Official website for the beloved Airbud movie franchise. Built with Vue.js/Nuxt, featuring character profiles, movie summaries, and interactive elements that engage fans of the franchise.',
    image: '/airbud.webp',
    liveUrl: 'https://www.airbud.com/',
    githubUrl: null
  },
  {
    title: 'Ink-C-Tatts',
    description: 'A comprehensive tattoo artist portfolio and booking platform built with modern web technologies. Features artist profiles, portfolio galleries, and appointment scheduling functionality.',
    image: '/ink-c-tatts.webp',
    liveUrl: 'https://ink-c-tatts.netlify.app/',
    githubUrl: 'https://github.com/Alex-Bailon/ink-c-tatts'
  },
  {
    title: 'Natural Selection Tour',
    description: 'A Web3-enabled platform for the Natural Selection snowboarding tour, featuring NFT integration for exclusive rider content and digital collectibles. Built with modern blockchain technologies.',
    image: '/natural-selection-tour.webp',
    liveUrl: 'https://nft.naturalselectiontour.com/collection/naturalselectiontour',
    githubUrl: null
  },
]

// Testimonials
const testimonials = [
  {
    name: 'Nick Elliott',
    role: "Alex's Manager",
    text: "I was Alex's instructor at Northwestern's Full Stack coding bootcamp. Alex was one of the most skilled students in the class, and also one of the hardest working. He was routinely the first one in the optional office hours before class, and the last one to leave office hours after class. In fact, in the latter half of the bootcamp I brought him on to do some freelance work for the company I work for, Fusion92. He exhibited mastery of the full range of disciplines we went over in class (nodejs backend, html/css/js, React, Mongo, SQL, and deployments). He'd be a great developer to have on any team!",
    linkedin: 'https://www.linkedin.com/in/nick-elliott-0230935'
  },
  {
    name: 'Leah Ball',
    role: 'Digital Designer',
    text: "I have had the pleasure of working closely with Alex, a senior front-end developer, during my time as a digital designer at Mint Werx (parent company Fusion92). Together, we collaborated on numerous innovative website projects for our various clients. I had no prior experience with Vue and Nuxt before my time at Mint Werx, however, Alex's guidance and encouragement were invaluable in helping me grow as a developer. He was always willing to lend his expertise and support, which made the learning process much smoother. As a collaborator, Alex was incredibly reliable and trustworthy. He was instrumental in implementing the designs I created in Figma, ensuring that they were accurately reflected on the final website.",
    linkedin: 'https://www.linkedin.com/in/leahball'
  },
  {
    name: 'Chris McLaughlin',
    role: 'Northwestern Bootcamp Instructor',
    text: "I was on the educational staff at Northwestern for Alex's cohort. Alex was truly one of our stand out student developers who quickly picked up each concept and was also the first to help his teammates when they were stuck. Alex would make a great addition to any team lucky enough to have him.",
    linkedin: 'https://www.linkedin.com/in/chrismclaughlin3/'
  }
]

// Experience
const experience = [
  {
    title: 'Senior Front-End Developer & Technical Team Lead',
    company: 'Fusion92',
    location: 'Chicago, IL',
    period: 'March 2023 - Present',
    responsibilities: [
      'Lead multiple development teams in delivering enterprise-level web and mobile applications',
      'Architect and implement scalable front-end solutions using Vue.js/Nuxt and React ecosystems',
      'Establish technical standards and best practices for front-end development across teams',
      'Integrate AI tools and workflows throughout the development lifecycle to enhance productivity and code quality',
      'Drive code review processes and mentor junior developers to foster engineering excellence',
      'Collaborate with stakeholders to align technical solutions with business objectives',
      'Implement CI/CD pipelines and DevOps practices to streamline deployment processes'
    ]
  },
  {
    title: 'Senior Front-End Developer',
    company: 'Fusion92',
    location: 'Chicago, IL',
    period: 'March 2022 - March 2023',
    responsibilities: [
      'Led development of complex web and mobile applications including Web3 initiatives',
      'Implemented robust testing strategies using Cypress and Jest to ensure code quality',
      'Optimized application performance and user experience through modern front-end practices',
      'Conducted technical interviews and contributed to team growth',
      'Championed adoption of new technologies and frameworks to improve development efficiency'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Fusion92',
    location: 'Chicago, IL',
    period: 'October 2020 - March 2022',
    responsibilities: [
      'Developed full-stack applications using Node.js/Express backend and Nuxt.js/Vue.js frontend',
      'Implemented containerized deployments using Docker and automated testing with Cypress',
      'Built and maintained RESTful APIs and database integrations',
      'Collaborated with cross-functional teams to deliver high-quality solutions',
      'Contributed to technical architecture decisions and system design'
    ]
  },
  {
    title: 'Software Developer (Freelance)',
    company: 'Fusion92',
    location: 'Chicago, IL',
    period: 'May 2020 - August 2020',
    responsibilities: [
      'Developed responsive email marketing campaigns using MJML framework',
      'Implemented cross-platform email compatibility testing using Email on Acid',
      'Collaborated with design and marketing teams to exceed client expectations',
      'Optimized email templates for maximum deliverability and engagement',
      'Managed multiple concurrent projects while maintaining high quality standards'
    ]
  }
]

const yearsOfExperience = computed(() => {
  return new Date().getFullYear() - 2020
})

useHead({
  title: 'Alex Bailon | Full Stack Developer',
  meta: [
    { name: 'description', content: 'Senior Full Stack Developer and Technical Team Lead specializing in Vue.js/Nuxt and React ecosystems.' }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

