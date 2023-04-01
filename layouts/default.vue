<template>
  <v-app >
    <client-only>
      <vue-particles
        color="#FF00FF"
        style="z-index: 5"
        :particle-opacity="0.5"
        :particles-number="$vuetify.breakpoint.smAndUp ? 300 : 150"
        shape-type="circle"
        :particle-size="3.7"
        lines-color="#FF00FF"
        :lines-width="2"
        :line-linked="true"
        :line-opacity="0.2"
        :lines-distance="150"
        :move-speed="4"
      />
    </client-only>
    <div class="cursor"></div>
    <v-main class="gradient" >
      <v-container fluid style="height: 100%">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
      dark
      style="z-index: 7; opacity: 0.9"
    >
      <span> Alex Bailon &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {}
  },
  mounted(){
    this.$gsap.set(".cursor", {xPercent: -50, yPercent: -50});

    const cursor = document.querySelector(".cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = this.$gsap.quickSetter(cursor, "x", "px");
    const ySet = this.$gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("mousemove", e => {    
      mouse.x = e.x;
      mouse.y = e.y;  
    })

    this.$gsap.ticker.add(() => {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, this.$gsap.ticker.deltaRatio()); 
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    })
  }  
}
</script>

<style>
  .gradient {
    background-image: linear-gradient(to bottom right, #8b0000 , #00008b  );
  }
  #particles-js {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    pointer-events: none;
    z-index: 5;
  }  
</style>