<template>
  <div
    class="min-w-screen min-h-screen bg-gray-100 py-12 w-full max-w-6xl mx-auto"
    :class="{ 'px-4': isMobile }"
  >
    <!-- Header and Breadcrumbs -->
    <div v-if="isMobile" class="px-8 mb-4">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Notifications
      </h1>
      <div
        class="mt-2 flex justify-center items-center space-x-2 text-gray-500"
      >
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        <span>/</span>
        <span class="text-gray-700">Notifications</span>
      </div>
    </div>
    <div v-else class="mb-4">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Notifications
      </h1>
      <div
        class="mt-2 flex md:justify-start items-center space-x-2 text-gray-500"
      >
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        <span>/</span>
        <span class="text-gray-700">Notifications</span>
      </div>
    </div>

    <!-- Filters and Search -->
    <div
      class="mb-2 p-4 bg-white rounded-lg shadow-md w-full max-w-6xl mx-auto"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <div class="flex space-x-4" :class="{'py-2': isMobile}">
          <button
            class="text-sm px-6 py-2 rounded-full transition duration-300 ease-in-out"
            :class="{
              'bg-blue-500 text-white': selectedFilter === 'week',
              'bg-gray-200 text-gray-700': selectedFilter !== 'week',
            }"
            @click="toggleFilter('week')"
          >
            This Week
          </button>
          <button
            class="text-sm px-6 py-2 rounded-full transition duration-300 ease-in-out"
            :class="{
              'bg-blue-500 text-white': selectedFilter === 'month',
              'bg-gray-200 text-gray-700': selectedFilter !== 'month',
            }"
            @click="toggleFilter('month')"
          >
            This Month
          </button>
        </div>
        <div class="flex w-full md:w-auto mt-4 md:mt-0 space-x-4">
          <input
            type="text"
            placeholder="Search Notifications..."
            class="p-2 w-full md:w-64 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
    </div>

    <!-- Mark All as Read Button -->
    <button
      @click="markAllAsRead"
      class="ml-auto mr-4 mb-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-1.5 flex items-center justify-center w-fit"
    >
      <i class="material-icons mr-2" style="font-size: 20px">done_all</i>
      Mark All as Read
    </button>

    <!-- Main Content -->
    
    <div class="p-6 w-full md:w-4/5 mx-auto">
          <!-- Informative Message -->
    <div 
      class="px-4 py-1 mb-3 w-3/4 mx-auto text-xs text-center bg-blue-100 text-blue-500 rounded-lg shadow-md"
      v-if="isMobile"
    >
      Tap each for more information.
    </div>
    <div 
      class="px-4 py-2 mb-4 text-center bg-blue-200 text-blue-700 rounded-lg shadow-md"
      v-else
    >
      Click each for more information.
    </div>
      <div v-if="notifications.length === 0" class="text-center py-20">
        <p class="text-2xl font-semibold text-gray-500">No Notifications Yet</p>
      </div>
      <!-- Main Content -->
      <div v-else>
        <div
          v-for="notification in displayedNotifications"
          :key="notification.id"
          @click="toggleDetails(notification.id)"
          class="flex flex-col space-y-4 mb-6 bg-white p-6 rounded-lg hover:bg-gray-50 transition shadow-lg cursor-pointer"
          :class="{
            'border-l-4 border-blue-400': notification.type === 'order',
            'border-l-4 border-yellow-400': notification.type === 'reminder',
            'bg-yellow-50': !notification.read,
          }"
        >
          <div class="flex items-center space-x-4">
            <i :class="iconType(notification.type)" class="text-2xl"></i>
            <div class="flex-grow">
              <div class="flex justify-between items-center">
                <span class="block lg:text-lg font-semibold text-gray-700">
                  {{ notification.message }}
                </span>
                <span
                  class="bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold text-gray-700"
                >
                  {{ notification.time }}
                </span>
              </div>
            </div>

            <div v-if="!notification.read" class="flex items-center space-x-4">
              <button
                @click.stop="markAsRead(notification.id)"
                class="focus:outline-none"
              >
                <i class="material-icons text-blue-600 hover:text-blue-800"
                  >done</i
                >
              </button>
            </div>
          </div>

          <div
            v-if="openedId === notification.id"
            class="border-t border-gray-300 pt-4"
          >
            <!-- Details section (For demonstration purposes, displaying static content) -->
            <div>
              <div class="flex items-center space-x-4 mb-6">
                <img
                  src="https://source.unsplash.com/random/50x50?art"
                  alt="thumbnail"
                  class="w-12 h-12 object-cover rounded"
                />
                <div>
                  <span class="font-medium">Wall Art - Nature</span>
                  <span class="text-sm text-gray-500 block"
                    >Poster, Small (8"x10")</span
                  >
                </div>
              </div>
              <div class="flex justify-between items-end">
                <span class="text-xs"># 1234567890</span>
                <span>$19.99</span>
              </div>
            </div>
          </div>
        </div>

        <button
          v-if="showMoreButton"
          @click="loadMore"
          class="bg-blue-500 hover:bg-blue-700 text-white p-2 px-8 mt-12 rounded-full text-sm mx-auto block"
        >
          Show More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedFilter: '',
      openedId: null,
      visibleCount: 10,
    };
  },
  computed: {
    displayedNotifications() {
      return this.notifications.slice(0, this.visibleCount);
    },
    showMoreButton() {
      return this.visibleCount < this.notifications.length;
    },
  },
  methods: {
    markAllAsRead() {
      this.notifications.forEach((notification) => {
        notification.read = true;
      });
    },
    markAsRead(id) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification) {
        notification.read = true;
      }
    },
    iconType(type) {
      return type === 'order'
        ? 'material-icons text-blue-500'
        : 'material-icons text-yellow-500';
    },
    toggleDetails(id) {
      this.openedId = this.openedId === id ? null : id;
    },
    deleteNotification(id) {
      // Delete Notification Logic
    },
    clearAllNotifications() {
      // Clear All Notifications Logic
    },
    loadMore() {
      this.visibleCount += 10;
    },
    toggleFilter(filter) {
      if (this.selectedFilter === filter) {
        this.selectedFilter = null;
      } else {
        this.selectedFilter = filter;
      }
    },
  },
};
</script>
