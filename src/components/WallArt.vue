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
              v-if="mainImage === selectedArt.image"
              :src="mainImage"
              alt="Main Art Image"
              class="rounded-lg object-fill shadow-md transition-transform duration-300 w-full transform md:scale-y-150"
            />
            <Image
              v-else
              type="wall"
              subtype="main"
              :src="mainImage"
              :selectedSize="selectedSize"
            />
          </div>
        </div>

        <!-- Carousel Images for Desktop -->
        <div
          class="hidden md:flex flex-col justify-center space-y-4 bg-white z-10"
        >
          <img
            :src="mainImage"
            alt="Secondary Art Image"
            @click="setMainImage(selectedArt.image)"
            class="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer w-36"
          />
          <img
            :src="mainImage"
            alt="Secondary Art Image"
            @click="setMainImage(selectedArt.image)"
            class="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer w-36"
          />
          <Image
            class="w-36 h-36"
            type="wall"
            subtype="thumbnail"
            :src="mainImage"
            :selectedSize="selectedSize"
            @select-image="setMainImage(mainImage + '?')"
          />
        </div>

        <!-- Carousel Images for Mobile (Thumbnails) -->
        <div
          class="flex justify-between space-x-4 md:hidden overflow-x-scroll mx-auto bg-white absolute bottom-0"
        >
          <img
            :src="mainImage"
            alt="Secondary Art Image"
            class="w-1/3 h-20 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            @click="setMainImage(selectedArt.image)"
          />
          <img
            :src="mainImage"
            alt="Secondary Art Image"
            @click="setMainImage(selectedArt.image)"
            class="w-1/3 h-20 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
          <Image
            type="wall"
            subtype="thumbnail"
            class="w-1/3"
            style="border: solid red"
            :src="mainImage"
            :selectedSize="selectedSize"
            @click="setMainImage(mainImage + '?')"
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
        {{ selectedArt.title }}
      </h2>
      <p class="text-gray-600 text-lg mb-6 leading-relaxed">
        {{ selectedArt.description }}
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
              {{ duration }}-Months
            </button>
          </div>
        </div>
      </div>

      <!-- Cost Section -->
      <div class="my-6 mx-4 flex flex-col md:flex-row justify-between">
        <div
          class="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between mb-4 md:mb-0 w-full md:w-1/2"
        >
          <div class="flex items-center space-x-3">
            <i class="fas fa-dollar-sign text-blue-500 text-3xl"></i>
            <h3 class="text-xl font-medium">Approximate Cost</h3>
          </div>
          <p
            class="text-gray-700 text-lg md:text-2xl lg:text-3xl font-semibold flex items-baseline mt-2 md:mt-0"
          >
            ${{ getDollarPortion(approximateCost) }}.<sup class="text-base">{{
              getCentsPortion(approximateCost)
            }}</sup>
            <span class="text-sm inline-block ml-1">/ month</span>
          </p>
        </div>

        <!-- Add to Cart Button -->
        <button
          @click="addToCart(selectedArt)"
          class="inline-flex items-center justify-center px-5 py-3 md:px-6 border border-transparent text-sm md:text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-700 transition ease-in-out duration-150 w-full md:w-auto mt-4 md:mt-0 md:ml-4"
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

  <!-- Added to Cart Notification -->
  <div
    v-if="notification"
    class="fixed top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 py-2 rounded-lg shadow-lg"
  >
    {{ notification }}
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
      mainImage: this.selectedArt.image,
      sizes: ['Small', 'Medium', 'Square', 'Large'],
      selectedSize: 'Medium',
      categories: ['New', 'Pre-Rented'],
      selectedCategory: 'New',
      durations: [3, 6],
      selectedDuration: 6,
      showModal: false,
      selectedImage: 0,
      notification: null,
      cost: {
        New: {
          3: {
            Small: 15,
            Medium: 25,
            Square: 30,
            Large: 55,
          },
          6: {
            Small: 10,
            Medium: 15,
            Square: 20,
            Large: 35,
          },
        },
        'Pre-Rented': {
          3: {
            Small: 10,
            Medium: 15,
            Square: 20,
            Large: 35,
          },
          6: {
            Small: 10,
            Medium: 10,
            Square: 15,
            Large: 20,
          },
        },
      },
    };
  },
  computed: {
    approximateCost() {
      return this.cost[this.selectedCategory][this.selectedDuration][
        this.selectedSize
      ];
    },
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    getDollarPortion(value) {
      return Math.floor(value);
    },
    getCentsPortion(value) {
      const cents = Math.round((value - Math.floor(value)) * 100);
      return cents.toString().padStart(2, '0');
    },
    openDeleteModal() {
      this.showModal = true;
    },
    confirmDelete() {
      this.$emit('delete-wall-art');
      this.showModal = false;
    },
    setMainImage(imageSrc) {
      this.mainImage = imageSrc;
    },
    addToCart(art) {
      this.$emit('add-to-cart', {
        ...art,
        size: this.selectedSize,
        category: this.selectedCategory,
        duration: this.selectedDuration,
        isAdded: true,
        quantity: 1,
      });

      this.notification = 'Added to Cart';

      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },
    setWallImage(imageSrc) {
      this.mainImage = imageSrc;

      this.isWallImage = true;
    },
  },
};
</script>
