<template>
  <div ref="containerRef" class="w-full h-full absolute inset-0 overflow-hidden pointer-events-none" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Props for STL file path
interface Props {
  stlPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  stlPath: '/logo.stl' // Default STL path, change to your file
})

const containerRef = ref<HTMLDivElement | null>(null)
let scene: any = null
let camera: any = null
let renderer: any = null
let animationId: number | null = null
const objects: any[] = []

onMounted(async () => {
  // Dynamically import Three.js and STL loader
  try {
    // Import Three.js and STL loader
    const threeModule = await import('three')
    const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js')
    
    // Access Three.js classes directly from the module
    const {
      Scene,
      PerspectiveCamera,
      WebGLRenderer,
      AmbientLight,
      PointLight,
      MeshStandardMaterial,
      Mesh,
      BufferGeometry,
      BufferAttribute,
      PointsMaterial,
      Points,
      DoubleSide,
      Color,
      Box3,
      Vector3
    } = threeModule
    
    if (!containerRef.value) return

    // Scene setup
    scene = new Scene()
    scene.background = null // Transparent background

    // Camera setup
    const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera = new PerspectiveCamera(75, aspect, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    renderer = new WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.value.appendChild(renderer.domElement)

    // Lighting - increased intensity for better visibility
    const ambientLight = new AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const pointLight1 = new PointLight(0xa855f7, 2, 100) // Purple - brighter
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new PointLight(0xec4899, 2, 100) // Pink - brighter
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new PointLight(0x3b82f6, 2, 100) // Blue - brighter
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    // Load STL file and create spinning 3D models
    const stlLoader = new STLLoader()
    
    const loadSTLModel = async (stlPath: string) => {
      try {
        const geometry = await stlLoader.loadAsync(stlPath)
        
        // Center the geometry
        geometry.computeVertexNormals()
        geometry.center()
        
        // Scale the model to a larger size
        // Create a temporary mesh to calculate bounding box
        const tempMesh = new Mesh(geometry)
        const box = new Box3().setFromObject(tempMesh)
        const size = box.getSize(new Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 0) {
          const scale = 5 / maxDim // Larger size - scale to fit in a 5 unit space
          geometry.scale(scale, scale, scale)
        }
        
        return geometry
      } catch (error) {
        console.warn('Failed to load STL file:', error)
        return null
      }
    }

    // Load the STL model
    const stlGeometry = await loadSTLModel(props.stlPath)
    
    if (stlGeometry) {
      // Create a single centered, larger model with brighter appearance
      const material = new MeshStandardMaterial({
        color: 0xa855f7, // Purple
        metalness: 0.7,
        roughness: 0.1,
        emissive: 0xa855f7,
        emissiveIntensity: 0.6, // Increased brightness
        transparent: true,
        opacity: 0.9 // More opaque for better visibility
      })

      const modelMesh = new Mesh(stlGeometry, material)
      
      // Center the model in the scene
      modelMesh.position.set(0, 0, 0)
      
      // Store rotation speed
      modelMesh.userData = {
        rotationSpeed: {
          y: 0.01 // Faster rotation speed
        }
      }

      scene.add(modelMesh)
      objects.push(modelMesh)
    } else {
      console.warn('STL model not loaded, scene will be empty')
    }


    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Very slow, subtle rotation (optional - can be removed for completely fixed)
      objects.forEach((obj) => {
        if (obj.userData?.rotationSpeed) {
          // Very slow rotation around Y axis only
          obj.rotation.y += obj.userData.rotationSpeed.y
        }
      })

      // Keep camera fixed, looking at center
      camera.position.set(0, 0, 5)
      camera.lookAt(0, 0, 0)

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
      window.removeEventListener('resize', handleResize)
    })
  } catch (error) {
    console.warn('Three.js not available:', error)
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer && containerRef.value) {
    renderer.dispose()
    if (containerRef.value.contains(renderer.domElement)) {
      containerRef.value.removeChild(renderer.domElement)
    }
  }
  
  // Clean up geometries and materials
  objects.forEach(obj => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((mat: any) => mat.dispose())
      } else {
        obj.material.dispose()
      }
    }
  })
})
</script>

<style scoped>
div {
  z-index: 0;
}
</style>
