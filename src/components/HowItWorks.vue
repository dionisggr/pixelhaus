<template>
  <div class="how-it-works p-12">
    <!-- Breadcrumbs -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        How It Works
      </h1>
      <div class="mt-2 ml-32 text-gray-500">
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        /
        <span class="text-gray-700">How It Works</span>
      </div>
    </div>

    <!-- For Renting -->
    <div class="mb-12 relative text-gray-700 rounded-lg shadow-lg p-8 bg-white">
      <h3 class="text-3xl font-semibold mb-6 text-center border-b-2 pb-2">
        For Renting
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mt-6">
        <!-- Step 1 -->
        <div
          class="relative w-full mx-auto cursor-pointer"
          style="max-width: 365px; min-height: 210px"
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
              Explore the platform and make selections based on renting
              criteria.
            </p>
          </div>

          <!-- Alternative content when the card IS flipped -->
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
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

            <h4 class="font-bold mb-4">Alternative Title</h4>
            <ul>
              <li>Lorem ipsum dolor sit.</li>
              <li>Ut enim ad minim veniam.</li>
              <li>Duis aute irure dolor.</li>
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
          style="max-width: 365px; min-height: 210px"
          @click="flipCard('rent2')"
        >
          <div
            :class="{ 'w-10 h-10': flipped.rent2, 'w-16 h-16': !flipped.rent2 }"
            class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
          >
            <i class="material-icons">local_shipping</i>
          </div>

          <h4 class="font-bold mb-4" v-if="!flipped.rent2">Receive the Art</h4>
          <h4 class="font-bold mb-4" v-else>Alternative Title</h4>

          <p class="text-center" v-if="!flipped.rent2">
            Wait for your wall art to arrive. Keep the box for the return.
          </p>

          <!-- Alternative content when the card is flipped -->
          <ul v-else>
            <li>Lorem ipsum dolor sit.</li>
            <li>Ut enim ad minim veniam.</li>
            <li>Duis aute irure dolor.</li>
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
          style="max-width: 365px; min-height: 210px"
          @click="flipCard('rent3')"
        >
          <div
            :class="{ 'w-10 h-10': flipped.rent3, 'w-16 h-16': !flipped.rent3 }"
            class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
          >
            <i class="material-icons">box</i>
          </div>

          <h4 class="font-bold mb-4" v-if="!flipped.rent3">Keep the Box</h4>
          <h4 class="font-bold mb-4" v-else>Alternative Title</h4>

          <p class="text-center" v-if="!flipped.rent3">
            Retain the box for a seamless return process.
          </p>

          <!-- Alternative content when the card is flipped -->
          <ul v-else>
            <li>Lorem ipsum dolor sit.</li>
            <li>Ut enim ad minim veniam.</li>
            <li>Duis aute irure dolor.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- For Swapping -->
    <div class="relative rounded-lg shadow-lg p-8 bg-white mt-10">
      <h3 class="text-3xl font-semibold mb-6 text-center border-b-2 pb-2">
        For Swapping
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mt-6">
<!-- Step 1 -->
<div
  class="relative w-full mx-auto cursor-pointer"
  style="max-width: 365px; min-height: 210px"
  @click="flipCard('swap1')"
>
  <!-- Default content when the card is NOT flipped -->
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
    v-if="!flipped.swap1"
  >
    <div
      :class="{'w-10 h-10': flipped.swap1, 'w-16 h-16': !flipped.swap1}"
      class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
    >
      <i class="material-icons">autorenew</i>
    </div>

    <h4 class="font-bold mb-4">Receive New Art</h4>
    <p class="text-center">
      Get the new wall art with a box and return label for convenience.
    </p>
  </div>

  <!-- Alternative content when the card IS flipped -->
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
    v-if="flipped.swap1"
  >
    <div
      :class="{'w-10 h-10': flipped.swap1, 'w-16 h-16': !flipped.swap1}"
      class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
    >
      <i class="material-icons">autorenew</i>
    </div>

    <h4 class="font-bold mb-4">Alternative Title</h4>
    <ul>
      <li>Lorem ipsum dolor sit amet.</li>
      <li>Consectetur adipisicing elit.</li>
      <li>Do eiusmod tempor incididunt.</li>
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
  style="max-width: 365px; min-height: 210px"
  @click="flipCard('swap2')"
>
  <!-- Default content when the card is NOT flipped -->
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
    v-if="!flipped.swap2"
  >
    <div
      :class="{'w-10 h-10': flipped.swap2, 'w-16 h-16': !flipped.swap2}"
      class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
    >
      <i class="material-icons">send</i>
    </div>
    <h4 class="font-bold mb-4">Return Previous Art</h4>
    <p class="text-center">
      Place the previous art back in the box and send it back.
    </p>
  </div>

  <!-- Alternative content when the card IS flipped -->
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
    v-if="flipped.swap2"
  >
    <div
      :class="{'w-10 h-10': flipped.swap2, 'w-16 h-16': !flipped.swap2}"
      class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
    >
      <i class="material-icons">send</i>
    </div>

    <h4 class="font-bold mb-4">Alternative Title for Step 2</h4>
    <ul>
      <li>Lorem ipsum dolor sit amet.</li>
      <li>Consectetur adipisicing elit.</li>
      <li>Do eiusmod tempor incididunt.</li>
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
  style="max-width: 365px; min-height: 210px"
  @click="flipCard('swap3')"
>
  <!-- Default content when the card is NOT flipped -->
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
    v-if="!flipped.swap3"
  >
    <div
      :class="{'w-10 h-10': flipped.swap3, 'w-16 h-16': !flipped.swap3}"
      class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
    >
      <i class="material-icons">done</i>
    </div>
    <h4 class="font-bold mb-4">Enjoy the New Art</h4>
    <p class="text-center">
      Hang the new piece and enjoy the fresh look on your wall.
    </p>
  </div>

  <!-- Alternative content when the card IS flipped -->
  <div
    class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
    v-if="flipped.swap3"
  >
    <div
      :class="{'w-10 h-10': flipped.swap3, 'w-16 h-16': !flipped.swap3}"
      class="bg-gray-700 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
    >
      <i class="material-icons">done</i>
    </div>

    <h4 class="font-bold mb-4">Alternative Title for Step 3</h4>
    <ul>
      <li>Lorem ipsum dolor sit amet.</li>
      <li>Consectetur adipisicing elit.</li>
      <li>Do eiusmod tempor incididunt.</li>
    </ul>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
