<template>
        <section
        class="sidebar container mx-auto mb-16 items-start"
        :class="[{ flex: !isMobile }, isMobile ? 'mt-4' : 'mt-10']"
      >
        <div
          v-if="isMobile && !isSidebarHidden"
          class="fixed inset-0 bg-gray-800 opacity-50 z-20"
          @click="toggleSidebar"
        ></div>

        <aside
          :class="{
            'bg-gray-50 rounded-xl shadow-md transition-transform duration-300 flex flex-col items-center justify-center mr-8':
              !isMobile,
            'fixed top-20 z-20 p-2': !isMobile && isSidebarHidden,
            'fixed top-16 mt-2 z-20 p-4 left-4 right-4 bg-gray-50 rounded-xl shadow-md transition-transform duration-300 flex flex-col items-center overflow-y-scroll':
              isMobile && !isSidebarHidden,
            'pb-2 p-6': !isMobile && !isSidebarHidden,
          }"
          style="font-family: 'Poppins', sans-serif"
          :style="[
            !isMobile &&
              !isSidebarHidden &&
              'width: 25%; min-width: 275px; height: fit-content',
            isMobile && !isSidebarHidden && 'max-height: 88vh',
          ]"
        >
          <div class="w-full flex justify-between items-baseline">
            <h2
              v-if="!isSidebarHidden"
              class="text-2xl font-semibold mb-4 border-b pb-2 text-center w-full bg-clip-text text-transparent text-blue-500 uppercase text-shadow-md"
            >
              Categories
            </h2>
            <button
              @click="toggleSidebar"
              class="flex items-center dark:bg-gray-800 p-2 rounded-full dark:hover:bg-gray-700 transition-colors"
              :class="!isSidebarHidden && 'ml-4 bg-gray-100 hover:bg-gray-200'"
            >
              <i
                v-if="!isMobile || (isMobile && !isSidebarHidden)"
                class="material-icons text-2xl font-bold"
              >
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
                'flex items-center mb-3 text-gray-700 transition-all cursor-pointer p-2 rounded transform uppercase pl-2',
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
        <div
          class="flex-grow grid grid-cols-1 gap-6 px-4"
          id="inventory-section"
        >
          <!-- Dropdown header -->
          <div
            v-if="isSidebarHidden && isMobile"
            class="w-5/6 mx-auto flex items-center justify-between bg-white border rounded-lg shadow-md p-2 cursor-pointer hover:shadow-lg"
            @click="isSidebarHidden = !isSidebarHidden"
          >
            <h2
              class="text-2xl px-2 font-bold text-center uppercase bg-clip-text text-transparent text-blue-500 text-shadow-md"
            >
              {{ selectedCategory }}
            </h2>
            <svg
              class="h-6 w-6 transform transition-transform duration-300"
              :class="{ 'rotate-180': !isSidebarHidden }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <h2
            v-else
            class="text-3xl font-bold text-center uppercase bg-clip-text text-transparent text-blue-500 text-shadow-md text-semibold"
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
            <!-- Wall Art Preview -->
            <div
              v-for="(art, i) in displayedArts"
              class="group w-full max-w-lg relative art-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500"
            >
              <transition name="fade-slide" mode="out-in">
                <!-- Front Side -->
                <div
                  v-if="!art.flipped"
                  class="image-preview flex-shrink-0 relative aspect-content"
                  @click="
                    $emit('go-to', 'wall-art');
                    $emit('select-art', art);
                  "
                >
                  <!-- Main Image -->
                  <img
                    :src="art.image"
                    :alt="art.title"
                    class="main-image w-full cursor-pointer transform scale-y-90 -mt-20 pb-4"
                  />

                  <!-- Art Details -->
                  <div
                    class="p-3 pb-12 flex flex-col space-y-1 absolute bottom-0 bg-white w-full h-20"
                  >
                    <div
                      class="flex justify-between items-center text-gray-700"
                    >
                      <h3 class="text-lg font-semibold">{{ art.title }}</h3>
                      <button
                        @click.stop="toggleItem(art.id)"
                        :class="[
                          'bg-blue-500 hover:bg-blue-600',
                          'text-white rounded-full p-2 transition-all',
                        ]"
                      >
                        <!-- Right Arrow Icon, replacing the Add Icon -->
                        <svg
                          v-if="!art.isAdded"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>

                        <!-- Removed the Remove Icon -->
                      </button>
                    </div>
                    <div class="flex items-center min-h-full">
                      <p class="text-sm text-gray-700 truncate w-11/12">
                        {{ art.description || loremText }}
                      </p>
                    </div>
                  </div>

                  <!-- Notification Transition -->
                  <transition name="fade" mode="out-in">
                    <div
                      v-if="art.notification"
                      class="absolute top-0 right-0 mt-4 mr-4 px-2 bg-gray-900 bg-opacity-75 text-xs text-white p-1 rounded-full shadow-lg"
                    >
                      {{ art.notification }}
                    </div>
                  </transition>
                </div>

                <!-- Back Side -->
                <div
                  v-else
                  class="flex flex-col justify-between h-full max-w-screen-md mx-auto"
                >
                  <!-- Art Title with Thumbnail and Back Button -->
                  <div class="p-4 pb-0 flex items-center space-x-4">
                    <img
                      :src="art.image"
                      alt="Thumbnail"
                      class="w-10 h-10 object-cover rounded-lg shadow-sm"
                    />
                    <h4 class="font-semibold text-gray-800 flex-grow">
                      {{ art.title }}
                    </h4>
                    <button
                      @click="toggleItem(art.id)"
                      class="bg-gray-100 hover:bg-gray-200 p-1 rounded-full px-2.5 transition-colors duration-300 shadow-sm"
                    >
                      <i class="fas fa-arrow-left text-gray-600 text-sm"></i>
                    </button>
                  </div>

                  <!-- Art Description -->
                  <div class="p-6 h-full">
                    <p class="text-sm text-gray-700">
                      {{ art.description }}
                    </p>
                  </div>

                  <!-- Add to Cart Button -->
                  <div class="px-4 py-2 m-2 mx-auto">
                    <button
                      @click="$emit('add-to-cart', art)"
                      class="w-fit px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded-md transition-all duration-300 shadow-sm text-sm 2xl:m-2"
                    >
                      <i class="fas fa-shopping-cart"></i>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <button
            v-if="arts?.length !== displayedArts.length"
            @click="showMore"
            class="mt-8 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-all mx-auto"
            style="max-width: fit-content"
          >
            Show More
          </button>
        </div>
      </section>
