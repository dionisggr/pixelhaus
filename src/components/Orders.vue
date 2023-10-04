<template>
  <div class="min-w-screen min-h-screen bg-gray-100 py-12">
    <!-- Header and Breadcrumbs -->
    <div class="px-8 mb-4">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        My Orders
      </h1>
      <div class="mt-2 ml-32 text-gray-500">
        <a href="#" @click="$emit('goTo', 'home')" class="hover:underline"
          >Home</a
        >
        /
        <span class="text-gray-700">My Orders</span>
      </div>
    </div>

    <div class="p-6 mx-auto w-11/12">
      <!-- Main Content -->
      <div class="p-6 mx-auto w-3/4">
        <div v-if="orders.length === 0" class="text-center py-20">
          <p class="text-2xl font-semibold text-gray-500">No Orders Yet</p>
        </div>
        <div v-else>
          <div
            v-for="item in orders"
            :key="item.id"
            @click="item.showTimeline = !item.showTimeline"
            class="flex flex-col space-y-4 mb-6 bg-white p-6 rounded-lg hover:bg-gray-50 transition shadow-lg cursor-pointer w-full"
          >
            <div class="flex items-center space-x-4">
              <i class="material-icons text-2xl text-blue-400">shopping_cart</i>
              <div class="flex-grow">
                <div class="flex justify-between items-center">
                  <span class="block text-lg font-semibold text-gray-700">
                    Order #{{ item.id }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-semibold',
                      item.deliveredDate
                        ? 'bg-green-200 text-green-700'
                        : 'bg-yellow-200 text-yellow-700',
                    ]"
                  >
                    {{ item.deliveredDate ? 'Delivered' : 'In Transit' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-300 pt-4">
              <div>
                <div class="flex items-center space-x-4 mb-6">
                  <div class="relative">
                    <img
                      :src="item.thumbnail"
                      alt="thumbnail"
                      class="w-12 h-12 object-cover rounded"
                    />
                    <!-- Badge for Quantity -->
                    <span
                      class="absolute bottom-0 right-0 bg-blue-500 text-white text-xs rounded-full px-1"
                    >
                      {{ item.quantity > 1 ? 'x' + item.quantity : '' }}
                    </span>
                  </div>
                  <div>
                    <span class="font-medium">{{ item.name }}</span>
                    <div class="flex flex-col text-sm text-gray-500">
                      <span>{{ item.material }}, {{ item.size }}</span>
                      <span>{{ item.dimensions }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.showTimeline" class="space-y-4 mt-4">
                <div
                  v-for="(update, index) in item.shippingUpdates"
                  :key="index"
                  class="flex items-center"
                >
                  <div
                    :class="`w-2 h-2 rounded-full mt-1 ${
                      !item.deliveredDate &&
                      index === item.shippingUpdates.length - 1
                        ? 'bg-yellow-400'
                        : 'bg-green-500'
                    }`"
                  ></div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold">
                      {{ update.status }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ formatDate(update.date) }} at
                      {{ formatTime(update.time) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Subtle Hint Section -->
              <div v-else class="flex justify-end">
                <span class="text-xs text-gray-400 italic"
                  >+ Click for shipping info</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      orders: [
        {
          id: '1234567890',
          name: 'Wall Art - Nature',
          cost: 19.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?art',
          material: 'Poster',
          size: 'Small',
          dimensions: '8"x10"',
          quantity: 1,
          shippingUpdates: [
            { status: 'Order Received', date: '2023-09-24', time: '15:23' },
            { status: 'Preparing', date: '2023-09-25', time: '10:43' },
            { status: 'In Transit', date: '2023-09-26', time: '12:30' },
          ],
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
          deliveredDate: '2023-09-28',
          shippingUpdates: [
            { status: 'Order Received', date: '2023-09-24', time: '08:30' },
            { status: 'Preparing', date: '2023-09-25', time: '11:45' },
            { status: 'In Transit', date: '2023-09-26', time: '13:15' },
            { status: 'Delivered', date: '2023-09-28', time: '14:55' },
          ],
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
          deliveredDate: '2023-09-28',
          shippingUpdates: [
            { status: 'Order Received', date: '2023-09-24', time: '09:20' },
            { status: 'Preparing', date: '2023-09-25', time: '10:50' },
            { status: 'In Transit', date: '2023-09-26', time: '14:00' },
            { status: 'Delivered', date: '2023-09-28', time: '16:05' },
          ],
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
          deliveredDate: '2023-09-28',
          shippingUpdates: [
            { status: 'Order Received', date: '2023-09-24', time: '09:15' },
            { status: 'Preparing', date: '2023-09-25', time: '11:20' },
            { status: 'In Transit', date: '2023-09-26', time: '12:45' },
            { status: 'Delivered', date: '2023-09-28', time: '14:00' },
          ],
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
          deliveredDate: '2023-09-28',
          shippingUpdates: [
            { status: 'Order Received', date: '2023-09-24', time: '10:30' },
            { status: 'Preparing', date: '2023-09-25', time: '12:40' },
            { status: 'In Transit', date: '2023-09-26', time: '14:10' },
            { status: 'Delivered', date: '2023-09-28', time: '15:30' },
          ],
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
          deliveredDate: '2023-09-28',
        },
      ],
      shippingUpdates: [
        { status: 'Order Received', date: '2023-09-24', time: '11:05' },
        { status: 'Preparing', date: '2023-09-25', time: '13:25' },
        { status: 'In Transit', date: '2023-09-26', time: '15:00' },
        { status: 'Delivered', date: '2023-09-28', time: '17:20' },
      ],
    };
  },
  methods: {
    formatTime(time) {
      return dayjs()
        .hour(time.split(':')[0])
        .minute(time.split(':')[1])
        .format('h:mm A');
    },
    formatDate(date) {
    return dayjs(date).format('MMM D, YYYY');
  },
  },
};
</script>
