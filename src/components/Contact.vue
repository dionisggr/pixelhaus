<template>
  <div class="min-h-screen bg-gray-100 py-12">

    <!-- Header and Breadcrumbs -->
    <div class="px-8 mb-4">
      <h1 class="text-4xl font-extrabold text-gray-700 text-center">
        Contact Us
      </h1>
      <div class="mt-2 ml-32 text-gray-500">
        <a href="#" class="hover:underline text-gray-500">Home</a> /
        <span class="text-gray-700">Contact Us</span>
      </div>
    </div>

    <!-- Artwork Banner -->
    <div
      class="relative h-48 mb-2 overflow-hidden rounded-lg bg-white p-3 shadow-md w-5/6 mx-auto"
    >
      <div class="h-full overflow-hidden relative">
        <img
          src="https://source.unsplash.com/random"
          alt="Artwork"
          class="object-cover w-full h-full"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-wrap justify-center">

      <!-- Form Section -->
      <div class="w-full lg:w-5/12 xl:w-5/12 p-4">
        <form
          @submit.prevent="submitForm"
          class="bg-white rounded-lg shadow-md p-8 space-y-4"
        >
          <div>
            <label for="name" class="block text-sm text-gray-600"
              >Full Name</label
            >
            <input
              v-model="formData.name"
              id="name"
              type="text"
              class="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2">
              <label for="email" class="block text-sm text-gray-600"
                >Email</label
              >
              <input
                v-model="formData.email"
                id="email"
                type="email"
                class="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div class="w-full md:w-1/2 px-2">
              <label for="phone" class="block text-sm text-gray-600"
                >Phone</label
              >
              <input
                v-model="formData.phone"
                id="phone"
                type="tel"
                class="w-full mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
          <div class="flex items-center mt-4">
            <input
              type="checkbox"
              id="order-related"
              v-model="isOrderRelated"
              class="text-blue-600 rounded-md"
            />
            <label for="order-related" class="ml-2 text-sm text-gray-600"
              >Related to an order?</label
            >
          </div>
          <div v-if="isOrderRelated">
            <label for="order-number" class="block text-sm text-gray-600"
              >Order Number</label
            >
            <input
              v-model="formData.orderNumber"
              id="order-number"
              type="text"
              class="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label for="subject" class="block text-sm text-gray-600"
              >Subject</label
            >
            <input
              v-model="formData.subject"
              id="subject"
              type="text"
              class="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label for="message" class="block text-sm text-gray-600"
              >Message</label
            >
            <textarea
              v-model="formData.message"
              id="message"
              class="w-full mt-1 p-2 h-32 border rounded-md"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <!-- Info Section -->
      <div class="w-full lg:w-5/12 xl:w-5/12 p-4">
        <div class="bg-white rounded-lg shadow-md p-8">

          <!-- Contact Info -->
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">
            Contact Info
          </h3>
          <p class="text-lg text-gray-600">Email: example@example.com</p>
          <p class="text-lg text-gray-600">Phone: +1 234 567 890</p>

          <!-- Social Media -->
          <div class="mt-6">
            <h3 class="text-2xl font-semibold text-gray-700 mb-2">
              Social Media
            </h3>
            <div class="flex space-x-4 pt-1">
              <a href="#" class="text-blue-600 hover:text-blue-800">
                <i class="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" class="text-blue-400 hover:text-blue-600">
                <i class="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" class="text-red-600 hover:text-red-800">
                <i class="fab fa-pinterest text-xl"></i>
              </a>
              <a href="#" class="text-blue-300 hover:text-blue-500">
                <i class="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          <!-- Map -->
          <div class="mt-6">
            <div class="flex items-center text-sm font-semibold text-gray-600">
              <i class="fas fa-map-marker-alt mr-2 text-blue-600"></i>
              1234, Art Street, New York, USA
            </div>
            <div id="map" class="h-64 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initializeMap();
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        orderNumber: '',
      },
      isOrderRelated: false,
      map: null,
    };
  },
  methods: {
    initializeMap() {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initializeActualMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initializeActualMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: { lat: 40.7128, lng: -74.006 },
        });
      };
    },
  },
};
</script>
