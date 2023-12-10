<template>
      <div
      class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center pb-32"
      id="welcomeModal"
      v-if="isWelcomeShown"
    >
      <!-- Modal Content -->
      <div
        class="relative mx-4 border border-gray-200 bg-white rounded-lg shadow-xl sm:w-1/2 sm:mx-auto"
      >
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <h3 class="text-2xl font-semibold text-gray-800">
            <i class="fas fa-palette mr-2"></i>Welcome to
            <span class="italic">PixelHaus</span>
          </h3>
        </div>
        <div class="p-6">
          <p class="text-md text-gray-700">
            <span class="font-semibold">Discover</span> a world where
            <span class="italic">art meets technology</span>.
            <span class="italic">PixelHaus</span> brings you an exquisite
            collection of <span class="font-semibold">AI-generated art</span>,
            crafted into stunning wall art pieces for your space. Explore, rent,
            and enjoy a revolving gallery at your fingertips.
          </p>
          <p class="text-md text-gray-700 mt-4">
            <span class="font-bold">Note: </span>
            <span class="italic">PixelHaus</span> is a
            <span class="italic">conceptual app</span>, still preparing for
            commercial launch.
            <span class="font-bold"
              >Stay tuned for a canvas of possibilities.</span
            >
          </p>
          <div class="flex justify-between items-center mt-6">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="isWelcomeDisabled"
              />
              <span class="ml-2 text-gray-700 text-sm">Don't show again</span>
            </label>
            <button
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
              @click="dismissWelcomeModal"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isWelcomeShown: !localStorage.getItem('hidePixelHausModal'),
      isWelcomeDisabled: localStorage.getItem('hidePixelHausModal'),
    }
  },
  methods: {
    dismissWelcomeModal() {
      this.isWelcomeShown = false;

      if (this.isWelcomeDisabled) {
        localStorage.setItem('hidePixelHausModal', true);
      }
    },
  },
  watch: {
    isWelcomeDisabled(newVal) {
      if (newVal) {
        localStorage.setItem('hidePixelHausModal', true);
      } else {
        localStorage.removeItem('hidePixelHausModal');
      }
    },
  }
}
</script>