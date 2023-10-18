<template>
  <div class="p-4 md:p-8 max-w-7xl mx-auto text-gray-700">
    <!-- Breadcrumbs -->
    <div class="mt-4 mb-8 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700">
        Wall Art
      </h1>
      <div class="mt-2 text-gray-500">
        <a href="#" class="hover:underline" @click="$emit('goTo', 'home')">
          Home
        </a>
        /
        <span class="text-gray-700">Checkout</span>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <!-- Image Container -->
      <div
        class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mx-auto"
      >
        <!-- Main Image -->
        <div
          class="flex-grow relative group cursor-pointer mb-4 md:mb-0"
          @click="toggleExpand"
        >
          <!-- Adjusted for bigger size on mobile -->
          <img
            :src="mainImage"
            alt="Main Art Image"
            class="rounded-lg shadow-md object-cover md:object-contain w-screen h-56 md:w-full md:h-auto transition-transform duration-300 hover:scale-105"
          />
          <div
            class="bg-gray-800 bg-opacity-50 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span class="text-white text-xl font-bold">Expand</span>
          </div>
        </div>

        <!-- Carousel Images for Desktop -->
        <div class="hidden md:block space-y-4">
          <img
            v-for="(image, index) in carouselImages"
            :key="index"
            :src="image"
            alt="Secondary Art Image"
            class="w-60 h-auto rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>

        <!-- Carousel Images for Mobile - Thumbnails -->
        <div class="flex space-x-2 md:hidden overflow-x-scroll">
          <img
            v-for="(image, index) in carouselImages"
            :key="index"
            :src="image"
            alt="Secondary Art Image"
            class="w-20 h-20 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Details Card -->
    <div
      class="bg-white p-6 rounded-lg shadow-sm mx-auto hover:shadow-md transition-shadow duration-300"
    >
      <!-- Title and Description -->
      <h2 class="text-2xl md:text-4xl text-gray-700 font-bold mb-4">
        {{ wallArt.title }}
      </h2>
      <p class="text-gray-600 text-lg mb-6 leading-relaxed">
        {{ wallArt.description }}
      </p>

      <!-- Filtering Options -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 py-4">
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-medium mb-2 text-center">
            <i class="fas fa-expand-arrows-alt mr-2"></i>Size
          </h3>
          <div class="flex space-x-2">
            <button
              v-for="size in sizes"
              :key="size"
              @click="selectedSize = size"
              :class="[
                size === selectedSize
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800',
                'px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-300',
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Material -->
        <div class="mx-auto">
          <h3 class="text-lg font-medium mb-2 text-center mr-2">
            <i class="fas fa-paint-brush mr-2"></i>Material
          </h3>
          <div class="flex space-x-2">
            <button
              v-for="material in materials"
              :key="material"
              @click="selectedMaterial = material"
              :class="[
                material === selectedMaterial
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800',
                'px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-300',
              ]"
            >
              {{ material }}
            </button>
          </div>
        </div>

        <!-- Duration -->
        <div class="mx-auto">
          <h3 class="text-lg font-medium mb-2 text-center mr-2">
            <i class="fas fa-clock mr-2"></i>Duration
          </h3>
          <div class="flex space-x-2">
            <button
              v-for="duration in durations"
              :key="duration"
              @click="selectedDuration = duration"
              :class="[
                duration === selectedDuration
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800',
                'px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-300',
              ]"
            >
              {{ duration }}
            </button>
          </div>
        </div>
      </div>

      <!-- Cost Section -->
      <div class="mt-8 border-t pt-6 my-4 mx-4 md:w-1/2 md:mx-auto">
        <div
          class="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between"
        >
          <div class="flex items-center space-x-3 mb-4 md:mb-0">
            <i class="fas fa-dollar-sign text-blue-500 text-3xl"></i>
            <h3 class="text-xl font-medium">Approximate Cost</h3>
          </div>
          <p
            class="text-gray-700 text-2xl md:text-3xl font-semibold flex items-baseline"
          >
            ${{ getDollarPortion(approximateCost) }}.<sup class="text-base">{{
              getCentsPortion(approximateCost)
            }}</sup>
            <span class="text-sm inline-block ml-1">/ month</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mainImage: 'https://source.unsplash.com/random/1100x580?art',
      carouselImages: [
        'https://source.unsplash.com/random/640x348?art',
        'https://source.unsplash.com/random/641x349?painting',
        'https://source.unsplash.com/random/642x350?sculpture',
        'https://source.unsplash.com/random/643x351?drawing',
      ],
      wallArt: {
        title: 'Stunning AI Art',
        description:
          'This is a beautiful AI generated art. It brings vibrant colors and intriguing patterns to your living space.',
      },
      sizes: ['Small', 'Medium', 'Large'],
      selectedSize: 'medium',
      materials: ['Poster', 'Canvas'],
      selectedMaterial: 'canvas',
      durations: ['3-Months', '6-Months'],
      selectedDuration: '3-months',
      approximateCost: 150.0,
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    getDollarPortion(value) {
      return Math.floor(value); // Get the whole dollar amount
    },
    getCentsPortion(value) {
      const cents = Math.round((value - Math.floor(value)) * 100);
      return cents.toString().padStart(2, '0'); // Convert it to a two-digit string
    },
  },
};
</script>

<style scoped></style>
