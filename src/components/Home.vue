<template>
      <div id="home" class="home px-3">
      <!-- Search Bar -->
      <section id="search-bar" class="mt-12 container mx-auto">
        <div class="text-center mb-4 text-gray-700">
          <h2 class="text-2xl font-bold">Search Artworks</h2>
          <p class="text-sm text-gray-700 leading-relaxed">
            Find for the wall arts you love.
          </p>
        </div>
        <div
          class="relative flex items-center mx-auto bg-white p-4 rounded-full shadow-md"
          :class="isMobile ? 'w-full' : 'w-3/4'"
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
            v-model="searchTerm"
            class="rounded-full p-2 pl-16 w-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </section>

      <Inventory
        :displayedArts="displayedArts"
        :categories="categories"
        :selectedCategory="selectedCategory"
        :isMobile="isMobile"
        :itemsToShow="itemsToShow"
        @select-category="selectedCategory = $event"
        @go-to="$emit('go-to', $event)"
        @select-art="$emit('select-art', $event)"
        @add-to-cart="$emit('add-to-cart', $event)"
        @set-displayed-arts="setDisplayedArts"
        @filter-displayed-arts="filterDisplayedArts"
        @set-items-to-show="setItemsToShow"
      />

      <Testimonials :isMobile="isMobile" />

      <FAQ />

      <!-- Follow Us -->
      <section class="bg-gray-100 py-20 rounded-lg">
        <div class="container mx-auto text-center">
          <h2
            class="text-4xl text-gray-700 font-extrabold mb-12 tracking-tighter"
          >
            Stay Updated!
          </h2>
          <div class="flex justify-center space-x-8 md:space-x-12 flex-wrap">
            <button
              class="text-blue-500 hover:text-blue-600 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
              @click="openSocialMedia"
            >
              <i class="fab fa-facebook-square"></i>
          </button>
            <button
              class="text-red-600 hover:text-red-700 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
              @click="openSocialMedia"
            >
              <i class="fab fa-instagram-square"></i>
          </button>
            <button
              class="text-red-500 hover:text-red-600 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
              @click="openSocialMedia"
            >
              <i class="fab fa-pinterest-square"></i>
          </button>
            <button
              class="text-blue-700 hover:text-blue-800 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
              @click="openSocialMedia"
            >
              <i class="fab fa-tiktok"></i>
          </button>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import Testimonials from './Testimonials.vue';
import Inventory from './Inventory.vue';
import FAQ from './FAQ.vue';

export default {
  components: {
    Inventory,
    Testimonials,
    FAQ,
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    isSidebarHidden: {
      type: Boolean,
      required: true,
    },
    arts: {
      type: Array,
      required: true,
    },
    selectedArt: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {

    this.displayedArts = this.arts.slice(0, this.itemsToShow);
  },
  data() {
    return {
      searchTerm: '',
      selectedCategory: 'Popular',
      itemsToShow: 9,
      displayedArts: [],
      loremText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
      showMoreButton: true,
    }
  },
  methods: {
    setDisplayedArts(displayedArts) {
      this.displayedArts = displayedArts;
    },
    filterDisplayedArts() {
      if (['Popular', 'New'].includes(this.selectedCategory)) {
        this.displayedArts = this.arts.slice(0, this.itemsToShow);
      } else {
        this.displayedArts = this.arts
          .filter((art) => art.tags.includes(this.selectedCategory))
          .slice(0, this.itemsToShow);
      }
      this.checkShowMoreButton();
    },

    showMore() {
      this.itemsToShow += this.step;
      this.displayedArts = this.arts
        .slice(0, this.itemsToShow)
        .filter((art) => {
          return art.tags.includes(this.selectedCategory);
        });

      this.checkShowMoreButton();
    },
    checkShowMoreButton() {
      this.showMoreButton = this.itemsToShow < this.arts.length;
    },
    setItemsToShow(itemsToShow) {
      this.itemsToShow = itemsToShow;
      this.filterDisplayedArts();
    },
    openSocialMedia() {
      alert('Coming Soon!');
    }
  },
  watch: {
    searchTerm() {
      if (this.searchTerm) {
        this.displayedArts = this.arts.filter((art) =>
          art.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.displayedArts = this.arts.slice(0, this.itemsToShow);
      }
    },
  },
}
</script>