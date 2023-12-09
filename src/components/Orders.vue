<template>
  <div class="min-w-screen min-h-screen max-w-6xl mx-auto bg-gray-100 py-12">
    
    <!-- Breadcrumbs -->
    <div class="px-4 sm:px-8 mb-8">
      <h1
        class="text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-700 text-center"
      >
        My Orders
      </h1>
      <div class="mt-2 flex justify-start text-gray-500">
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        <span class="mx-2">/</span>
        <span class="text-gray-700">My Orders</span>
      </div>
    </div>

    <!-- Orders -->
    <div class="p-6 mx-auto w-full md:w-11/12">
      <div class="mx-auto w-full md:w-3/4">
        <div v-if="orders.length === 0" class="text-center py-20">
          <p class="text-xl md:text-2xl font-semibold text-gray-500">
            No Orders Yet
          </p>
        </div>
        <div v-else>
          <div
            v-for="order in orders"
            :key="order.id"
            @click="order.showTimeline = !order.showTimeline"
            class="flex flex-col space-y-4 mb-6 bg-white p-6 rounded-lg hover:bg-gray-50 transition shadow-lg cursor-pointer w-full"
          >
            <div class="flex items-center space-x-4">
              <i class="material-icons text-2xl text-blue-500">shopping_cart</i>
              <div class="flex-grow">
                <div class="flex justify-between items-center">
                  <span class="block lg:text-lg font-semibold text-gray-700">
                    Order #{{ order.id }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-semibold',
                      order.shipping.delivered
                        ? 'bg-green-200 text-green-700'
                        : 'bg-yellow-200 text-yellow-700',
                    ]"
                  >
                    {{ orderStatus(order) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-300 pt-4">
              <div>
                <div
                  v-for="orderArt in order.arts"
                  class="flex items-center space-x-4 mb-6 relative"
                >
                  <div class="relative">
                    <img
                      :src="orderArt.image"
                      alt="image"
                      class="w-12 h-12 object-cover rounded"
                    />
                    
                    <!-- Badge for Quantity -->
                    <span
                      class="absolute bottom-0 right-0 bg-blue-500 text-white text-xs rounded-full px-1"
                    >
                      {{ orderArt.quantity > 1 ? 'x' + orderArt.quantity : '' }}
                    </span>
                  </div>
                  <div>
                    <span class="font-medium">{{ orderArt.title }}</span>
                    <div class="flex flex-col text-sm text-gray-500">
                      <span
                        >{{ orderArt.category }}, {{ orderArt.size }} ({{
                          dimensions[orderArt.size]
                        }})</span
                      >
                      <span>{{ orderArt.duration }}-Months</span>
                    </div>
                  </div>

                  <!-- Art Cost -->
                  <div class="absolute right-9 ml-auto">
                    <span class="font-medium text-gray-800">
                      ${{ calculateArtCost(orderArt)?.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Display total cost for the order -->
              <div class="mt-4 text-right mr-8">
                <span class="text-lg font-semibold text-gray-800">
                  Total: ${{ totalOrderCost(order)?.toFixed(2) }}
                </span>
              </div>

              <!-- Shipping Info -->
              <div v-if="order.showTimeline" class="space-y-4 mt-4">
                
                <!-- Shipping Updates Title -->
                <div
                  class="text-lg font-bold text-gray-700 mb-2 text-center uppercase"
                >
                  Shipping Updates
                </div>

                <!-- Shipping Info Details -->
                <div class="flex flex-col items-start ml-8">
                  
                  <!-- Order Confirmed -->
                  <div class="flex mb-2">
                    <div class="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                    <div class="ml-4">
                      <div class="text-sm font-semibold">Order Confirmed</div>
                      <div class="text-xs text-gray-500">
                        {{ formatDate(order.shipping.confirmed) }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- In Transit -->
                  <div class="flex mb-2">
                    <div class="w-2 h-2 mt-1.5 rounded-full bg-yellow-400"></div>
                    <div class="ml-4">
                      <div class="font-semibold text-sm">In Transit</div>
                      <div class="text-xs text-gray-500">
                        {{ formatDate(order.shipping.in_transit) }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Delivered -->
                  <div class="flex mb-2">
                    <div class="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                    <div class="ml-4">
                      <div class="font-semibold text-sm">Delivered</div>
                      <div class="text-xs text-gray-500">
                        {{ formatDate(order.shipping.delivered) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Subtle Hint Section -->
              <div v-else class="flex">
                <span class="text-xs text-gray-400 italic"
                  >+ {{ isMobile ? 'Tap' : 'Click' }} for shipping info</span
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
import data from '../data.js';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    this.orders = data.orders.reduce((acc, item) => {
      console.log('item', item);
      if (!acc[item.order_id]) {
        acc[item.order_id] = {
          id: item.order_id,
          user_id: item.user_id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          arts: [],
          total: Number(item.total),
          status: item.status,
          shipping: {
            tracking_number: item.tracking_number,
            confirmed: item.shipping.confirmed,
            in_transit: item.shipping.in_transit,
            delivered: item.shipping.delivered,
          },
        };
      }
      acc[item.order_id].arts.push({
        art_id: item.art_id,
        title: item.title,
        image: item.image,
        description: item.description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        category: item.category,
        size: item.size,
        quantity: item.quantity,
        duration: item.duration,
      });
      return acc;
    }, {});
  },
  data() {
    return {
      orders: [],
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
      shippingUpdates: [
        { status: 'Order Received', date: '2023-09-24', time: '11:05' },
        { status: 'Preparing', date: '2023-09-25', time: '13:25' },
        { status: 'In Transit', date: '2023-09-26', time: '15:00' },
        { status: 'Delivered', date: '2023-09-28', time: '17:20' },
      ],
    };
  },
  computed: {
    totalOrderCost() {
      return (order) => {
        return order.arts.reduce((total, art) => {
          return total + this.calculateArtCost(art);
        }, 0);
      };
    },
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
    orderStatus(order) {
      let status;

      console.log(order);

      if (order.shipping.confirmed) {
        status = 'Confirmed';
      }

      if (order.shipping.in_transit) {
        status = 'In Transit';
      }

      if (order.shipping.delivered) {
        status = 'Delivered';
      }

      return status;
    },
    calculateArtCost(orderArt) {
      const artCost =
        this.cost[orderArt.category][orderArt.duration][orderArt.size];
      return artCost * orderArt.quantity;
    },
  },
};
</script>
