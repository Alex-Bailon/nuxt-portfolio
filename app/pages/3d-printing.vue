<template>
  <div class="min-h-screen py-24 px-4 relative">
    <!-- Hero Section with 3D Background -->
    <section class="container mx-auto max-w-6xl mb-16 relative pt-24">
      <div class="relative z-10 text-center space-y-6">
        <h1 class="text-5xl md:text-7xl font-bold">
          <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            3D Models & Printing
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
          Exploring the intersection of digital design and physical creation through 3D modeling and printing
        </p>
      </div>
      <!-- 3D Scene Background - Fixed in hero section -->
      <div class="fixed top-0 left-0 right-0 h-[600px] -z-10 opacity-30 pointer-events-none">
        <ClientOnly>
          <ThreeScene :stl-path="stlPath" />
          <template #fallback>
            <div class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-cube" class="w-32 h-32 text-slate-700 animate-pulse" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- About Section -->
    <section class="container mx-auto max-w-5xl mb-24 relative z-10">
      <UCard class="bg-slate-800/50 border border-slate-700">
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-slate-300 leading-relaxed">
            {{ description }}
          </p>
        </div>
      </UCard>
    </section>

    <!-- Gallery Section -->
    <section class="container mx-auto max-w-7xl">
      <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">
        <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          My Creations
        </span>
      </h2>
      
      <div v-if="models.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UCard 
          v-for="(model, index) in models" 
          :key="index"
          class="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-3"
        >
          <div class="relative h-64 overflow-hidden bg-slate-900">
            <img 
              v-if="model.image"
              :src="model.image" 
              :alt="model.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-cube" class="w-20 h-20 text-slate-600" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <h3 class="text-xl font-semibold text-white mb-1">{{ model.title }}</h3>
              <p v-if="model.category" class="text-sm text-purple-400">{{ model.category }}</p>
            </div>
          </div>
          
          <div class="p-6">
            <p v-if="model.description" class="text-slate-300 text-sm mb-4 line-clamp-3">
              {{ model.description }}
            </p>
            
            <div v-if="model.technologies && model.technologies.length > 0" class="flex flex-wrap gap-2 mb-4">
              <UBadge 
                v-for="(tech, techIndex) in model.technologies" 
                :key="techIndex"
                color="primary"
                variant="subtle"
                size="sm"
              >
                {{ tech }}
              </UBadge>
            </div>
            
            <div class="flex gap-2 flex-wrap">
              <UButton 
                v-if="model.stlUrl"
                :href="model.stlUrl"
                external
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="ghost"
                color="primary"
                icon="i-heroicons-arrow-down-tray"
                class="text-purple-400 hover:text-purple-300"
              >
                Download STL
              </UButton>
              <UButton 
                v-if="model.thingiverseUrl"
                :href="model.thingiverseUrl"
                external
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="ghost"
                color="neutral"
                icon="i-simple-icons-thingiverse"
              >
                Thingiverse
              </UButton>
              <UButton 
                v-if="model.printablesUrl"
                :href="model.printablesUrl"
                external
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="ghost"
                color="neutral"
                icon="i-simple-icons-printables"
              >
                Printables
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
      
      <div v-else class="text-center py-16">
        <UIcon name="i-heroicons-cube" class="w-24 h-24 text-slate-600 mx-auto mb-4" />
        <p class="text-slate-400 text-lg">No models added yet. Check back soon!</p>
      </div>
    </section>

    <!-- Stats Section -->
    <section v-if="stats" class="container mx-auto max-w-6xl mt-24">
      <div class="grid md:grid-cols-3 gap-6">
        <UCard 
          v-for="(stat, index) in stats" 
          :key="index"
          class="bg-slate-800/50 border border-slate-700 text-center"
        >
          <div class="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {{ stat.value }}
          </div>
          <div class="text-slate-400">{{ stat.label }}</div>
        </UCard>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="container mx-auto max-w-4xl mt-24 text-center">
      <UCard class="bg-slate-800/50 border border-slate-700">
        <h3 class="text-2xl font-bold mb-4 text-white">Interested in a Custom 3D Model?</h3>
        <p class="text-slate-300 mb-6">
          I'm available for custom 3D modeling and printing projects. Let's bring your ideas to life!
        </p>
        <UButton 
          href="mailto:abailon949@gmail.com?subject=3D Printing Inquiry"
          size="xl"
          variant="solid"
          color="primary"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          icon="i-heroicons-envelope"
        >
          Get in Touch
        </UButton>
      </UCard>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Model {
  title: string
  description?: string
  image?: string
  category?: string
  technologies?: string[]
  stlUrl?: string
  thingiverseUrl?: string
  printablesUrl?: string
}

interface Stat {
  label: string
  value: string | number
}

const description = `I'm passionate about 3D modeling and printing, combining digital design skills with hands-on creation. Whether it's functional prototypes, artistic pieces, or solving everyday problems, I enjoy the process of bringing ideas from concept to physical reality.`

// Path to your STL file in the public folder
// Example: '/logo.stl' or '/models/my-model.stl'
const stlPath = '/logo.stl'

// Add your 3D models here
const models = ref<Model[]>([
  // Example structure - replace with your actual models
  // {
  //   title: 'Example Model',
  //   description: 'A detailed description of your 3D model and what makes it special.',
  //   image: '/3d-models/example-model.jpg',
  //   category: 'Functional',
  //   technologies: ['Fusion 360', 'PLA'],
  //   stlUrl: 'https://example.com/model.stl',
  //   thingiverseUrl: 'https://www.thingiverse.com/your-model',
  //   printablesUrl: 'https://www.printables.com/your-model'
  // }
])

// Optional stats section
const stats = ref<Stat[]>([
  // Example stats - customize as needed
  // { label: 'Models Created', value: '25+' },
  // { label: 'Print Hours', value: '150+' },
  // { label: 'Materials Used', value: '5' }
])

useHead({
  title: '3D Models & Printing | Alex Bailon',
  meta: [
    { name: 'description', content: 'Explore my 3D modeling and printing projects, from functional prototypes to artistic creations.' }
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
</style>
