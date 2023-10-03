<template>
  <div class="relative">
    <header class="bg-white p-6 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <i class="material-icons text-4xl pr-0 text-blue-500">border_all</i>
          <h1 class="text-2xl font-semibold">PixelHaus</h1>
        </div>
        <div class="flex justify-between w-2/5 space-x-4">
          <a
            href="#how-it-works"
            class="text-gray-600 font-bold hover:text-blue-500"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            class="text-gray-600 font-bold hover:text-blue-500"
          >
            Pricing
          </a>
          <a
            href="#terms-of-service"
            class="text-gray-600 font-bold hover:text-blue-500"
          >
            Terms of Service
          </a>
        </div>
        <div class="flex items-center space-x-5">
          <i class="material-icons text-2xl cursor-pointer hover:text-blue-500">
            notifications
          </i>
          <i class="material-icons text-2xl cursor-pointer hover:text-blue-500">
            shopping_cart
          </i>
          <div class="border-l-2 h-6 mx-4"></div>
          <div class="flex items-center space-x-3">
            <i
              class="material-icons text-3xl cursor-pointer hover:text-blue-500"
              @click="toggleDropdown"
              >arrow_drop_down</i
            >
            <span class="text-lg">My Profile</span>
            <i
              class="material-icons text-3xl cursor-pointer hover:text-blue-500"
            >
              account_circle
            </i>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative mt-6">
      <div class="container mx-auto">
        <div
          class="bg-white p-6 rounded-xl overflow-hidden shadow-md relative"
          style="height: 70vh"
        >
          <div class="slide-show h-full overflow-hidden relative">
            <div
              class="slide-container flex transition-transform duration-500 ease-in-out"
            >
              <img
                src="https://source.unsplash.com/random/640x360?art"
                alt="Art 1"
                class="rounded-xl w-full object-cover slide h-full"
              />
              <img
                src="https://source.unsplash.com/random/641x361?painting"
                alt="Art 2"
                class="rounded-xl w-full object-cover slide h-full"
              />
              <img
                src="https://source.unsplash.com/random/642x362?sculpture"
                alt="Art 3"
                class="rounded-xl w-full object-cover slide h-full"
              />
            </div>
          </div>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg"
          >
            <button
              class="bg-gray-800 bg-opacity-60 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-all transform block mx-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Bar -->
    <section class="mt-12 container mx-auto">
      <div class="text-center mb-4">
        <h2 class="text-2xl font-bold">Search Artworks</h2>
        <p class="text-sm text-gray-600 leading-relaxed">
          Use the search bar below to find the wall arts you love.
        </p>
      </div>
      <div
        class="relative flex items-center w-3/4 mx-auto bg-white p-4 rounded-full shadow-md"
      >
        <i
          class="material-icons text-4xl absolute left-6 top-1/2 transform -translate-y-1/2"
          >search</i
        >
        <div
          class="absolute left-14 top-1/2 h-6 border-l-2 transform -translate-y-1/2"
        ></div>
        <input
          type="text"
          placeholder="Search for wall arts..."
          class="rounded-full p-2 pl-16 w-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
    </section>

    <!-- Sidebar -->
    <section class="sidebar mt-10 container mx-auto flex mb-16">
      <aside
        :class="[
          'bg-gray-50 rounded-xl shadow-md transition-transform duration-300 flex flex-col items-center justify-center mr-8',
          {
            'w-1/4 p-6': !isSidebarHidden,
            'w-fit fixed top-12 z-10 p-3 ml-0': isSidebarHidden,
          },
        ]"
        style="font-family: 'Poppins', sans-serif; height: fit-content"
      >
        <div class="w-full flex justify-between items-baseline">
          <h2
            v-if="!isSidebarHidden"
            class="text-2xl font-semibold mb-4 border-b pb-2 text-center uppercase w-full bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-shadow-md"
          >
            Categories
          </h2>
          <button
            class="text-lg text-gray-700 flex items-center"
            @click="toggleSidebar"
          >
            <i class="material-icons text-2xl font-bold">
              {{ isSidebarHidden ? 'menu' : 'arrow_back' }}
            </i>
          </button>
        </div>

        <ul v-if="!isSidebarHidden" class="w-full">
          <li
            v-for="{ name, icon, color } in categories"
            :key="name"
            @click="selectCategory(name)"
            :class="[
              'flex items-center mb-3 text-gray-800 transition-all cursor-pointer p-2 rounded transform uppercase pl-2',
              selectedCategory === name
                ? [
                    'bg-gray-200 shadow-md',
                    `border-${color}-600`,
                    `text-${color}-600 border-l-4`,
                  ]
                : [
                    `hover:bg-gray-200 hover:shadow-md hover:scale-105 hover:border-${color}-600 hover:text-${color}-600`,
                  ],
            ]"
          >
            <i
              class="material-icons mr-4 transform transition-transform duration-300"
              :class="[
                `text-${color}-600`,
                selectedCategory === name ? 'rotate-45' : 'hover:rotate-45',
              ]"
            >
              {{ icon }}
            </i>
            {{ name }}
          </li>
        </ul>
      </aside>

      <!-- Inventory Section -->
      <div class="flex-grow grid grid-cols-1 gap-6" id="inventory-section">
        <h2
          v-if="isSidebarHidden"
          class="text-2xl font-bold mb-4 border-b pb-2 text-center uppercase w-full bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-shadow-md"
        >
          {{ selectedCategory }}
        </h2>
        <div
          :class="{
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':
              !isSidebarHidden,
            'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6':
              isSidebarHidden,
          }"
        >
          <div
            v-for="(art, i) in displayedArts"
            :key="i"
            class="group relative art-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all aspect-w-40 min-w-[350px]"
          >
            <div class="flex-shrink-0 relative aspect-content">
              <img
                :src="art.image"
                :alt="art.title"
                class="w-full object-cover cursor-pointer"
              />
              <img
                :src="art.hoverImage"
                :alt="art.title"
                class="w-full object-cover cursor-pointer opacity-0 group-hover:opacity-100 absolute top-0 left-0 transition-opacity"
              />
            </div>

            <div class="p-3 pb-3.5 flex flex-col space-y-1">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold">{{ art.title }}</h3>
                <button
                  @click="toggleItem(art.id)"
                  :class="[
                    art.isAdded
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600',
                    'text-white rounded-full p-2 transition-all',
                  ]"
                >
                  <svg
                    v-if="!art.isAdded"
                    xmlns="http://www.w3.org/2000/svg"
                    class="add h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="remove h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 12h12"
                    />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-gray-600">
                {{ art.description }}
              </p>
            </div>
            <transition name="fade" mode="out-in">
              <div
                v-if="art.notification"
                class="absolute top-0 right-0 mt-4 mr-4 px-2 bg-gray-900 bg-opacity-75 text-xs text-white p-1 rounded-full shadow-lg"
              >
                {{ art.notification }}
              </div>
            </transition>
          </div>
        </div>
        <button
          v-if="showMoreButton"
          @click="showMore"
          class="mt-8 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-all mx-auto"
          style="max-width: fit-content"
        >
          Show More
        </button>
      </div>
    </section>

    <Testimonials />

    <!-- FAQ -->
    <section class="bg-white py-16 shadow-md rounded-lg">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl text-center font-bold mb-12 text-gray-800">FAQ</h2>
        <div class="grid grid-cols-1 gap-4 grid-flow-row w-1/2 mx-auto">
          <div
            v-for="{ question, answer } in faq"
            class="faq-item bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105 cursor-pointer flex flex-col"
            @click="toggleAnswer($event)"
          >
            <div class="flex justify-between items-center">
              <h3
                class="text-xl font-semibold text-gray-700 hover:text-gray-800"
              >
                {{ question }}
              </h3>
              <i class="material-icons toggle-icon">add</i>
            </div>
            <p class="text-gray-600 answer hidden mt-4">
              {{ answer }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white p-4 shadow-md absolute bottom-0 w-full">
      <div class="container mx-auto text-center">
        <p>&copy; 2023 PixAlley. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Testimonials from './Testimonials.vue';
import data from '../data.js';

export default {
  components: {
    Testimonials,
  },
  mounted() {
    let slideIndex = 0;

    function showSlides() {
      let slides = document.getElementsByClassName('slide');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = 'block';
      setTimeout(showSlides, 2000);
    }
    showSlides();

    this.displayedArts = this.arts.slice(0, this.itemsToShow);

    this.displayedArts.forEach((art) => (art.isAdded = false));
    this.checkShowMoreButton();
  },
  data() {
    return {
      displayedArts: [],
      showMoreButton: true,
      itemsToShow: 9,
      step: 12,
      cart: [],
      notification: null,
      timeout: null,
      isSidebarHidden: false,
      selectedCategory: 'Popular',
      categories: [
        { name: 'Popular', icon: 'star', color: 'blue' },
        { name: 'New', icon: 'new_releases', color: 'green' },
        { name: 'Abstract', icon: 'palette', color: 'purple' },
        { name: 'Nature', icon: 'landscape', color: 'green' },
        { name: 'Parenting', icon: 'family_restroom', color: 'red' },
        { name: 'For Kids', icon: 'child_care', color: 'pink' },
        { name: 'Culture', icon: 'public', color: 'blue' },
        { name: 'Puerto Rico', icon: 'beach_access', color: 'yellow' },
      ],
    };
  },
  computed: {
    testimonials() {
      return data.testimonials;
    },
    arts() {
      return data.arts;
    },
    faq() {
      return data.faq;
    },
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    },
    toggleAnswer(event) {
      const answerElement = event.currentTarget.querySelector('.answer');
      if (answerElement.classList.contains('hidden')) {
        answerElement.classList.remove('hidden');
      } else {
        answerElement.classList.add('hidden');
      }
    },
    capitalizeFirstLetter(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    showMore() {
      this.itemsToShow += this.step;
      this.displayedArts = this.arts.slice(0, this.itemsToShow);
      this.checkShowMoreButton();
    },
    checkShowMoreButton() {
      this.showMoreButton = this.itemsToShow < this.arts.length;
    },
    toggleItem(id) {
      const art = this.displayedArts.find((item) => item.id === id);
      art.isAdded = !art.isAdded;

      art.notification = art.isAdded
        ? 'Item added to cart'
        : 'Item removed from cart';

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        art.notification = null;
      }, 3000);
    },
  },
};
</script>

<style>
.art-item:hover .art-hover {
  display: block;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 33.3333%));
  }
}

.animate-scroll {
  animation: scroll 20s linear infinite;
}

.answer.hidden {
  display: none;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background-color: #f3f4f6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
