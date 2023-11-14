<template>
  <div
    class="relative rounded-lg shadow-md transform transition-transform duration-300 cursor-pointer"
    @click="$emit('select-image', 'wall')"
  >
    <img
      :src="'./src/assets/wall.png'"
      alt="Wall Background"
      class="w-full h-full"
    />
    <img
      :src="src"
      alt="Artwork"
      class="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-sm shadow-md"
      :class="subtype === 'main' ? 'top-1/3 mt-8 left-1/2 ml-8' : 'top-14 left-16 ml-3'"
      :style="style"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    selectedSize: {
      type: String,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        wall: {
          main: [
            this.selectedSize === 'Small' && 'height: 75px; width: 100px;',
            this.selectedSize === 'Medium' && 'height: 125px; width: 170px',
            this.selectedSize === 'Square' && 'height: 150px; width: 150px',
            this.selectedSize === 'Large' && 'height: 170px; width: 230px',
          ],
          thumbnail: [
            this.selectedSize === 'Small' && 'width: 1rem;',
            this.selectedSize === 'Medium' && 'width: 1.25rem;',
            this.selectedSize === 'Square' && 'width: 1.75rem;',
            this.selectedSize === 'Large' && 'width: 2.5rem; height: 2rem;',
          ],
        },
        side: {
          main: [],
          thumbnail: [],
        },
      }[this.type][this.subtype];
    },
  },
};
</script>

<style scoped></style>
