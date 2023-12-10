<template>
  <div
    class="relative rounded-lg shadow-md transform transition-transform duration-300 cursor-pointer"
    @click="$emit('select-image', 'wall')"
  >
    <img
      :src="wallImageUrl"
      alt="Wall Background"
      class="w-full h-full"
    />
    <img
      :src="src"
      alt="Artwork"
      class="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-sm shadow-md"
      :class="subtype === 'main' ? 'top-1/3 mt-8 left-1/2 ml-2 md:ml-8' : 'top-1/3 mt-2 left-1/2 ml-0.5 md:top-14 md:left-16 md:ml-3'"
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
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      wallImageUrl: '/wall.png',
    };
  },
  computed: {
    style() {
      return {
        wall: {
          main: {
            desktop: [
              this.selectedSize === 'Small' && 'height: 75px; width: 100px;',
              this.selectedSize === 'Medium' && 'height: 125px; width: 170px',
              this.selectedSize === 'Square' && 'height: 150px; width: 150px',
              this.selectedSize === 'Large' && 'height: 170px; width: 230px',
            ],
            mobile: [
              this.selectedSize === 'Small' && 'height: 75px; width: 100px;',
              this.selectedSize === 'Medium' && 'height: 125px; width: 170px',
              this.selectedSize === 'Square' && 'height: 150px; width: 150px',
              this.selectedSize === 'Large' && 'height: 170px; width: 230px',
            ]
          },
          thumbnail: {
            desktop: [
              this.selectedSize === 'Small' && 'height: 0.75rem; width: 1rem;',
              this.selectedSize === 'Medium' && 'height: 1rem; width: 1.25rem;',
              this.selectedSize === 'Square' && 'width: 1.75rem;',
              this.selectedSize === 'Large' && 'width: 2.5rem; height: 2rem;',
            ],
            mobile: [
            this.selectedSize === 'Small' && 'height: 0.65rem; width: 0.9rem;',
              this.selectedSize === 'Medium' && 'height: 1rem; width: 1.25rem;',
              this.selectedSize === 'Square' && 'width: 1.25rem;',
              this.selectedSize === 'Large' && 'width: 1.85rem; height: 1.35rem;',
            ]
          },
        },
        side: {
          main: [],
          thumbnail: [],
        },
      }[this.type][this.subtype][this.isMobile ? 'mobile' : 'desktop'];
    },
  },
};
</script>

<style scoped></style>
