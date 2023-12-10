<template>
  <section class="bg-white py-16 shadow-md rounded-lg" id="faq">
    <div class="container mx-auto px-4 text-gray-700">
      <h2 class="text-4xl text-center font-bold mb-12">FAQ</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:w-1/2 xl:grid-cols-1 gap-4 grid-flow-row mx-auto"
      >
        <div
          v-for="{ question, answer } in faq"
          class="faq-item bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105 cursor-pointer flex flex-col"
          @click="toggleAnswer($event)"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-700 hover:text-gray-800">
              {{ question }}
            </h3>
            <i class="material-icons toggle-icon">add</i>
          </div>
          <p class="text-gray-700 answer hidden mt-4">
            {{ answer }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      faq: [
        {
          question: 'What is the refund policy?',
          answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu euismod sem.',
        },
        {
          question: 'Do you offer free shipping?',
          answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu euismod sem.',
        },
        {
          question: 'What is the return policy?',
          answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu euismod sem.',
        },
        {
          question: 'Do you offer gift cards?',
          answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu euismod sem.',
        },
      ],
    };
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
  },
};
</script>
