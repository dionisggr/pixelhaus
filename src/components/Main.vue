<template>
  <div class="relative">
    <header class="bg-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left Section -->
      <div class="flex items-center">
        <i class="material-icons text-6xl pr-2 text-blue-500">border_all</i>
        <h1 class="text-3xl">PixelHaus</h1>
      </div>
      
      <!-- Middle Section -->
      <div class="relative flex items-center w-1/3">
        <i class="material-icons text-4xl absolute left-2 top-1/2 transform -translate-y-1/2">search</i>
        <div class="absolute left-10 top-1/2 h-6 border-l-2 transform -translate-y-1/2"></div>
        <input type="text" placeholder="Search" class="rounded-full p-2 pl-12 w-full border-2 border-gray-300"/>
      </div>
      
      <!-- Right Section -->
      <div class="flex items-center space-x-4">
        <i
          class="material-icons cursor-pointer hover:text-blue-500 block"
          style="font-size: 2rem"
        >
          message
        </i>
        <i
          class="material-icons cursor-pointer hover:text-blue-500"
          style="font-size: 2rem"
        >
          notifications
        </i>
        <i
          class="material-icons cursor-pointer hover:text-blue-500"
          style="font-size: 2rem"
        >
          shopping_cart
        </i>
        <div class="border-l-2 h-8 mx-4"></div>
        <div class="flex items-center space-x-2">
          <i class="material-icons text-7xl cursor-pointer hover:text-blue-500" @click="toggleDropdown">arrow_drop_down</i>
          <span class="text-xl">My Profile</span>
          <i class="material-icons text-7xl cursor-pointer hover:text-blue-500">account_circle</i>
        </div>
      </div>
    </div>
  </header>

    <section class="relative mt-6">
    <div class="container mx-auto">
      <div
        class="bg-white p-6 rounded-xl overflow-hidden shadow-md relative"
        style="height: 70vh"
      >
        <div class="slide-show h-full overflow-hidden relative">
          <div class="slide-container flex transition-transform duration-500 ease-in-out">
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

    <section class="mt-12 container mx-auto">
      <div class="text-center mb-4">
        <h2 class="text-2xl font-bold">Search Artworks</h2>
        <p class="text-sm text-gray-600 leading-relaxed">
          Use the search bar below to find the wall arts you love.
        </p>
      </div>
      <div
        class="bg-white p-4 rounded-xl shadow-md flex justify-center items-center w-11/12 mx-auto"
      >
        <input
          type="text"
          placeholder="Search for wall arts..."
          class="p-2 w-3/4 rounded-l-lg border-t border-b border-l border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 leading-6"
        />
        <button
          class="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-all flex items-center justify-center"
        >
          <i class="material-icons">search</i>
        </button>
      </div>
    </section>

    <section class="mt-10 container mx-auto flex mb-16">
      <aside
        class="w-1/4 bg-gray-50 p-6 rounded-xl shadow-md transition-transform duration-300 flex flex-col items-center"
        style="font-family: 'Poppins', sans-serif; height: fit-content"
      >
        <h2
          class="text-2xl font-semibold mb-4 border-b pb-2 text-center uppercase w-full bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-shadow-md"
        >
          Categories
        </h2>
        <ul class="w-full">
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-blue-600 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-blue-600 pl-2"
          >
            <i
              class="material-icons text-blue-600 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >star</i
            >
            Popular
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-green-600 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-green-600 pl-2"
          >
            <i
              class="material-icons text-green-600 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >new_releases</i
            >
            New
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-purple-600 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-purple-600 pl-2"
          >
            <i
              class="material-icons text-purple-600 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >palette</i
            >
            Abstract
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-green-500 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-green-500 pl-2"
          >
            <i
              class="material-icons text-green-500 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >landscape</i
            >
            Nature
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-red-500 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-red-500 pl-2"
          >
            <i
              class="material-icons text-red-500 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >family_restroom</i
            >
            Parenting
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-pink-500 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-pink-500 pl-2"
          >
            <i
              class="material-icons text-pink-500 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >child_care</i
            >
            For Kids
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-blue-500 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-blue-500 pl-2"
          >
            <i
              class="material-icons text-blue-500 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >public</i
            >
            Culture
          </li>
          <li
            class="flex items-center mb-3 text-gray-800 hover:text-yellow-500 transition-all cursor-pointer p-2 rounded hover:bg-gray-200 hover:shadow-md transform hover:scale-105 uppercase border-l-4 border-transparent hover:border-yellow-500 pl-2"
          >
            <i
              class="material-icons text-yellow-500 mr-4 transform transition-transform duration-300 hover:rotate-45"
              >beach_access</i
            >
            Puerto Rico
          </li>
        </ul>
      </aside>

      <div class="w-3/4 ml-6 grid grid-cols-1 gap-6" id="inventory-section">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="(art, i) in displayedArts"
            :key="i"
            class="art-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all relative min-w-[200px] h-[auto] flex flex-col"
          >
            <div class="flex-shrink-0 relative group">
              <img
                :src="art.image"
                :alt="art.title"
                class="w-full object-cover h-48 cursor-pointer"
              />
              <img
                :src="art.hoverImage"
                :alt="art.title"
                class="w-full object-cover h-48 art-hover absolute top-0 left-0 transform scale-110 opacity-0 transition cursor-pointer group-hover:opacity-100"
              />
            </div>
            <div class="p-4 flex-grow flex flex-col">
              <h3 class="text-lg font-semibold mb-2">{{ art.title }}</h3>
              <p class="text-sm text-gray-600 flex-grow">
                {{ art.description }}
              </p>
              <button
                class="mt-6 bg-blue-500 text-white rounded-full px-4 py-1 hover:bg-blue-600 transition-all self-start"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="showMoreButton"
          @click="showMore"
          class="mt-8 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-all mx-auto"
          style="maxwidth: fit-content"
        >
          Show More
        </button>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto" style="maxWidth: 1500px">
        <h2 class="text-4xl text-center font-extrabold mb-12 text-gray-800">
          Testimonials & Reviews
        </h2>
        <div class="overflow-hidden py-2 relative h-[fit-content] w-[calc(100%/3*3)]">
          <div class="flex gap-8 animate-scroll">
            <div v-for="testimonial in testimonials"
              class="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              style="minWidth: 350px">
              <div class="flex items-center mb-4">
                <img :src="testimonial.image" alt="User Image" class="w-16 h-16 rounded-full mr-4" />
                <p class="text-xl font-bold text-gray-700">
                  {{ testimonial.name }}
                </p>
              </div>
              <p class="text-gray-600 leading-relaxed">
                {{ testimonial.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

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

    <footer class="bg-white p-4 shadow-md absolute bottom-0 w-full">
      <div class="container mx-auto text-center">
        <p>&copy; 2023 PixAlley. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import data from '../data.js';

export default {
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
    this.checkShowMoreButton();
  },
  data() {
    return {
      displayedArts: [],
      showMoreButton: true,
      itemsToShow: 9,
      step: 12,
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
</style>
