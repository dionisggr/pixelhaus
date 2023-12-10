<template>
  <!-- Header -->
  <header
    class="bg-white shadow-md text-gray-700 p-4 md:p-6 absolute top-0 left-0 right-0 z-20"
    :class="{ 'sticky top-0 z-50': isMobile }"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo and Title -->
      <div
        class="flex items-center space-x-4 cursor-pointer"
        @click="goTo('home')"
      >
        <i class="material-icons text-4xl pr-0 text-blue-500">border_all</i>
        <h1 class="text-2xl font-semibold">PixelHaus</h1>
      </div>

      <!-- Nav Links -->
      <div
        class="justify-between w-1/3 space-x-4"
        :class="isMobile ? 'hidden' : 'flex'"
      >
        <a
          href="#how-it-works"
          class="text-gray-700 font-bold hover:text-blue-500"
          @click="goTo('how-it-works')"
          >How It Works</a
        >
        <a
          href="#pricing"
          class="text-gray-700 font-bold hover:text-blue-500"
          @click="goTo('pricing')"
          >Pricing</a
        >
      </div>

      <!-- Hamburger Menu -->
      <div v-if="isMobile" class="lg:hidden flex items-center space-x-5">
        <i
          class="material-icons text-2xl cursor-pointer hover:text-blue-500"
          @click="showNavSidebar = !showNavSidebar"
          >menu</i
        >
      </div>
      <div v-else class="flex items-center space-x-5">
        <a
          v-if="!user?.id"
          href="#"
          class="text-gray-700 font-bold hover:text-blue-500"
          @click="$emit('demo')"
          >Demo</a
        >
        <!-- Notifications -->
        <div v-else class="relative flex items-center">
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500 mb-0.5"
            @click="
              openModal = openModal === 'notifications' ? null : 'notifications'
            "
          >
            notifications
          </i>

          <!-- Blue Dot for Unread Notifications -->
          <span
            v-if="notifications?.some((notification) => !notification.is_read)"
            class="absolute bottom-1.5 right-0 w-2.5 h-2.5 bg-blue-500 shadow-lg rounded-full"
          ></span>
        </div>
        <div
          v-if="openModal === 'notifications'"
          @mouseenter="resetTimeout"
          @mouseleave="markNotificationsRead"
          class="absolute top-16 right-10 w-96 bg-white rounded-lg shadow-md p-4 border-l border-r border-gray-300"
        >
          <div class="border-b-2 border-gray-200 pb-2 mb-4">
            <h3 class="text-2xl font-extrabold text-gray-800">Notifications</h3>
          </div>
          <div class="overflow-y-auto max-h-72">
            <div
              v-if="notifications?.length === 0"
              class="text-center text-gray-700"
            >
              No Notifications
            </div>

            <!-- Notifications List -->
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex items-center space-x-4 mb-4 rounded-lg p-3 transition cursor-pointer"
              :class="{
                'bg-gray-50 hover:bg-gray-100': notification.is_read,
                'bg-yellow-50 hover:bg-yellow-100': !notification.is_read,
              }"
            >
              <i
                :class="{
                  'material-icons text-blue-500': notification.type === 'order',
                  'material-icons text-yellow-500':
                    notification.type === 'reminder',
                }"
              >
                {{ getNotificationIcon(notification.type) }}
              </i>
              <div class="flex-grow">
                <span class="block text-sm font-medium text-gray-700">
                  {{ notification.message }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ formatDate(notification.created_at) }}
                </span>
              </div>
            </div>
          </div>
          <hr v-if="notifications?.length > 0" class="my-4" />
          <div v-if="notifications?.length > 0" class="flex justify-center">
            <a
              href="#"
              class="inline-block whitespace-nowrap w-1/2 text-center text-white bg-blue-600 hover:bg-blue-700 p-1.5 rounded-full text-sm"
              @click="goTo('notifications')"
            >
              See All Notifications
            </a>
          </div>
        </div>

        <!-- Shopping Cart -->
        <i
          v-if="user?.id"
          class="material-icons text-2xl cursor-pointer hover:text-blue-500"
          @click="openModal = openModal === 'cart' ? null : 'cart'"
        >
          shopping_cart
        </i>
        <div
          v-if="openModal === 'cart'"
          class="absolute top-16 right-12 w-96 bg-white rounded-lg shadow-md z-20 p-4 border-l border-r border-gray-300"
        >
          <div class="border-b-2 border-gray-300 pb-2 mb-6">
            <h3 class="text-2xl font-extrabold text-gray-700">Your Cart</h3>
          </div>
          <div class="overflow-y-auto pr-4 max-h-72">
            <div
              v-for="item in cart?.arts"
              :key="item.id"
              class="mb-6 relative"
            >
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img
                    :src="item.image"
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
                  <span class="font-medium">{{ item.title }}</span>
                  <span class="text-sm text-gray-500 block">
                    {{ item.category }}, {{ item.size }} ({{
                      dimensions[item.size]
                    }})
                  </span>
                  <span class="text-xs text-gray-500 block">
                    {{ item.duration }}-Months
                  </span>
                </div>

                <button
                  @click="prepareRemoval(item)"
                  class="absolute right-0 top-1 text-sm text-red-500 hover:text-red-700"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="text-gray-700 flex justify-between items-end">
                <span class="text-xs"># {{ getRandomId() }}</span>
                <span
                  >${{
                    (
                      cost[item.category]?.[item.duration]?.[item.size] *
                      item.quantity
                    )?.toFixed(2)
                  }}</span
                >
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
            @click="goTo('checkout')"
            class="block w-1/2 mx-auto text-center text-white bg-blue-600 hover:bg-blue-700 mt-6 p-1.5 rounded-full text-sm"
          >
            Checkout
          </a>
        </div>

        <div class="border-l-2 h-6 mx-4"></div>

        <!-- Account -->
        <div v-if="user?.id" class="relative">
          <img
            src="https://source.unsplash.com/random/50x50?face"
            alt="User Thumbnail"
            class="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
            @click="openModal = openModal === 'account' ? null : 'account'"
          />
          <div
            v-if="openModal === 'account'"
            @mouseleave="openModal = null"
            class="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-md z-10"
          >
            <a
              v-if="!isAdmin"
              href="#"
              class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              @click="goTo('profile')"
            >
              My Profile
            </a>
            <a
              v-if="isAdmin"
              href="#"
              class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              @click="goTo('upload')"
            >
              All Arts
            </a>
            <a
              v-if="isAdmin"
              href="#"
              class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              @click="goTo('all-orders')"
            >
              All Orders
            </a>
            <a
              v-else
              href="#"
              class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              @click="goTo('orders')"
            >
              My Orders
            </a>
            <a
              href="#"
              class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              @click="$emit('logout')"
            >
              Logout
            </a>
          </div>
        </div>

        <a
          v-else
          href="#"
          class="text-gray-700 font-bold hover:text-blue-500"
          @click="$emit('sign-in')"
          >Login</a
        >
      </div>
    </div>

    <div
      v-if="showNavSidebar"
      class="overlay"
      @click="showNavSidebar = false"
    ></div>

    <transition name="slide-right">

      <!-- Sidebar Navigation -->
      <div
        v-if="showNavSidebar"
        class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg rounded-lg z-20 p-2 lg:hidden transition-all duration-300"
      >
        <div class="flex justify-between items-center mb-6 border-b-2 p-2 pb-3">
          <span class="text-lg font-bold" @click="goTo('home')">PixelHaus</span>
          <i
            class="material-icons text-lg cursor-pointer hover:text-blue-500 transition-colors duration-300"
            @click="showNavSidebar = !showNavSidebar"
            >close</i
          >
        </div>

        <!-- Navigation Links -->
        <nav v-if="isLoggedIn" class="space-y-3">
          <a
            href="#how-it-works"
            class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
            @click="
              goTo('profile');
              showNavSidebar = false;
            "
            >My Profile</a
          >
          <a
            href="#pricing"
            class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
            @click="
              goTo('orders');
              showNavSidebar = false;
            "
            >My Orders</a
          >
          <a
            href="#"
            class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
            @click="
              $emit('logout');
              showNavSidebar = false;
            "
            >Logout</a
          >
        </nav>
        <nav v-else class="space-y-3 mt-10">
          <a
            href="#how-it-works"
            class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
            @click="
              goTo('how-it-works');
              showNavSidebar = false;
            "
            >How It Works</a
          >
          <a
            href="#pricing"
            class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
            @click="
              goTo('pricing');
              showNavSidebar = false;
            "
            >Pricing</a
          >
          <a
            href="#sign-in"
            class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
            @click="
              isLoggedIn = true;
              goTo('home');
              showNavSidebar = false;
            "
            >Sign In</a
          >
        </nav>

        <!-- Notifications -->
        <div
          class="flex items-center space-x-4 mt-6 ml-2 hover:shadow-md active:shadow-md p-4"
          :class="{ 'opacity-50 cursor-not-allowed': !isLoggedIn }"
          @click="
            goTo('notifications');
            showNavSidebar = false;
          "
        >
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
            @click="
              openModal = openModal === 'notifications' ? null : 'notifications'
            "
            >notifications</i
          >
          <span class="font-medium">Notifications</span>
        </div>

        <!-- Cart -->
        <div
          class="flex items-center space-x-4 ml-2 hover:shadow-md active:shadow-md p-4"
          :class="{ 'opacity-50 cursor-not-allowed': !isLoggedIn }"
          @click="
            goTo('checkout');
            showNavSidebar = false;
          "
        >
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
            @click="openModal = openModal === 'cart' ? null : 'cart'"
            >shopping_cart</i
          >
          <span class="font-medium">Cart</span>
        </div>
      </div>
    </transition>
  </header>

  <!-- Confirmation Modal -->
  <div
    v-if="wallArtToRemove"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-4 rounded-lg">
      <p>
        Are you sure you want to remove
        <b>{{ wallArtToRemove.title }}</b> from your cart?
      </p>
      <div class="flex justify-end mt-4">
        <button
          @click="wallArtToRemove = null"
          class="mr-2 px-4 py-2 rounded text-white bg-gray-500"
        >
          Cancel
        </button>
        <button
          @click="confirmWallArtRemoval"
          class="px-4 py-2 rounded text-white bg-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
    notifications: {
      type: Array,
      default: () => [],
    },
    cart: {
      type: Object,
      default: () => ({
        arts: [],
      }),
    },
  },
  data() {
    return {
      isMobile: false,
      showNavSidebar: false,
      openModal: null,
      isLoggedIn: false,
      dimensions: {
        Small: '14" x 11"',
        Medium: '24" x 18"',
        Square: '24" x 24"',
        Large: '40" x 30"',
      },
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
    subtotal() {
      return this.cart.arts
        ?.reduce(
          (acc, item) =>
            acc +
            this.cost[item.category]?.[item.duration]?.[item.size] * item.quantity,
          0
        )
        .toFixed(2);
    },
  },
  methods: {
    goTo(section) {
      this.$emit('go-to', section);

      if (this.isMobile) {
        this.showNavSidebar = false;
      }

      window.scrollTo(0, 0);
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth < 768;
    },
    toggleNavSidebar() {
      this.showNavSidebar = !this.showNavSidebar;
    },
    markNotificationsRead() {
      this.$emit(
        'set-notifications',
        this.notifications.map((notification) => {
          notification.is_read = true;

          return notification;
        })
      );
    },
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
    getNotificationIcon(type) {
      switch (type) {
        case 'order':
          return 'shopping_cart';
        case 'payment':
          return 'payment';
        case 'message':
          return 'message';
        case 'review':
          return 'star';
        default:
          return 'info';
      }
    },
    getRandomId() {
      return Math.floor(100000000000 + Math.random() * 900000000000);
    },
    prepareRemoval(art) {
      this.wallArtToRemove = art;

      this.$forceUpdate();
    },
    confirmWallArtRemoval() {
      const match = this.cart.arts.find((art, index) => {
        return (
          art.id === this.wallArtToRemove.id &&
          art.duration === this.wallArtToRemove.duration &&
          art.size === this.wallArtToRemove.size &&
          art.category === this.wallArtToRemove.category
        );
      });

      if (match.quantity > 1) {
        match.quantity--;
      } else {
        this.cart.arts.splice(this.cart.arts.indexOf(match), 1);
      }

      this.wallArtToRemove = null;
    },
  },
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