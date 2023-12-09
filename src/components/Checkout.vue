<template>
  <div
    class="min-w-screen min-h-screen bg-gray-100 py-12"
    :class="{ 'px-4': isMobile }"
  >
    <!-- Breadcrumbs -->
    <div class="px-4 sm:px-8 mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Checkout
      </h1>
      <div
        class="mt-2 flex justify-center md:justify-start md:ml-32 text-gray-500"
      >
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        <span class="mx-2">/</span>
        <span class="text-gray-700">Checkout</span>
      </div>
    </div>

    <!-- Main Checkout Section -->
    <div
      class="max-w-6xl mx-auto bg-white border rounded-xl shadow-md px-4 sm:px-8 py-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">

        <!-- Cart (Left) -->
        <div>
          <h2
            class="text-xl font-semibold mb-4 text-gray-700 flex items-center space-x-2"
          >
            <i class="fas fa-shopping-cart"></i>
            
            <!-- Cart Icon -->
            <span>Cart Items</span>
          </h2>
          <div
            v-for="item in cart.arts"
            :key="item.cart_id"
            class="mb-6 border-b-2 border-gray-200 pb-4"
          >
            <div class="flex items-center">
              <div class="relative">
                <img
                  :src="item.image"
                  alt="item.name"
                  class="w-24 h-24 object-cover rounded-md shadow"
                />
                <span
                  class="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                >
                  x{{ item.quantity }}
                </span>
              </div>
              <div class="ml-4 flex-1 mt-2">
                <h6 class="font-semibold text-gray-700">{{ item.title }}</h6>
                <p class="text-gray-500">
                  {{ item.category }}, {{ item.size }} ({{
                    dimensions[item.size]
                  }})
                </p>
                <span class="font-semibold text-gray-700 text-lg"
                  >${{
                    (
                      cost[item.category][item.duration][item.size] *
                      item.quantity
                    )?.toFixed(2)
                  }}</span
                >
                <p class="text-xs mt-2"># {{ getRandomId() }}</p>
              </div>
              <button
                @click="prepareRemoval(item)"
                class="text-red-500 hover:text-red-700"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Discount -->
          <div class="flex items-center mb-6">
            <div class="flex-grow mr-4">
              <label
                for="discountCode"
                class="block text-sm font-medium text-gray-700"
                >Discount code</label
              >
              <input
                v-model="discountCode"
                id="discountCode"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              @click="applyDiscount"
              class="py-2 mt-6 px-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition duration-300"
            >
              Apply
            </button>
          </div>

          <!-- Order Summary -->
          <div class="border-t-2 border-gray-200 pt-6 text-gray-800">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 font-medium">Subtotal</span>
              <span class="font-semibold text-lg pl-3">
                ${{ subtotal.toFixed(2) }}
              </span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 font-medium">Tax (GST 10%)</span>
              <span class="font-semibold text-lg pl-3">
                ${{ taxes.toFixed(2) }}
              </span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600 font-medium">Shipping</span>
              <span class="font-semibold text-lg pl-3">
                ${{ shippingCosts[shippingSpeed].toFixed(2) }}
              </span>
            </div>
            <div
              class="flex justify-between items-center font-bold border-t pt-4 text-xl"
            >
              <span class="text-gray-600">Total</span>
              <span class="font-semibold pl-3">
                <span class="text-gray-400 text-sm mr-1">USD</span> ${{
                  total.toFixed(2)
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right - Billing & Shipping -->
        <div class="space-y-16">
          
          <!-- User Information -->
          <div class="mb-6">
            <h2
              class="text-xl font-semibold mb-4 text-gray-700 flex items-center space-x-2 border-b pb-2"
            >
              <i class="fas fa-address-card"></i>

              <!-- User Info Icon -->
              <span>Billing & Shipping Info</span>
            </h2>

            <div class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="userFirstName"
                    class="block text-sm font-medium text-gray-700"
                    >First Name</label
                  >
                  <input
                    v-model="user.firstName"
                    id="userFirstName"
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label
                    for="userLastName"
                    class="block text-sm font-medium text-gray-700"
                    >Last Name</label
                  >
                  <input
                    v-model="user.lastName"
                    id="userLastName"
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label
                    for="userPhone"
                    class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <input
                    v-model="user.phone"
                    id="userPhone"
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label
                    for="userPhone"
                    class="block text-sm font-medium text-gray-700"
                    >Phone (Optional)</label
                  >
                  <input
                    v-model="user.phone"
                    id="userPhone"
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>

            <div class="mt-8">
              <label for="userAddress" class="block font-semibold text-gray-700"
                >Billing Address</label
              >
              <textarea
                v-model="user.address"
                id="userAddress"
                rows="3"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="123 Street, City, Country"
              ></textarea>
            </div>

            <!-- Shipping Address -->
            <div class="my-4">
              <label
                for="shippingAddress"
                class="block font-semibold text-gray-700"
                >Shipping Address</label
              >
              <div class="flex items-center mt-2">
                <input
                  v-model="sameAsBilling"
                  type="checkbox"
                  id="sameAsBilling"
                  class="form-checkbox"
                />
                <label for="sameAsBilling" class="ml-2">Same as Billing</label>
              </div>
              <textarea
                v-if="!sameAsBilling"
                v-model="shippingAddress"
                id="shippingAddress"
                rows="3"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="123 Street, City, Country"
              ></textarea>
            </div>
          </div>

          <!-- Shipping Options -->
          <div class="mb-6">
            <h2
              class="text-xl font-semibold mb-4 text-gray-700 flex items-center space-x-2 border-b pb-2"
            >
              <i class="fas fa-shipping-fast"></i>
              
              <!-- Shipping Icon -->
              <span>Shipping Options</span>
            </h2>

            <label
              for="shippingSpeed"
              class="block text-sm font-medium text-gray-700"
              >Choose Shipping Speed</label
            >
            <select
              v-model="shippingSpeed"
              id="shippingSpeed"
              class="mt-1 w-full form-select px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="standard">Standard - $5.00 (5-7 days)</option>
              <option value="express">Express - $10.00 (2-3 days)</option>
              <option value="overnight">Overnight - $20.00 (1 day)</option>
            </select>
          </div>

          <!-- Payment Options -->
          <div class="mb-6">
            <h2
              class="text-xl font-semibold mb-4 text-gray-700 flex items-center space-x-2 border-b pb-2"
            >
              <i class="fas fa-wallet"></i>

              <!-- Payment Icon -->
              <span>Payment Method</span>
            </h2>

            <div class="flex space-x-4 mb-4">
              <label class="flex items-center">
                <input
                  v-model="paymentMethod"
                  value="card"
                  type="radio"
                  class="form-radio"
                />
                <span class="ml-2">
                  <i class="fas fa-credit-card text-xl text-blue-500"></i>
                </span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="paymentMethod"
                  value="googlePay"
                  type="radio"
                  class="form-radio"
                />
                <span class="ml-2">
                  <i class="fab fa-google-pay text-4xl text-green-500"></i>
                </span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="paymentMethod"
                  value="applePay"
                  type="radio"
                  class="form-radio"
                />
                <span class="ml-2">
                  <i class="fab fa-apple-pay text-4xl text-black"></i>
                </span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="paymentMethod"
                  value="paypal"
                  type="radio"
                  class="form-radio"
                />
                <span class="ml-2">
                  <i class="fab fa-paypal text-2xl text-blue-600"></i>
                </span>
              </label>
            </div>

            <!-- Card Details -->
            <div v-if="paymentMethod === 'card'">
              <div class="mb-4">
                <label
                  for="cardName"
                  class="block text-sm font-medium text-gray-700"
                  >Name on Card</label
                >
                <input
                  id="cardName"
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Full Name"
                />
              </div>

              <div class="mb-4">
                <label
                  for="expiryDate"
                  class="block text-sm font-medium text-gray-700"
                  >Expiry Date</label
                >
                <input
                  id="expiryDate"
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="MM/YY"
                />
              </div>

              <div class="mb-4">
                <label for="cvc" class="block text-sm font-medium text-gray-700"
                  >CVC</label
                >
                <input
                  id="cvc"
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <!-- Place Order Button -->
          <div class="flex justify-end">
            <button
              @click="startTransaction"
              class="py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition duration-300"
            >
              Place Order
            </button>
          </div>

          <!-- Modal with Loading Spinner -->
          <div
            v-if="isLoading"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div class="bg-white p-8 rounded-lg">
              <div class="flex flex-col items-center">
                <div class="loader"></div>
                <span class="mt-3 text-lg">Processing your payment...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-4 rounded-lg">
      <p>Are you sure you want to remove this item from your cart?</p>
      <div class="flex justify-end mt-4">
        <button
          @click="showModal = false"
          class="mr-2 px-4 py-2 rounded text-white bg-gray-500"
        >
          Cancel
        </button>
        <button
          @click="confirmRemoval"
          class="px-4 py-2 rounded text-white bg-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../service.js';

export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      sameAsBilling: false,
      shippingAddress: '',
      discountCode: '',
      shippingSpeed: 'standard',
      paymentMethod: 'card',
      showModal: false,
      itemToRemove: null,
      user: {
        contact: '',
        address: '',
      },
      dimensions: {
        Small: '14" x 11"',
        Medium: '24" x 18"',
        Square: '24" x 24"',
        Large: '40" x 30"',
      },
      shippingCosts: {
        standard: 5.0,
        express: 10.0,
        overnight: 20.0,
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
      return this.cart.arts.reduce(
        (acc, item) =>
          acc +
          this.cost[item.category][item.duration][item.size] * item.quantity,
        0
      );
    },
    taxes() {
      return this.subtotal * 0.1;
    },
    total() {
      return (
        this.subtotal + this.taxes + this.shippingCosts[this.shippingSpeed]
      );
    },
  },

  methods: {
    preventNavigation(event) {
      event.preventDefault();
      event.returnValue = '';
    },
    prepareRemoval(item) {
      this.itemToRemove = item;
      this.showModal = true;
    },
    startTransaction() {
      this.isLoading = true;
      window.addEventListener('beforeunload', this.preventNavigation);
      this.placeOrder().finally(() => {
        this.isLoading = false;
        window.removeEventListener('beforeunload', this.preventNavigation);
      });
    },
    confirmRemoval() {
      if (this.itemToRemove) {
        const index = this.cart.arts.findIndex(
          (item) =>
            item.cart_id === this.itemToRemove.cart_id &&
            item.size === this.itemToRemove.size &&
            item.category === this.itemToRemove.category &&
            item.duration === this.itemToRemove.duration
        );

        if (index !== -1) {
          if (this.cart.arts[index].quantity > 1) {
            this.cart.arts[index].quantity -= 1;
          } else {
            this.cart.arts.splice(index, 1);
          }
        }

        this.showModal = false;
      }
    },
    getRandomId() {
      return Math.floor(100000000000 + Math.random() * 900000000000);
    },
  },
};
</script>

<style scoped>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #000;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
