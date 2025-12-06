<template>
  <div class="relative py-8">
    <!-- Main vertical timeline line - cleaner approach -->
    <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50 transform -translate-x-1/2 z-0"></div>
    
    <!-- Glow effect on the line -->
    <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 via-pink-500/20 to-blue-500/20 transform -translate-x-1/2 z-0 blur-sm"></div>
    
    <!-- Mobile: Simple vertical line -->
    <div class="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50"></div>
    
    <div class="space-y-20 lg:space-y-24 relative">
      <div
        v-for="(exp, index) in experience"
        :key="index"
        class="relative"
      >
        <!-- Timeline dot - Desktop (centered on main line) -->
        <div 
          class="hidden lg:flex absolute z-20 items-center justify-center"
          style="left: 50%; top: 0; transform: translate(-50%, -50%);"
        >
          <!-- Outer glow ring -->
          <div class="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-md"></div>
          <!-- Main dot -->
          <div class="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-slate-950 shadow-xl flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>
        
        <!-- Mobile: Simple left-aligned dot -->
        <div class="lg:hidden absolute left-6 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div class="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-slate-950 shadow-lg"></div>
        </div>
        
        <!-- Content card -->
        <div 
          class="lg:w-[45%] pl-12 lg:pl-0"
          :class="index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'"
        >
          <UCard class="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
            <div class="p-8 md:p-10">
              <!-- Period badge -->
              <div class="mb-6">
                <span class="inline-block px-4 py-2 text-sm font-semibold text-purple-200 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg border border-purple-500/40 backdrop-blur-sm">
                  {{ exp.period }}
                </span>
              </div>
              
              <!-- Title -->
              <h3 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {{ exp.title }}
              </h3>
              
              <!-- Company and Location -->
              <div class="flex flex-wrap items-center gap-3 mb-8">
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-building-office-2" class="w-5 h-5 text-purple-400" />
                  <p class="text-xl font-semibold text-purple-400">{{ exp.company }}</p>
                </div>
                <span class="text-slate-500">·</span>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-slate-400" />
                  <p class="text-slate-400">{{ exp.location }}</p>
                </div>
              </div>
              
              <!-- Responsibilities -->
              <div class="space-y-4">
                <p class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span class="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  Key Responsibilities
                  <span class="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></span>
                </p>
                <ul class="space-y-4">
                  <li 
                    v-for="(resp, idx) in exp.responsibilities" 
                    :key="idx"
                    class="flex items-start group"
                  >
                    <div class="flex-shrink-0 mt-2 mr-4">
                      <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-150 transition-transform shadow-lg shadow-purple-500/50"></div>
                    </div>
                    <p class="text-slate-300 text-lg leading-relaxed flex-1 group-hover:text-white transition-colors">
                      {{ resp }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Experience {
  title: string
  company: string
  location: string
  period: string
  responsibilities: string[]
}

interface Props {
  experience: Experience[]
}

defineProps<Props>()
</script>

<style scoped>
/* Smooth animations */
.group:hover .group-hover\:scale-150 {
  transform: scale(1.5);
}
</style>
