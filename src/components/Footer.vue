<template>
      <footer class="bg-white text-gray-700 mt-4 border-t border-gray-300">
      <div class="container mx-auto px-4 pt-12 pb-4 space-y-8 md:space-y-0">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">

          <!-- About Us Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2"
            >
              About Us
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="$emit('go-to', 'our-story')"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="$emit('go-to', 'team')"
                >
                  Team
                </a>
              </li>
            </ul>
          </div>

          <!-- Support Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2"
            >
              Support
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="$emit('go-to', 'contact')"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="$emit('go-to', 'privacy-policy')"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="$emit('go-to', 'terms-of-service')"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2"
            >
              Newsletter
            </h3>
            <form class="mt-4" @submit.prevent="subscribe">
              <input
                v-model="email"
                type="email"
                placeholder="Email Address"
                class="w-full p-2 rounded-md text-gray-700 border border-gray-300"
              />
              <button
                type="submit"
                class="mt-2 w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white p-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Social Links and Copyright -->
        <div
          class="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-0"
        >
          <div class="flex space-x-4 mb-4 md:mb-0">
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <div class="text-sm text-gray-700 font-semibold mt-6">
            &copy; 2023 PixelHaus. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  data() {
    return {
      email: null,
    }
  },
  methods: {
    subscribe() {
      alert('Thanks for subscribing!');

      this.email = null;
    }
  }
}
</script>