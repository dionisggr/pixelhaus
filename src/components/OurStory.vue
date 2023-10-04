<template>
  <div class="bg-white min-h-screen flex flex-col items-center py-16 px-6">
    <h1 class="text-4xl font-extrabold mb-12">Our Story</h1>
    <div
      v-for="(milestone, index) in milestones"
      :key="index"
      :class="{
        'animate__animated animate__fadeInLeft animate__delay-0.5s':
          index % 2 === 0,
        'animate__animated animate__fadeInRight animate__delay-0.5s':
          index % 2 !== 0,
      }"
      class="w-full max-w-2xl mb-12 cursor-pointer transform transition-transform animate__duration-1s"
      @click="toggleMilestone(milestone)"
    >
      <div
        class="flex items-center space-x-4 hover:border-blue-500 hover:border-4 rounded-lg duration-500 group"
      >
        <img
          :src="milestone.img"
          class="h-36 w-36 object-cover rounded-lg shadow-lg"
          alt="Milestone Image"
        />
        <div class="flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-semibold mb-2">{{ milestone.title }}</h2>
            <p class="text-lg text-gray-600">{{ milestone.description }}</p>
          </div>
          <p class="text-sm text-gray-500 mt-4">{{ milestone.date }}</p>
        </div>
      </div>
      <div v-if="selectedMilestone === milestone" class="animate__animated animate__fadeIn animate__duration-2s">
    <div class="rounded-lg p-6 mt-4">
      <h3 class="text-xl font-semibold mb-2 animate__animated animate__slideInUp animate__fadeIn animate__duration-1.5s">More Info</h3>
      <p class="animate__animated animate__slideInUp animate__fadeIn animate__delay-0.5s animate__duration-1.5s">{{ milestone.moreInfo }}</p>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      milestones: [
        {
          title: 'Idea Conception',
          description:
            'Our founder had the idea while appreciating wall art during travels.',
          img: 'https://source.unsplash.com/random/300x300?idea',
          date: 'Jan 1, 2020',
          moreInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis semper nulla, id accumsan felis laoreet et. Donec cursus rhoncus nisl. Praesent pharetra neque non ex.',
        },
        {
          title: 'First Prototype',
          description:
            'The first prototype was developed and tested among close friends.',
          img: 'https://source.unsplash.com/random/300x300?prototype',
          date: 'Mar 15, 2020',
          moreInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis semper nulla, id accumsan felis laoreet et. Donec cursus rhoncus nisl. Praesent pharetra neque non ex.',
        },
        {
          title: 'Website Launched',
          description:
            'Our platform was finally live and began selling its first pieces.',
          img: 'https://source.unsplash.com/random/300x300?launch',
          date: 'Jun 20, 2020',
          moreInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis semper nulla, id accumsan felis laoreet et. Donec cursus rhoncus nisl. Praesent pharetra neque non ex.',
        },
        {
          title: 'First 100 Customers',
          description:
            'We reached our first 100 customers who loved our products!',
          img: 'https://source.unsplash.com/random/300x300?customer',
          date: 'Aug 1, 2020',
          moreInfo:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis semper nulla, id accumsan felis laoreet et. Donec cursus rhoncus nisl. Praesent pharetra neque non ex.',
        },
      ],
      selectedMilestone: null,
    };
  },
  methods: {
    toggleMilestone(milestone) {
      this.selectedMilestone =
        this.selectedMilestone === milestone ? null : milestone;
    },
  },
};
</script>

<style>
@import 'animate.css';
</style>
