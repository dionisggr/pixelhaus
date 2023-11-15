<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Orders</h1>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th class="w-2/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th class="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th class="w-1/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Status</th>
                  <th class="w-3/12 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-100 cursor-pointer">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{{ formatDate(order.created_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{{ order.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{{ order.user_id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">${{ order.total?.toFixed(2) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">{{ order.status }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{{ getShippingStatus(order) }}</span>
                  </td>

                  <!-- Action -->
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div v-if="!order.confirmed">
                      <button @click="confirmOrder(order)" class="text-indigo-600 hover:text-indigo-900 border bg-indigo-100 rounded-lg px-2 py-0.5">Confirm Order</button>
                    </div>
                    <div v-else-if="!order.in_transit">
                      <input v-model="order.trackingNumber" type="text" placeholder="Tracking Number" class="mr-2 p-1 border rounded"/>
                      <button @click="shipOrder(order)" :disabled="!order.trackingNumber" class="text-white py-0.5 px-2 hover:text-indigo-900 border rounded-lg bg-blue-500">Shipped</button>
                    </div>
                    <div v-else-if="!order.delivered">
                      <button @click="deliverOrder(order)" class="border rounded-lg bg-green-500 py-0.5 px-2 text-white">Delivered</button>
                    </div>
                    <div v-else class="cursor-not-allowed text-gray-400">
                      N/A
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import service from '../../service.js';

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
    };
  },
  async mounted() {
    try {
      this.orders = await service.getAllOrders();

      console.log(this.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  methods: {
    async confirmOrder(order) {
      order.confirmed = new Date().toISOString();

      try {
        await service.sendNotification({
          user_id: order.user_id,
          message: `Your order ${order.id} was received! It will be shipped soon.`,
          type: 'order',
        });
      } catch (error) {
        console.error('Error confirming order:', error);
      }
    },
    async shipOrder(order) {
      if (!order.trackingNumber) return;

      order.in_transit = new Date().toISOString();

      await service.sendNotification({
          user_id: order.user_id,
          message: `Your order ${order.id} was shipped! Tracking number: ${order.trackingNumber}`,
          type: 'order',
        });
    },
    async deliverOrder(order) {
      order.delivered = new Date().toISOString();

      await service.sendNotification({
          user_id: order.user_id,
          message: `Your order ${order.id} was delivered! Enjoy!`,
          type: 'order',
        });
    },
    getShippingStatus(order) {
      if (order.delivered) return 'Delivered';
      if (order.in_transit) return 'In Transit';
      if (order.confirmed) return 'Confirmed';
      return 'Pending';
    },
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
  }
};
</script>
