<template>
  <div
    class="container mx-auto px-4 sm:px-6 py-8 mt-4"
    :class="{ 'mb-20': isMobile }"
    style="min-height: calc(100vh - 23rem)"
  >
    <div class="text-center mb-8 sm:mb-10">
      <div class="flex justify-center items-center">
        <h1 class="text-4xl font-semibold mb-4">
          <span
            @click="selectedMethod = 'upload'"
            class="cursor-pointer hover:text-blue-600"
            :class="{ 'text-blue-600': selectedMethod === 'upload' }"
            >Upload</span
          >
          <span class="mx-2">|</span>
          <span
            @click="selectedMethod = 'edit'"
            class="cursor-pointer hover:text-green-600"
            :class="{ 'text-green-600': selectedMethod === 'edit' }"
            >Edit</span
          >
        </h1>
      </div>
      <p class="text-gray-700 text-lg">
        {{
          selectedMethod === 'upload'
            ? 'Upload multiple artworks at once and provide their details.'
            : 'Edit your existing artworks.'
        }}
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
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
    >
      <div
        v-for="(image, index) in images[selectedMethod]"
        :key="index"
        class="min-w-fit relative group p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:bg-gray-100"
      >
        <button
          @click="triggerRemove(index)"
          class="absolute top-2 right-0 bg-red-600 text-sm px-2.5 py-1 text-white p-1 rounded-full transition duration-300 ease-in-out hover:bg-red-800"
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
        <textarea
          v-model="image.description"
          placeholder="Description"
          class="w-full p-2 mb-2 rounded-lg bg-gray-200 hover:bg-white focus:bg-white border border-transparent focus:border-blue-500 transition duration-300 ease-in-out pl-4 shadow-sm focus:shadow-md h-24 resize-none"
        ></textarea>

        <!-- Sizes Toggle Buttons -->
        <div class="flex gap-1 mb-2 justify-center py-2 pb-4">
          <button
            v-for="(size, sizeIndex) in image.sizes"
            :key="sizeIndex"
            :class="{
              'bg-blue-500 text-white': size.selected,
              'bg-gray-200 text-gray-800': !size.selected,
            }"
            class="rounded-full p-1.5 px-6 focus:outline-none transition duration-300 ease-in-out"
            @click="toggleSize(index, sizeIndex)"
          >
            {{ size.size }}
          </button>
        </div>

        <!-- Updated Tags Section -->
        <div class="tags-container">
          <div class="flex gap-2 mb-2 flex-wrap">
            <span
              v-for="(tag, tagIndex) in image.tags"
              :key="tagIndex"
              class="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-3 py-1 rounded-xl dark:bg-blue-200 dark:text-blue-800"
            >
              {{ tag }}
              <button
                @click="removeTag(index, tagIndex)"
                class="ml-2 text-red-700 hover:text-red-800"
              >
                <i class="fas fa-times"></i>
              </button>
            </span>
          </div>
        </div>
        <div class="flex items-center">
          <input
            v-model="image.newTag"
            @keyup.enter="addTag(index)"
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
        Upload
      </button>
      <button
        @click="publish"
        @mouseenter="showTooltip = !images.upload.length"
        @mouseleave="showTooltip = false"
        class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        :class="{ 'opacity-50 cursor-not-allowed': !images.upload.length }"
        :disabled="!images.upload.length"
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
import service from '../../service';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    arts: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    console.log(this.arts);
    this.images.edit = this.arts.map((art) => {
      return {
        src: art.image,
        title: art.title,
        description: art.description,
        tags: art.tags,
        sizes: [
          { size: 'S', selected: art.has_small },
          { size: 'M', selected: art.has_medium },
          { size: 'Sq', selected: art.has_square },
          { size: 'L', selected: art.has_large },
        ],
      };
    });
  },
  data() {
    return {
      selectedMethod: 'upload',
      images: {
        upload: [],
        edit: [],
      },
      showModal: false, // To control the visibility of the modal
      removeIndex: null,
      showTooltip: false, // To control the visibility of the tooltip
      newTag: '', // To store new tag input
    };
  },
  methods: {
    previewFiles() {
      const input = this.$refs.fileInput;
      if (input.files) {
        Array.from(input.files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.images.upload.push({
              src: e.target.result,
              title: '',
              description: '',
              tags: ['New'],
              newTag: '',
              sizes: [
                { size: 'S', selected: true },
                { size: 'M', selected: true },
                { size: 'Sq', selected: true }, // Added 'Square' size
                { size: 'L', selected: true },
              ],
            });
          };

          reader.readAsDataURL(file);
        });
      }
    },
    removeImage(index) {
      this.images[selectedMethod].splice(index, 1);
    },
    openUploadWizard() {
      this.$refs.fileInput.click();
    },
    async publish() {
      if (import.meta.env.VITE_ENV !== 'production') return;
      // ... rest of the publishing logic
    },
    triggerRemove(index) {
      this.removeIndex = index;
      this.showModal = true;
    },
    confirmRemove() {
      this.removeImage(this.removeIndex);
      this.showModal = false;
      this.removeIndex = null;
    },
    cancelRemove() {
      this.showModal = false;
      this.removeIndex = null;
    },
    addTag(imageIndex) {
      let tagValue = this.images[imageIndex].newTag.trim();
      if (tagValue !== '') {
        this.images[imageIndex].tags.unshift({ value: tagValue });
        this.images[imageIndex].newTag = ''; // Clear the input after adding the tag
      }
    },
    removeTag(imageIndex, tagIndex) {
      this.images[imageIndex].tags.splice(tagIndex, 1);
    },
    toggleSize(imageIndex, sizeIndex) {
      this.images[imageIndex].sizes[sizeIndex].selected =
        !this.images[imageIndex].sizes[sizeIndex].selected;
    },
  },
};
</script>

<style scoped>
.tags-container {
  height: 4rem; /* Adjust the height as needed (approx. 2 lines) */
  overflow-y: auto; /* Enables scrolling */
}
</style>
