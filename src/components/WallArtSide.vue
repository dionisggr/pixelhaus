<template>
  <div class="canvas-container overflow-hidden">
    <div class="canvas">
      <div class="canvas-front" :style="frontStyle"></div>
      <div class="canvas-side" :style="sideStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String,
      required: true,
    },
  },
  computed: {
    frontStyle() {
      return {
        backgroundImage: `url(${this.imageURL})`,
        backgroundSize: '110% 130%',
        backgroundPosition: 'right center',
        overflow: 'hidden',
      };
    },
    sideStyle() {
      return {
        backgroundImage: `url(${this.imageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
        transformOrigin: 'top left',
        overflow: 'hidden',
      };
    },
  },
};
</script>

<style scoped>
.canvas-container {
  perspective: 1000px;
  overflow: hidden; /* Hide the overflow */
}

.canvas {
  width: 300px;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateY(30deg);
  position: relative;
}

.canvas-front {
  width: 100%;
  max-width: 250px;
  height: 210px;
  transform: translateZ(-20px);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 9px; /* Align to the left */
  overflow: hidden; /* Hide the overflow */
}

.canvas-side {
  content: '';
  display: block;
  position: absolute;
  width: 20px;
  height: 100%;
  left: -5.5px; /* Adjust to the end of the .canvas-front */
  top: 4.5px;
  transform: rotateY(-90deg);
  opacity: 0.8;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  background-repeat: no-repeat;
  background-position: bottom center; /* Position the hidden part of the image */
}
</style>
