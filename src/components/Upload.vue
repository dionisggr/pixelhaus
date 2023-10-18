<template>
  <div class="container mx-auto py-16">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-semibold">Upload New Art</h1>
      <p class="text-gray-700 mt-2">
        Upload multiple artworks at once and provide their details
      </p>
    </div>

    <div>
      <!-- The input is now hidden using the 'hidden' class -->
      <input
        ref="fileInput"
        type="file"
        multiple
        @change="previewFiles"
        class="hidden"
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="relative group rounded-xl p-4 transition duration-300 ease-in-out hover:shadow-lg"
        >
          <!-- Delete button -->
          <button
            @click="triggerRemove(index)"
            class="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 px-2 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 opacity-0 group-hover:opacity-100"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Flex container -->
          <div class="flex items-center space-x-4">
            <!-- Image -->
            <img
              :src="image.src"
              alt="Preview"
              class="w-1/4 rounded-lg shadow-md transition duration-300 ease-in-out transform group-hover:scale-105"
            />

            <!-- Input fields -->
            <div>
              <input
                v-model="image.title"
                placeholder="Title"
                class="w-full p-2 rounded border-2 border-gray-300 focus:border-blue-500 mb-2"
              />
              <textarea
                v-model="image.description"
                placeholder="Description"
                rows="3"
                class="w-full p-2 rounded border-2 border-gray-300 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center relative">
        <!-- "Upload Art" Button -->
        <button
          @click="openUploadWizard"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mb-4"
        >
          Upload Art
        </button>
        <br />

        <!-- "Publish" Button -->
        <button
          @click="publish"
          @mouseenter="showTooltip = !images.length"
          @mouseleave="showTooltip = false"
          class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          :class="{ 'opacity-50 cursor-not-allowed': !images.length }"
          :disabled="!images.length"
        >
          Publish
        </button>

        <!-- Tooltip for the "Publish" button -->
        <span
          v-if="showTooltip"
          class="absolute transform translate-y-12 p-2 bg-gray-600 text-white text-xs rounded shadow-lg"
          style="left: 50%"
        >
          Upload an image first!
        </span>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal with Blurred Background -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <!-- Blurred Background Overlay -->
    <div class="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

    <!-- Modal Content -->
    <div class="bg-white p-4 rounded shadow-lg w-1/2 z-10">
      <h3 class="text-xl mb-4">Confirm Deletion</h3>
      <p>Are you sure you want to remove this image?</p>
      <div class="mt-4 flex justify-end space-x-2">
        <button
          @click="confirmRemove"
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Delete
        </button>
        <button
          @click="cancelRemove"
          class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      showModal: false, // To control the visibility of the modal
      removeIndex: null,
      showTooltip: false, // To control the visibility of the tooltip
    };
  },
  methods: {
    previewFiles() {
      const input = this.$refs.fileInput;

      if (input.files) {
        Array.from(input.files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.images.push({
              src: e.target.result,
              title: '',
              description: '',
            });
          };
          reader.readAsDataURL(file);
        });
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    openUploadWizard() {
      this.$refs.fileInput.click();
    },
    publish() {
      // Logic to upload all the images with their respective titles and descriptions to the server.
      // You would typically make an API call here.
      console.log('Uploading images...');
    },
    triggerRemove(index) {
      this.removeIndex = index;
      this.showModal = true;
    },
    confirmRemove() {
      this.images.splice(this.removeIndex, 1);
      this.showModal = false;
      this.removeIndex = null;
    },
    cancelRemove() {
      this.showModal = false;
      this.removeIndex = null;
    },
  },
};
</script>

<style scoped>
/* You can add more styling with TailwindCSS or pure CSS here if needed */
</style>
