<template>
  <div class="how-it-works" :class="isMobile ? 'p-4 py-8' : 'p-12'">
    <!-- Breadcrumbs -->
    <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
            How It Works
        </h1>
        <div class="mt-2 flex justify-center items-center space-x-2 md:ml-32 text-gray-500">
            <a href="#" class="hover:underline text-gray-500" @click="$emit('goTo', 'home')">Home</a>
            <span>/</span>
            <span class="text-gray-700">How It Works</span>
        </div>
    </div>

    <!-- Renting -->
    <div class="mb-12 relative text-gray-700 rounded-lg shadow-lg p-8 bg-white">
      <h3 class="text-3xl font-semibold mb-2 text-center border-b-2 pb-2">
        Renting
      </h3>
      <p class="text-center text-gray-600 italic pb-4 text-sm">Click on each step to learn more</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mt-6">
        <!-- Step 1 -->
        <div
          class="relative w-full mx-auto cursor-pointer"
          style="min-height: 215px"
          @click="flipCard('rent1')"
        >
          <!-- Default content when the card is NOT flipped -->
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="!flipped.rent1"
          >
            <div
              :class="{
                'w-10 h-10': flipped.rent1,
                'w-16 h-16': !flipped.rent1,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">search</i>
            </div>

            <h4 class="font-bold mb-4">Browse & Select</h4>
            <p class="text-center">
              Explore our wide range of AI-generated wall art. Choose the
              material, size, and duration
            </p>
          </div>

          <!-- Alternative content when the card IS flipped -->
          <div
            class="absolute top-0 left-0 w-full h-fit flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="flipped.rent1"
          >
            <div
              :class="{
                'w-10 h-10': flipped.rent1,
                'w-16 h-16': !flipped.rent1,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">search</i>
            </div>

            <h4 class="font-bold mb-4">Browse & Select</h4>

            <ul class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Discover an ever-evolving gallery
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Filter options by material, size, or style
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Preview how art would look in different settings
              </li>
            </ul>
          </div>
        </div>

        <!-- Arrow -->
        <div
          class="absolute top-1/2 transform md:block hidden"
          style="left: calc(33% - 10px)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-8 w-8 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <!-- Step 2 -->
        <div
          class="flex flex-col items-center transform hover:scale-105 transition-all duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl w-full mx-auto cursor-pointer"
          style="min-height: 215px"
          @click="flipCard('rent2')"
        >
          <div
            :class="{ 'w-10 h-10': flipped.rent2, 'w-16 h-16': !flipped.rent2 }"
            class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
          >
            <i class="material-icons">local_shipping</i>
          </div>

          <h4 class="font-bold mb-4" v-if="!flipped.rent2">Confirm & Ship</h4>
          <h4 class="font-bold mb-4" v-else>Confirm & Ship</h4>

          <p class="text-center" v-if="!flipped.rent2">
            Fill in or confirm your Billing and Shipping details, and submit
            your order
          </p>

          <!-- Alternative content when the card is flipped -->
          <ul v-else class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
            <li
              class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <span
                class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
              ></span>
              Your privacy is our priority
            </li>
            <li
              class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <span
                class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
              ></span>
              Simple transactions with multi-payment options
            </li>
            <li
              class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <span
                class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
              ></span>
              Track your order in real-time
            </li>
          </ul>
        </div>

        <!-- Arrow -->
        <div
          class="absolute top-1/2 transform left-2/3 md:block hidden"
          style="left: calc(66% - 5px)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-8 w-8 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <!-- Step 3 -->
        <div
          class="flex flex-col items-center transform hover:scale-105 transition-all duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl w-full mx-auto cursor-pointer"
          style="min-height: 215px"
          @click="flipCard('rent3')"
        >
          <div
            :class="{ 'w-10 h-10': flipped.rent3, 'w-16 h-16': !flipped.rent3 }"
            class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
          >
            <i class="material-icons">box</i>
          </div>

          <h4 class="font-bold mb-4" v-if="!flipped.rent3">
            Anticipation & Arrival
          </h4>
          <h4 class="font-bold mb-4" v-else>Anticipation & Arrival</h4>

          <p class="text-center" v-if="!flipped.rent3">
            Sit back and relax! Remember to keep the shipping box for returns
          </p>

          <!-- Alternative content when the card is flipped -->
          <ul v-else class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
            <li
              class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <span
                class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
              ></span>
              Premium packaging to ensure safe arrival
            </li>
            <li
              class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <span
                class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
              ></span>
              Detailed care instructions included
            </li>
            <li
              class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <span
                class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
              ></span>
              Support available for any shipping queries
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Returning -->
    <div class="relative rounded-lg shadow-lg p-8 bg-white mt-10 text-gray-700">
      <h3 class="text-3xl font-semibold mb-2 text-center border-b-2 pb-2">
        Returning
      </h3>
      <p class="text-center text-gray-600 italic pb-4 text-sm">Click on each step to learn more</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mt-6">
        <!-- Step 1 -->
        <div
          class="relative w-full mx-auto cursor-pointer"
          style="min-height: 215px"
          @click="flipCard('swap1')"
        >
          <!-- Default content when the card is NOT flipped -->
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="!flipped.swap1"
          >
            <div
              :class="{
                'w-10 h-10': flipped.swap1,
                'w-16 h-16': !flipped.swap1,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">autorenew</i>
            </div>

            <h4 class="font-bold mb-4">Pack with Care</h4>
            <p class="text-center">
              Gently place the wall art back into the original box, ensuring
              it's secure
            </p>
          </div>

          <!-- Alternative content when the card IS flipped -->
          <div
            class="absolute top-0 left-0 w-full h-fit flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="flipped.swap1"
          >
            <div
              :class="{
                'w-10 h-10': flipped.swap1,
                'w-16 h-16': !flipped.swap1,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">autorenew</i>
            </div>

            <h4 class="font-bold mb-4">Pack with Care</h4>

            <ul class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Use the protective layers provided
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Ensure the art is free from any external materials
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Seal the box tightly for a safe journey back
              </li>
            </ul>
          </div>
        </div>

        <!-- Arrow -->
        <div
          class="absolute top-1/2 transform left-1/3 md:block hidden"
          style="left: calc(33% - 5px)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-8 w-8 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <!-- Step 2 -->
        <div
          class="relative w-full mx-auto cursor-pointer"
          style="min-height: 215px"
          @click="flipCard('swap2')"
        >
          <!-- Default content when the card is NOT flipped -->
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="!flipped.swap2"
          >
            <div
              :class="{
                'w-10 h-10': flipped.swap2,
                'w-16 h-16': !flipped.swap2,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">send</i>
            </div>
            <h4 class="font-bold mb-4">Label Swap</h4>
            <p class="text-center">
              Detach the initial shipping label, revealing the return label
              beneath.
            </p>
          </div>

          <!-- Alternative content when the card IS flipped -->
          <div
            class="absolute top-0 left-0 w-full h-fit flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="flipped.swap2"
          >
            <div
              :class="{
                'w-10 h-10': flipped.swap2,
                'w-16 h-16': !flipped.swap2,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">send</i>
            </div>

            <h4 class="font-bold mb-4">Label Swap</h4>

            <ul class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Clear, easy-to-follow return label instructions
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Need a new return label? Contact support
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Make sure the return label is clearly visible
              </li>
            </ul>
          </div>
        </div>

        <!-- Arrow -->
        <div
          class="absolute top-1/2 transform left-2/3 md:block hidden"
          style="left: calc(66% - 5px)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-8 w-8 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <!-- Step 3 -->
        <div
          class="relative w-full mx-auto cursor-pointer"
          style="min-height: 215px"
          @click="flipCard('swap3')"
        >
          <!-- Default content when the card is NOT flipped -->
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="!flipped.swap3"
          >
            <div
              :class="{
                'w-10 h-10': flipped.swap3,
                'w-16 h-16': !flipped.swap3,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">done</i>
            </div>
            <h4 class="font-bold mb-4">Safe Send-off</h4>
            <p class="text-center">
              Drop off the box with our partnered shipping carrier. We'll handle
              it from there.
            </p>
          </div>

          <!-- Alternative content when the card IS flipped -->
          <div
            class="absolute top-0 left-0 w-full h-fit flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="flipped.swap3"
          >
            <div
              :class="{
                'w-10 h-10': flipped.swap3,
                'w-16 h-16': !flipped.swap3,
              }"
              class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">done</i>
            </div>

            <h4 class="font-bold mb-4">Safe Send-off</h4>

            <ul class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Locate nearest drop-off point with our locator tool
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Get confirmation once the art reaches us
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-gray-700 rounded-full mr-3 flex-shrink-0"
                ></span>
                Assistance available for shipping-related inquiries
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      flipped: {
        rent1: false,
        rent2: false,
        rent3: false,
        swap1: false,
        swap2: false,
        swap3: false,
      },
    };
  },
  methods: {
    flipCard(id) {
      console.log(id);
      this.flipped[id] = !this.flipped[id];
    },
  },
};
</script>

<style scoped>
/* Add your preferred styles here for the components */
</style>
