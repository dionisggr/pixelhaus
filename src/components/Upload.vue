<template>
  <div
    class="container mx-auto px-4 sm:px-6 py-8"
    :class="{ 'mb-20': isMobile }"
  >
    <div class="text-center mb-8 sm:mb-10">
      <h1 class="text-4xl sm:text-4xl lg:text-5xl font-semibold mb-4">
        Upload New Art
      </h1>
      <p class="text-gray-700 text-lg">
        Upload multiple artworks at once and provide their details.
      </p>
    </div>

    <input
      ref="fileInput"
      type="file"
      multiple
      @change="previewFiles"
      class="hidden"
      accept="image/*"
    />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative group p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:bg-gray-100"
      >
        <button
          @click="triggerRemove(index)"
          class="hidden group-hover:block absolute top-2 right-2 bg-red-700 text-white p-1 rounded-full transition duration-300 ease-in-out hover:bg-red-800"
        >
          <i class="fas fa-times"></i>
        </button>
        <img
          :src="image.src"
          alt="Preview"
          class="w-full rounded-lg mb-4 shadow-inner group-hover:shadow-md transition duration-300 ease-in-out group-hover:scale-105"
        />

        <input
          v-model="image.title"
          placeholder="Title"
          class="w-full p-2 mb-2 rounded-lg bg-gray-200 hover:bg-white focus:bg-white border border-transparent focus:border-blue-500 transition duration-300 ease-in-out pl-4 shadow-sm focus:shadow-md"
        />
        <input
          v-model="image.description"
          placeholder="Description"
          class="w-full p-2 mb-2 rounded-lg bg-gray-200 hover:bg-white focus:bg-white border border-transparent focus:border-blue-500 transition duration-300 ease-in-out pl-4 shadow-sm focus:shadow-md"
        />

        <!-- Tags section -->
        <div
          class="flex items-center mb-2 space-x-2"
          v-for="(tag, tagIndex) in image.tags"
          :key="tagIndex"
        >
          <input
            v-model="tag.value"
            @input="tag.value = tag.value.trim()"
            placeholder="Tag"
            class="tag-input bg-gray-200 hover:bg-blue-300 focus:bg-blue-300 text-sm px-3 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-600"
          />
          <button
            @click="removeTag(index, tagIndex)"
            class="text-red-700 hover:text-red-800 text-xs"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="flex items-center">
          <input
            v-model="newTag"
            placeholder="Add Tag"
            class="flex-grow mr-2 bg-transparent focus:outline-none placeholder-gray-500 text-xs border-b-2 border-gray-300 focus:border-blue-500"
          />
          <button
            @click="addTag(index)"
            class="text-blue-700 hover:text-blue-800 text-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center space-x-4">
      <button
        @click="openUploadWizard"
        class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload Art
      </button>
      <button
        @click="publish"
        @mouseenter="showTooltip = !images.length"
        @mouseleave="showTooltip = false"
        class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        :class="{ 'opacity-50 cursor-not-allowed': !images.length }"
        :disabled="!images.length"
      >
        Publish
      </button>
    </div>

    <div
      v-if="showTooltip"
      class="absolute transform -translate-y-16 p-2 bg-gray-800 text-white text-xs rounded shadow-lg"
    >
      Upload an image first!
    </div>

    <!-- Deletion Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="absolute inset-0 bg-black opacity-60 backdrop-blur-md"></div>
      <div class="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 z-10">
        <h3 class="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p class="mb-4">Are you sure you want to remove this image?</p>
        <div class="mt-4 flex justify-end space-x-4">
          <button
            @click="confirmRemove"
            class="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            Delete
          </button>
          <button
            @click="cancelRemove"
            class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../service';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    variants: {
      type: Array,
      default: () => [],
    },
    print_areas: {
      type: Array,
      default: () => [],
    },
  },
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
              tags: [{ value: 'New' }], // Initialize with a single empty tag
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
    async publish() {
      if (import.meta.env.VITE_ENV !== 'production') return;

      for (let i = 0; i < this.images.length; i++) {
        const { src, title, description } = this.images[i];

        // const { id: imageId } = await service.uploadImage({
        //   file_name: 'dio-test.png',
        //   contents: src.replace('data:image/png;base64,', ''),
        // });
        const product = {
          title,
          description,
          print_provider_id: 2,
          variants: this.variants,
          print_areas: this.print_areas,
          position: 'front',
          images: [
            {
              id: '6539816f57384b4993d34d7c',
              x: 0.5,
              y: 0.5,
              scale: 1,
              is_default: true,
              position: 'front',
              angle: 180,
            },
          ],
        };

        await service.createProduct({ ...product, blueprint_id: 50 });
        // await service.createProduct({ ...product, blueprint_id: 282 });
      }
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
    addTag(imageIndex) {
      this.images[imageIndex].tags.push({ value: '' });
    },

    removeTag(imageIndex, tagIndex) {
      this.images[imageIndex].tags.splice(tagIndex, 1);
    },
  },
};
</script>

<style scoped>
/* You can add more styling with TailwindCSS or pure CSS here if needed */
</style>
