<template>
  <div class="relative">
    <!-- Header -->
    <header class="bg-white p-6 shadow-md text-gray-700">
      <div class="container mx-auto flex justify-between items-center">
        <div
          class="flex items-center space-x-4 cursor-pointer"
          @click="goTo('home')"
        >
          <i class="material-icons text-4xl pr-0 text-blue-500">border_all</i>
          <h1 class="text-2xl font-semibold">PixelHaus</h1>
        </div>
        <div class="flex justify-between w-1/3 space-x-4">
          <a
            href="#how-it-works"
            class="text-gray-700 font-bold hover:text-blue-500 cursor-not-allowed"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            class="text-gray-700 font-bold hover:text-blue-500"
            @click="selectedNavItem = 'pricing'"
          >
            Pricing
          </a>
        </div>
        <div class="flex items-center space-x-5">
          <!-- Notifications -->
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500"
            @click="
              openModal = openModal === 'notifications' ? null : 'notifications'
            "
          >
            notifications
          </i>
          <div
            v-if="openModal === 'notifications'"
            @mouseleave="openModal = null"
            class="absolute top-12 right-10 w-96 bg-white rounded-lg shadow-md z-20 p-4 border-l border-r border-gray-300"
          >
            <div class="border-b-2 border-gray-200 pb-2 mb-4">
              <h3 class="text-2xl font-extrabold text-gray-800">
                Notifications
              </h3>
            </div>
            <div class="overflow-y-auto max-h-72">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex items-center space-x-4 mb-4 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition"
              >
                <i
                  :class="{
                    'material-icons text-blue-500':
                      notification.type === 'order',
                    'material-icons text-yellow-500':
                      notification.type === 'reminder',
                  }"
                >
                  {{
                    notification.type === 'order'
                      ? 'local_shipping'
                      : 'calendar_today'
                  }}
                </i>
                <div class="flex-grow">
                  <span class="block text-sm font-medium text-gray-700">{{
                    notification.message
                  }}</span>
                  <span class="text-xs text-gray-500">{{
                    notification.time
                  }}</span>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="flex justify-center">
              <a
                href="#"
                class="inline-block whitespace-nowrap w-1/2 text-center text-white bg-blue-600 hover:bg-blue-700 p-1.5 rounded-full text-sm"
                @click="goTo('notifications')"
              >
                See All
              </a>
            </div>
          </div>

          <!-- Shopping Cart -->
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500"
            @click="openModal = openModal === 'cart' ? null : 'cart'"
          >
            shopping_cart
          </i>
          <div
            v-if="openModal === 'cart'"
            @mouseleave="openModal = null"
            class="absolute top-16 right-12 w-96 bg-white rounded-lg shadow-md z-20 p-4 border-l border-r border-gray-300"
          >
            <div class="border-b-2 border-gray-300 pb-2 mb-6">
              <h3 class="text-2xl font-extrabold text-gray-700">Your Cart</h3>
            </div>
            <div class="overflow-x-auto max-h-72">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="mb-6 relative"
              >
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <img
                      :src="item.thumbnail"
                      alt="thumbnail"
                      class="w-12 h-12 object-cover rounded"
                    />
                    <span
                      v-if="item.quantity > 1"
                      class="absolute bottom-0 right-0 text-xs bg-blue-500 text-white rounded px-1"
                    >
                      x{{ item.quantity }}
                    </span>
                  </div>
                  <div>
                    <span class="font-medium">{{ item.name }}</span>
                    <span class="text-sm text-gray-500 block">
                      {{ item.material }}, {{ item.size }} ({{
                        item.dimensions
                      }})
                    </span>
                  </div>
                </div>
                <div class="text-gray-700 flex justify-between items-end">
                  <span class="text-xs"># {{ item.id.substring(0, 12) }}</span>
                  <span>${{ item.cost }}</span>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <span class="font-bold">Subtotal</span>
              <span class="text-gray-700">${{ subtotal }}</span>
            </div>
            <a
              href="#"
              @click="selectedNavItem = 'checkout'"
              class="block w-1/2 mx-auto text-center text-white bg-blue-600 hover:bg-blue-700 mt-6 p-1.5 rounded-full text-sm"
            >
              Checkout
            </a>
          </div>

          <div class="border-l-2 h-6 mx-4"></div>

          <!-- Account -->
          <div v-if="isLoggedIn" class="relative">
            <img
              src="https://source.unsplash.com/random/50x50?face"
              alt="User Thumbnail"
              class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
              @click="openModal = openModal === 'account' ? null : 'account'"
            />
            <div
              v-if="openModal === 'account'"
              @mouseleave="openModal = null"
              class="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-md z-10"
            >
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              >
                My Profile
              </a>
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
                @click="selectedNavItem = 'orders'"
              >
                My Orders
              </a>
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
                @click="logout"
              >
                Logout
              </a>
            </div>
          </div>

          <div v-else class="flex items-center space-x-3">
            <a
              href="#"
              class="text-gray-700 font-bold hover:text-blue-500"
              @click="isLoggedIn = true"
              >Sign In</a
            >
          </div>
        </div>
      </div>
    </header>

    <!-- Home -->
    <div class="home" v-if="selectedNavItem === 'home'">
      <!-- Hero Section -->
      <section class="relative mt-6">
        <div class="container mx-auto">
          <div
            class="bg-white p-6 rounded-xl overflow-hidden shadow-md relative"
            style="height: 70vh"
          >
            <div class="slide-show h-full overflow-hidden relative">
              <div
                class="slide-container flex transition-transform duration-500 ease-in-out h-full"
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
        <div class="text-center mb-4 text-gray-700">
          <h2 class="text-2xl font-bold">Search Artworks</h2>
          <p class="text-sm text-gray-700 leading-relaxed">
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
                <div class="flex justify-between items-center text-gray-700">
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
                <p class="text-sm text-gray-700">
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
            v-if="itemsToShow < arts.length"
            @click="showMore"
            class="mt-8 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-all mx-auto"
            style="max-width: fit-content"
          >
            Show More
          </button>
        </div>
      </section>

      <!-- Testimonials -->
      <Testimonials />

      <!-- FAQ -->
      <section class="bg-white py-16 shadow-md rounded-lg" id="faq">
        <div class="container mx-auto px-4 text-gray-800">
          <h2 class="text-4xl text-center font-bold mb-12">FAQ</h2>
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
              <p class="text-gray-700 answer hidden mt-4">
                {{ answer }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Follow Us -->
      <section class="bg-gray-50 py-20 shadow-md rounded-lg">
        <div class="container mx-auto text-center">
          <h2
            class="text-4xl text-gray-900 font-extrabold mb-12 tracking-tighter"
          >
            Stay In Touch!
          </h2>
          <div class="flex justify-center space-x-12">
            <a
              href="#"
              class="text-blue-500 hover:text-blue-600 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
            <a
              href="#"
              class="text-red-600 hover:text-red-700 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-instagram-square"></i>
            </a>
            <a
              href="#"
              class="text-blue-700 hover:text-blue-800 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              href="#"
              class="text-red-500 hover:text-red-600 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-pinterest-square"></i>
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Checkout -->
    <Checkout
      v-if="selectedNavItem === 'checkout'"
      :cartItems="cartItems"
      @goTo="goTo"
    />

    <!-- Notifications -->
    <NotificationsPage
      v-if="selectedNavItem === 'notifications'"
      :notifications="notifications"
    />

    <!-- Orders -->
    <Orders v-if="selectedNavItem === 'orders'" :orders="cartItems" />

    <!-- Our Story -->
    <OurStory v-if="selectedNavItem === 'our-story'" />

    <!-- Team -->
    <Team v-if="selectedNavItem === 'team'" />

    <!-- Contact -->
    <Contact v-if="selectedNavItem === 'contact'" />

    <!-- Terms of Service -->
    <TermsOfService v-if="selectedNavItem === 'terms-of-service'" />

    <!-- Privacy Policy -->
    <PrivacyPolicy v-if="selectedNavItem === 'privacy-policy'" />

    <!-- Pricing -->
    <Pricing v-if="selectedNavItem === 'pricing'" />

    <!-- Footer -->
    <footer class="bg-white text-gray-700 mt-10 border-t border-gray-300">
      <div class="container mx-auto py-12 space-y-8">
        <!-- Top Row: Links and Newsletter -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              class="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2"
            >
              About Us
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'our-story'"
                  >Our Story</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'team'"
                  >Team</a
                >
              </li>
            </ul>
          </div>

          <!-- Support Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2"
            >
              Support
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="#" class="hover:text-blue-400" @click="goTo('contact')"
                  >Contact</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'privacy-policy'"
                  >Privacy Policy</a
                >
              </li>
              <!-- New 'Terms of Service' link -->
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'terms-of-service'"
                  >Terms of Service</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3
              class="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2"
            >
              Newsletter
            </h3>
            <form class="mt-4">
              <input
                type="email"
                placeholder="Email Address"
                class="w-full p-2 rounded-md text-gray-700 border border-gray-300"
              />
              <button
                type="submit"
                class="mt-2 w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white p-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Row: Social Links and Copyright -->
        <div class="flex justify-between items-center">
          <div class="flex space-x-4">
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <div class="text-sm text-gray-700">
            &copy; 2023 PixelHaus. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Testimonials from './Testimonials.vue';
import Checkout from './Checkout.vue';
import NotificationsPage from './Notifications/Page.vue';
import Orders from './Orders.vue';
import OurStory from './OurStory.vue';
import Team from './Team.vue';
import Contact from './Contact.vue';
import TermsOfService from './TermsOfService.vue';
import PrivacyPolicy from './PrivacyPolicy.vue';
import Pricing from './Pricing.vue';
import data from '../data.js';

export default {
  components: {
    Testimonials,
    Checkout,
    NotificationsPage,
    Orders,
    OurStory,
    Team,
    Contact,
    TermsOfService,
    PrivacyPolicy,
    Pricing,
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
      selectedNavItem: 'home',
      displayedArts: [],
      showMoreButton: true,
      itemsToShow: 9,
      step: 12,
      cart: [],
      notification: null,
      timeout: null,
      isSidebarHidden: false,
      selectedCategory: 'Popular',
      isLoggedIn: false, // Add this data property
      showDropdown: false,
      openModal: null,
      notifications: [
        {
          id: 'n1',
          message: 'Your order #123456789 has been confirmed',
          type: 'order',
          time: '1d',
          dateOrder: 1,
          read: false,
        },
        {
          id: 'n2',
          message: 'Your order #987654321 has been shipped',
          type: 'order',
          time: '2d',
          dateOrder: 2,
          read: false,
        },
        {
          id: 'n3',
          message: 'Your wall art is due for return',
          type: 'reminder',
          time: '2w',
          dateOrder: 14,
          read: false,
        },
        {
          id: 'n4',
          message: 'Shipping update for order #1122334455',
          type: 'order',
          time: '9/20',
          dateOrder: 80,
          read: false,
        },
        {
          id: 'n5',
          message: 'Monthly auto-pay reminder',
          type: 'reminder',
          time: '8/23',
          dateOrder: 75,
          read: true,
        },
        {
          id: 'n6',
          message: 'Your wall art is due for return',
          type: 'reminder',
          time: '8/05',
          dateOrder: 21,
          read: true,
        },
        {
          id: 'n7',
          message: 'Your order #3344556677 has been delivered',
          type: 'order',
          time: '7/30',
          dateOrder: 70,
          read: true,
        },
        {
          id: 'n8',
          message: 'Your subscription has been renewed',
          type: 'reminder',
          time: '7/15',
          dateOrder: 55,
          read: true,
        },
        {
          id: 'n9',
          message: 'Your order #1213141516 is on its way',
          type: 'order',
          time: '7/10',
          dateOrder: 50,
          read: true,
        },
        {
          id: 'n10',
          message: 'Return window for order #1213141516 closing soon',
          type: 'reminder',
          time: '7/05',
          dateOrder: 45,
          read: true,
        },
        {
          id: 'n11',
          message: 'Payment confirmation for order #1718192021',
          type: 'order',
          time: '6/15',
          dateOrder: 30,
          read: true,
        },
        {
          id: 'n12',
          message: 'Auto-pay reminder for your subscription',
          type: 'reminder',
          time: '6/10',
          dateOrder: 25,
          read: true,
        },
        {
          id: 'n13',
          message: 'Your order #2223242526 has been canceled',
          type: 'order',
          time: '6/05',
          dateOrder: 20,
          read: true,
        },
        {
          id: 'n14',
          message: 'Payment failed for order #2627282920',
          type: 'order',
          time: '5/30',
          dateOrder: 15,
          read: true,
        },
        {
          id: 'n15',
          message: 'Subscription expiration reminder',
          type: 'reminder',
          time: '5/15',
          dateOrder: 10,
          read: true,
        },
        {
          id: 'n16',
          message: 'Your order #3031323334 has been confirmed',
          type: 'order',
          time: '5/10',
          dateOrder: 5,
          read: true,
        },
      ],
      cartItems: [
        {
          id: '1234567890',
          name: 'Wall Art - Nature',
          cost: 19.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?art',
          material: 'Poster',
          size: 'Small',
          dimensions: '8"x10"',
          quantity: 1,
        },
        {
          id: '2345678901',
          name: 'Wall Art - Abstract',
          cost: 24.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?painting',
          material: 'Canvas',
          size: 'Medium',
          dimensions: '16"x20"',
          quantity: 2,
        },
        {
          id: '3456789012',
          name: 'Wall Art - Modern',
          cost: 21.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?sculpture',
          material: 'Poster',
          size: 'Large',
          dimensions: '24"x36"',
          quantity: 1,
        },
        {
          id: '4567890123',
          name: 'Wall Art - Parenting',
          cost: 19.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?parents',
          material: 'Poster',
          size: 'Small',
          dimensions: '8"x10"',
          quantity: 1,
        },
        {
          id: '5678901234',
          name: 'Wall Art - Puerto Rico',
          cost: 24.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?puertorico',
          material: 'Canvas',
          size: 'Medium',
          dimensions: '16"x20"',
          quantity: 2,
        },
        {
          id: '6789012345',
          name: 'Wall Art - Culture',
          cost: 21.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?culture',
          material: 'Poster',
          size: 'Large',
          dimensions: '24"x36"',
          quantity: 1,
        },
      ],
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
    subtotal() {
      return this.cartItems
        .reduce((acc, item) => acc + item.cost, 0)
        .toFixed(2);
    },
  },
  methods: {
    goTo(section) {
      if (section === 'home') {
        window.location.href = '/';
      }

      this.openModal = null;
      this.selectedNavItem = section;
    },
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
    logout() {
      this.isLoggedIn = false;

      this.goTo('home');
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

.material-icons.large-icon {
  font-size: 50px; /* Further adjust the size */
}
</style>