</template>

<script>
export default {
  props: {
    displayedArts: {
      type: Array,
      required: true,
    },
    arts: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: String,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
    itemsToShow: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.categories = Object.keys(this.sidebar).map(category => ({
      name: category,
      ...this.sidebar[category],
    }));
  },
  data() {
    return {
      isSidebarHidden: false,
      categories: [],
      sidebar: {
        Popular: { icon: 'star', color: 'blue' },
        New: { icon: 'new_releases', color: 'green' },
        Landscape: { icon: 'landscape', color: 'gray' },
        Water: { icon: 'waves', color: 'blue' },
        Sunflower: { icon: 'nature', color: 'yellow' },
        Food: { icon: 'fastfood', color: 'red' },
        Motherhood: { icon: 'pregnant_woman', color: 'green' },
        Woman: { icon: 'female', color: 'pink' },
        'Self Love': { icon: 'favorite', color: 'pink' },
        Sunset: { icon: 'brightness_3', color: 'blue' },
        Jibaro: { icon: 'music_note', color: 'green' },
        'Puerto Rico': { icon: 'beach_access', color: 'yellow' },
        'Tropical Paradise': { icon: 'umbrella', color: 'blue' },
      },
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    },
    selectCategory(category) {
      this.selectCategory(category);
      this.$emit('filter-displayed-arts');

      if (this.isMobile) {
        this.toggleSidebar();
      }

      document.getElementById('search-bar').scrollIntoView();
    },
    toggleItem(id) {
      const art = this.displayedArts.find((item) => item.id === id);
      art.isAdded = !art.isAdded;
      art.flipped = !art.flipped;

      art.notification = art.isAdded
        ? 'Item added to cart'
        : 'Item removed from cart';

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        art.notification = null;
      }, 3000);
    },
    showMore() {
      this.$emit('set-items-to-show', this.itemsToShow + this.step);
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
  }
}
</script>