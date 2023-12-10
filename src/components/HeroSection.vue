<template>
  <!-- Hero Section -->
  <section class="relative mt-2">
    <div class="container mx-auto px-4">
      <div
        class="bg-white rounded-3xl overflow-hidden shadow-lg relative md:p-4"
      >
        <div class="slide-show h-full overflow-hidden relative">
          
          <!-- Slide Container -->
          <div
            class="slide-container flex transition-transform duration-500 ease-in-out h-full"
          >
            <!-- Slides -->
            <template v-for="art in randomArts">
              <div
                class="w-full flex-none"
                :style="isMobile ? 'max-height: 55vh' : 'max-height: 70vh'"
              >
                <img
                  :src="art.image"
                  :alt="art.title"
                  class="rounded-3xl object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                  :style="{ 'object-position': 'center 20%' }"
                  style="
                    transition: transform 0.3s ease-in-out;
                    transform: translateZ(0);
                  "
                />
              </div>
            </template>
          </div>

          <!-- CTA Overlay with Enhanced Gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-gray-900 flex flex-col justify-center items-center px-4 rounded-3xl"
          >
            <!-- Title -->
            <h2
              class="text-2xl font-bold text-white mb-4 lg:text-4xl animate__animated animate__fadeInDown"
            >
              Discover Modern Art
            </h2>

            <!-- Subtitle -->
            <p
              class="text-sm text-white mb-4 opacity-90 lg:text-lg animate__animated animate__fadeInUp"
            >
              Experience creativity like never before.
            </p>

            <!-- CTA Button -->
            <a
              href="#search-bar"
              class="mt-4 py-2 px-4 lg:py-3 lg:px-8 text-lg rounded-full text-white bg-blue-600 hover:bg-blue-800 transition duration-300 ease-in-out shadow transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    arts: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log(this.arts)
    this.randomArts = this.arts.sort(() => Math.random() - 0.5).slice(0, 5);
  },
  data() {
    return {
      randomArts: [],
    }
  }
};
</script>

<style scoped>
/* Initial State */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-right-enter-to {
  transform: translateX(0%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Slide and fade combination */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.fade-slide-enter,
.fade-slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}
</style>