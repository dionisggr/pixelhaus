<template>
  <div class="how-it-works" :class="isMobile ? 'p-4 py-8' : 'p-12'">

    <!-- Breadcrumbs -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        How It Works
      </h1>
      <div class="mt-2 text-center text-gray-500">
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

    <!-- Category -->
    <div
      v-for="(steps, stepsIndex) in [rentingSteps, returningSteps]"
      class="mb-12 relative text-gray-700 rounded-lg shadow-lg p-8 bg-white"
    >
      <h3 class="text-3xl font-semibold mb-2 text-center border-b-2 pb-2">
        {{ !stepsIndex ? 'Renting' : 'Returning' }}
      </h3>
      <p class="text-center text-gray-600 italic pb-4 text-sm">
        {{ isMobile ? 'Tap' : 'Click' }} on each step to learn more
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mt-6">

        <!-- Step -->
        <div
          v-for="(step, stepIndex) in steps"
          class="relative w-full mx-auto cursor-pointer"
          style="min-height: 230px"
          @click="flipCard(`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`)"
        >
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="!flipped[`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`]"
          >
            <div
              :class="{
                'w-10 h-10': flipped[`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`],
                'w-16 h-16': !flipped[`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`],
              }"
              class="bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">{{ step.icon }}</i>
            </div>

            <h4 class="font-bold mb-4">{{ step.title }}</h4>
            <p class="text-center">
              {{ step.description }}
            </p>
          </div>

          <!-- Flipped -->
          <div
            class="absolute top-0 left-0 w-full h-fit flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl"
            v-if="flipped[`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`]"
          >
            <div
              :class="{
                'w-10 h-10': flipped[`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`],
                'w-16 h-16': !flipped[`${!stepsIndex ? 'rent' : 'return'}${stepIndex + 1}`],
              }"
              class="bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer"
            >
              <i class="material-icons">{{ step.icon }}</i>
            </div>

            <h4 class="font-bold mb-4">{{ step.title }}</h4>

            <ul class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"
                ></span>
                Discover an ever-evolving gallery
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"
                ></span>
                Filter options by material, size, or style
              </li>
              <li
                class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span
                  class="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"
                ></span>
                Preview how art would look in different settings
              </li>
            </ul>
          </div>

          <!-- Arrow -->
          <div
            v-if="step.has_arrow"
            class="absolute top-1/3 -right-12 mt-6 transform md:block hidden"
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
      rentingSteps: [
        {
          title: 'Browse & Select',
          description:
            'Explore our wide range of AI-generated art. Choose the material, size, and duration',
          icon: 'search',
          has_arrow: true,
        },
        {
          title: 'Confirm & Ship',
          description:
            'Fill in or confirm your Billing and Shipping details, and submit your order',
          icon: 'local_shipping',
          has_arrow: true,
        },
        {
          title: 'Anticipation & Arrival',
          description:
            'Sit back and relax! Remember to keep the shipping box for returns',
          icon: 'inbox',
        },
      ],
      returningSteps: [
        {
          title: 'Pack with Care',
          description:
            "Gently place the wall art back into the original box, ensuring it's secure",
          icon: 'autorenew',
          has_arrow: true,
        },
        {
          title: 'Label Swap',
          description:
            'Detach the initial shipping label, revealing the return label beneath.',
          icon: 'send',
          has_arrow: true,
        },
        {
          title: 'Safe Send-off',
          description:
            "Drop off the box with our partnered shipping carrier. We'll handle it from there.",
          icon: 'done',
        },
      ],
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
