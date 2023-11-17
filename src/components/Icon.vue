<template>
  <div :style="iconStyle">
    <!-- You can put a default icon symbol or letter here -->
    M
  </div>
</template>

<script>
export default {
  name: 'MockIcon',
  props: {
    size: {
      type: String,
      default: '24px',
    },
    color: {
      type: String,
      default: 'black',
    },
  },
  computed: {
    iconStyle() {
      return {
        width: this.size,
        height: this.size,
        backgroundColor: this.color,
        display: 'inline-block',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: this.size,
        color: 'white',
        fontSize: '16px',
        userSelect: 'none',
      };
    },
  },
};
</script>
