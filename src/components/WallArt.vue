<template>
  <div class="p-4 md:p-8 max-w-6xl mx-auto text-gray-700">
    <!-- Breadcrumbs -->
    <div class="mt-4 mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Wall Art
      </h1>
      <div class="mt-2 text-gray-500" :class="isMobile && 'text-center'">
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
        class="relative min-w-fit flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-6 mx-auto"
      >
        <!-- Main Image -->
        <div
          class="relative group cursor-pointer mb-24 transform md:mb-0 w-full"
          @click="toggleExpand"
        >
          <div
            class="flex overflow-hidden rounded-md"
            style="max-height: 500px"
          >
            <img
              v-if="mainImage === carouselImages[0]"
              :src="mainImage"
              alt="Main Art Image"
              class="rounded-lg object-fill shadow-md transition-transform duration-300 w-full transform md:scale-y-150"
            />
            <Image
              v-else
              type="wall"
              subtype="main"
              :src="carouselImages[2]"
              :selectedSize="selectedSize"
            />
          </div>
        </div>

        <!-- Carousel Images for Desktop -->
        <div
          class="hidden md:flex flex-col justify-center space-y-4 bg-white z-10"
        >
          <img
            :src="carouselImages[0]"
            alt="Secondary Art Image"
            @click="setMainImage(carouselImages[0])"
            class="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer w-36"
          />
          <img
            :src="carouselImages[1]"
            alt="Secondary Art Image"
            @click="setMainImage(carouselImages[1])"
            class="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer w-36"
          />
          <Image
            class="w-36 h-36"
            type="wall"
            subtype="thumbnail"
            :src="carouselImages[0]"
            :selectedSize="selectedSize"
            @select-image="setMainImage"
          />
        </div>

        <!-- Carousel Images for Mobile - Thumbnails -->
        <div
          class="flex justify-between space-x-4 md:hidden overflow-x-scroll mx-auto bg-white absolute bottom-0"
        >
          <img
            :src="carouselImages[0]"
            alt="Secondary Art Image"
            @click="setMainImage(carouselImages[0])"
            class="w-20 h-20 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
          <img
            :src="carouselImages[1]"
            alt="Secondary Art Image"
            @click="setMainImage(carouselImages[1])"
            class="w-20 h-20 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
          <Image
            type="wall"
            subtype="thumbnail"
            :src="carouselImages[0]"
            :selectedSize="selectedSize"
            @select-image="setMainImage"
          />
        </div>
      </div>
    </div>

    <!-- Details Card -->
    <div
      class="bg-white p-6 rounded-lg shadow-sm mx-auto hover:shadow-md transition-shadow duration-300 relative"
    >
      <!-- Title and Description -->
      <h2 class="text-2xl md:text-4xl text-gray-700 font-bold mb-4">
        {{ wallArt.title }}
      </h2>
      <p class="text-gray-600 text-lg mb-6 leading-relaxed">
        {{ wallArt.description }}
      </p>

      <!-- Filtering Options -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6 py-8 w-11/12 mx-auto border-b pb-12"
      >
        <!-- Category -->
        <div class="mx-auto">
          <h3 class="text-lg font-medium mb-2 text-center mr-2">
            <i class="fas fa-paint-brush mr-2"></i>Category
          </h3>
          <div class="flex space-x-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                category === selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800',
                'px-4 py-2.5 rounded-full transition-colors duration-300 hover:bg-gray-300',
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Size -->
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-medium mb-2">
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
                'px-4 py-2.5 rounded-full transition-colors duration-300 hover:bg-gray-300',
              ]"
            >
              {{ size }}
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
                'px-4 py-2.5 rounded-full transition-colors duration-300 hover:bg-gray-300',
              ]"
            >
              {{ duration }}
            </button>
          </div>
        </div>
      </div>

      <!-- Cost Section -->
      <div class="my-6 mx-4 flex justify-between">
        <div
          class="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between w-1/2"
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

        <!-- Add to Cart Button -->
        <button
          @click="$emit('add-to-cart', wallArt)"
          class="mr-12 md:ml-48 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-700 transition ease-in-out duration-150"
        >
          <i class="fas fa-shopping-cart mr-2"></i>
          Add to Cart
        </button>
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
    ></div>

    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this wall art?</p>
        <div class="flex justify-end space-x-4 mt-4">
          <button @click="showModal = false" class="px-4 py-2">Cancel</button>
          <button
            @click="confirmDelete"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from './Image.vue';

export default {
  components: {
    Image,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    selectedArt: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      mainImage: this.selectedArt.images[0],
      wallArt: {
        title: this.selectedArt.title,
        description:
          'This is a beautiful AI generated art. It brings vibrant colors and intriguing patterns to your living space.',
      },
      sizes: ['Small', 'Medium', 'Square', 'Large'],
      selectedSize: 'Medium',
      categories: ['New', 'Pre-Rented'],
      selectedCategory: 'New',
      durations: ['3-Months', '6-Months'],
      selectedDuration: '6-Months',
      approximateCost: 150.0,
      showModal: false,
      selectedImage: 0,
    };
  },
  computed: {
    carouselImages() {
      const options = {
        Canvas: {
          Small: [0, 1, 3],
          Medium: [0, 7, 10],
          Square: [20, 21, 24],
          Large: [0, 14, 17],
        },
        Posters: {
          Small: [],
          Medium: [],
          Square: [],
          Large: [],
        },
      };

      return this.selectedArt.images;
      return this.selectedArt.images.filter((_, index) =>
        options[this.selectedCategory][this.selectedSize].includes(index)
      );
    },
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
    openDeleteModal() {
      this.showModal = true;
    },
    confirmDelete() {
      // Here, you would typically make an API call or some other action to delete the wall art
      // For now, we'll just close the modal and emit a placeholder event
      this.$emit('delete-wall-art');
      this.showModal = false;
    },
    setMainImage(imageSrc) {
      this.mainImage = imageSrc;
    },
  },
};
</script>
