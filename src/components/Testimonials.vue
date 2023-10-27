<template>
  <section class="py-16 mt-12">
    <div class="container mx-auto" style="maxwidth: 1500px">
      <h2 class="text-4xl text-center font-extrabold mb-12 text-gray-800">
        Testimonials
      </h2>
      <div
        class="overflow-hidden py-2 relative h-[fit-content] w-[calc(100%/3*3)]"
      >
        <div class="flex gap-8 animate-scroll">
          <div
            v-for="testimonial in testimonials"
            class="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            :style="isMobile ? 'min-width: 300px' : 'min-width: 375px'"
          >
            <div class="flex items-center mb-4">
              <img
                :src="testimonial.image"
                alt="User Image"
                class="w-16 h-16 rounded-full mr-4"
              />
              <p class="text-xl font-bold text-gray-700">
                {{ testimonial.name }}
              </p>
            </div>
            <p class="text-gray-600 leading-relaxed">
              {{ testimonial.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import data from '../data.js';

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    let slideIndex = 0;

    function showSlides() {
      let slides = document.getElementsByClassName('slide');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      if (slides.length === 0) return;
      
      slides[slideIndex - 1].style.display = 'block';
      setTimeout(showSlides, 2000);
    }
    showSlides();
  },
  computed: {
    testimonials() {
      return data.testimonials;
    },
    arts() {
      return data.arts;
    },
    faq() {
      return data.faq;
    },
  },
  methods: {
    toggleAnswer(event) {
      const answerElement = event.currentTarget.querySelector('.answer');
      if (answerElement.classList.contains('hidden')) {
        answerElement.classList.remove('hidden');
      } else {
        answerElement.classList.add('hidden');
      }
    },
    capitalizeFirstLetter(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
  },
};
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 33.3333%));
  }
}

.animate-scroll {
  animation: scroll 20s linear infinite;
}
</style>
