<template>
  <div ref="containerRef" class="w-full h-full relative bg-slate-900" style="cursor: grab;" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  stlPath: string
  autoRotate?: boolean
  lazyLoad?: boolean // Only load when visible
}

const props = withDefaults(defineProps<Props>(), {
  autoRotate: true,
  lazyLoad: true
})

const containerRef = ref<HTMLDivElement | null>(null)
let scene: any = null
let camera: any = null
let renderer: any = null
let modelMesh: any = null
let animationId: number | null = null
let isVisible = ref(false)
let isLoaded = ref(false)
let observer: IntersectionObserver | null = null

// Mouse rotation state
const isDragging = ref(false)
const previousMousePosition = ref({ x: 0, y: 0 })
const rotation = ref({ x: 0, y: 0 })
const autoRotateActive = ref(true)

// Initialize Three.js scene
const initScene = async () => {
  if (isLoaded.value) return // Already loaded
  isLoaded.value = true
  
  try {
    const threeModule = await import('three')
    const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js')
    
    const {
      Scene,
      PerspectiveCamera,
      WebGLRenderer,
      AmbientLight,
      PointLight,
      DirectionalLight,
      MeshStandardMaterial,
      ShaderMaterial,
      Mesh,
      Box3,
      Vector3,
      Color
    } = threeModule
    
    if (!containerRef.value) return

    // Scene setup
    scene = new Scene()
    scene.background = new Color(0x0f172a) // slate-900

    // Camera setup
    const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera = new PerspectiveCamera(50, aspect, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Renderer setup
    renderer = new WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.value.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new PointLight(0xa855f7, 1.5, 100) // Purple
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new PointLight(0xec4899, 1.5, 100) // Pink
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new PointLight(0x3b82f6, 1.5, 100) // Blue
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 10, 10)
    scene.add(directionalLight)

    // Load STL file
    const stlLoader = new STLLoader()
    
    const loadSTLModel = async (stlPath: string) => {
      try {
        const geometry = await stlLoader.loadAsync(stlPath)
        
        // Performance check: warn about large models
        const vertexCount = geometry.attributes.position?.count || 0
        if (vertexCount > 50000) {
          console.warn(`Large STL model detected (${vertexCount} vertices). Consider using a simplified version for preview.`)
        }
        
        geometry.computeVertexNormals()
        geometry.center()
        
        // Scale the model appropriately
        const tempMesh = new Mesh(geometry)
        const box = new Box3().setFromObject(tempMesh)
        const size = box.getSize(new Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 0) {
          const scale = 3.5 / maxDim
          geometry.scale(scale, scale, scale)
        }
        
        // Optimize geometry for better performance
        geometry.computeBoundingBox()
        geometry.computeBoundingSphere()
        
        return geometry
      } catch (error) {
        console.warn('Failed to load STL file:', error)
        return null
      }
    }

    const stlGeometry = await loadSTLModel(props.stlPath)
    
    if (stlGeometry) {
      // Calculate bounding box to determine gradient range
      const box = new Box3().setFromObject(new Mesh(stlGeometry, new MeshStandardMaterial()))
      const size = box.getSize(new Vector3())
      const center = box.getCenter(new Vector3())
      
      // Create gradient shader material with lighting
      const gradientMaterial = new ShaderMaterial({
        uniforms: {
          color1: { value: new Color(0xa855f7) }, // Purple
          color2: { value: new Color(0xec4899) }, // Pink
          color3: { value: new Color(0x3b82f6) }, // Blue
          minY: { value: center.y - size.y / 2 },
          maxY: { value: center.y + size.y / 2 },
          emissiveIntensity: { value: 0.3 }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec3 vNormal;
          void main() {
            vPosition = position;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float minY;
          uniform float maxY;
          uniform float emissiveIntensity;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            float normalizedY = (vPosition.y - minY) / (maxY - minY);
            normalizedY = clamp(normalizedY, 0.0, 1.0);
            
            vec3 color;
            if (normalizedY < 0.5) {
              // Blend between color1 and color2
              color = mix(color1, color2, normalizedY * 2.0);
            } else {
              // Blend between color2 and color3
              color = mix(color2, color3, (normalizedY - 0.5) * 2.0);
            }
            
            // Add simple lighting based on normal
            vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
            float lightIntensity = max(dot(vNormal, lightDir), 0.3);
            color = color * lightIntensity + color * emissiveIntensity;
            
            gl_FragColor = vec4(color, 0.95);
          }
        `,
        transparent: true,
        vertexColors: false
      })

      modelMesh = new Mesh(stlGeometry, gradientMaterial)
      modelMesh.position.set(0, 0, 0)
      
      scene.add(modelMesh)
    }

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.value = true
      autoRotateActive.value = false // Stop auto-rotate when user interacts
      previousMousePosition.value = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.value || !modelMesh) return

      const deltaX = e.clientX - previousMousePosition.value.x
      const deltaY = e.clientY - previousMousePosition.value.y

      // Update rotation based on mouse movement
      // Rotate the modelMesh around its local Y axis (for spinning)
      // and around its local X axis (for tilting)
      rotation.value.y += deltaX * 0.01
      rotation.value.x += deltaY * 0.01

      // Apply rotation to modelMesh (not the parent group)
      modelMesh.rotation.y = rotation.value.y
      modelMesh.rotation.x = rotation.value.x

      previousMousePosition.value = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const handleMouseUp = () => {
      isDragging.value = false
      // Resume auto-rotate after a delay if enabled
      if (props.autoRotate) {
        setTimeout(() => {
          if (!isDragging.value) {
            autoRotateActive.value = true
          }
        }, 2000) // Resume auto-rotate after 2 seconds of no interaction
      }
    }

    // Add event listeners
    if (containerRef.value) {
      containerRef.value.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    // Cleanup function
    const cleanup = () => {
      if (containerRef.value) {
        containerRef.value.removeEventListener('mousedown', handleMouseDown)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    // Animation loop - only animate when visible
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Only render if visible (for performance)
      if (!isVisible.value) {
        return
      }
      
      // Auto-rotate if enabled and active (rotate around Y axis)
      if (props.autoRotate && autoRotateActive.value && modelMesh) {
        // Continue rotating from current Y rotation (which may have been modified by user or default rotation)
        modelMesh.rotation.y += 0.01
        rotation.value.y = modelMesh.rotation.y // Sync rotation state
      }
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.value || !camera || !renderer) return
      
      const width = containerRef.value.clientWidth
      const height = containerRef.value.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
      cleanup()
      window.removeEventListener('resize', handleResize)
    })
  } catch (error) {
    console.warn('Three.js not available:', error)
  }
}

onMounted(() => {
  if (!containerRef.value) return
  
  // Set up Intersection Observer for lazy loading and visibility tracking
  if (props.lazyLoad && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
          // Load model when it becomes visible
          if (entry.isIntersecting && !isLoaded.value) {
            initScene()
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before it's visible
      }
    )
    
    observer.observe(containerRef.value)
  } else {
    // Fallback: load immediately if IntersectionObserver not supported or lazyLoad is false
    isVisible.value = true
    initScene()
  }
})

onUnmounted(() => {
  // Clean up Intersection Observer
  if (observer && containerRef.value) {
    observer.unobserve(containerRef.value)
    observer.disconnect()
  }
  
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer && containerRef.value) {
    renderer.dispose()
    if (containerRef.value.contains(renderer.domElement)) {
      containerRef.value.removeChild(renderer.domElement)
    }
  }
  
  // Clean up model
  if (modelMesh) {
    if (modelMesh.geometry) modelMesh.geometry.dispose()
    if (modelMesh.material) {
      if (Array.isArray(modelMesh.material)) {
        modelMesh.material.forEach((mat: any) => mat.dispose())
      } else {
        modelMesh.material.dispose()
      }
    }
  }
})
</script>

<style scoped>
div:active {
  cursor: grabbing;
}
</style>
