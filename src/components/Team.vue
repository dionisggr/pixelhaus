<template>
  <div
    class="bg-gray-100 min-h-screen flex flex-col items-center py-12 mt-1 sm:py-8 px-4 sm:px-8 max-w-6xl mx-auto"
  >
      <!-- Back button -->
      <button
      @click="$emit('go-to', 'home')"
      class="absolute top-24 mt-2 left-6 bg-gray-200 hover:bg-gray-400 p-3.5 px-5 rounded-full transition-colors duration-300 shadow-sm"
    >
      <i class="fas fa-arrow-left text-gray-600 text-sm"></i>
    </button>

    <!-- Breadcrumbs -->
    <div class="mb-8 w-full">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Meet The Team
      </h1>
      <div class="text-center mt-2 md:text-left text-gray-500 w-full">
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        /
        <span class="text-gray-700">Team</span>
      </div>
    </div>
    <div
      v-for="(member, index) in teamMembers"
      :key="index"
      class="w-full max-w-3xl my-10 sm:mb-8 md:mb-12 cursor-pointer transform transition-transform duration-300"
      @click="toggleMember(member)"
    >
      <div
        :class="{
          'flex sm:items-center space-x-4 sm:space-x-6 md:space-x-8 flex-col sm:flex-row': true,
          'opacity-40': selectedMember === member,
        }"
        class="hover:border-blue-500 hover:border-4 rounded-lg duration-500 group transition-all"
      >
        <div
          :class="{
            'flex items-center animate__animated custom-fadeInLeft duration-700 sm:order-1':
              selectedMember !== member,
            'flex flex-col items-center animate__animated custom-fadeInLeftSmall duration-400 sm:order-0':
              selectedMember === member,
          }"
        >
          <img
            :src="member.img"
            :class="{
              'transition-all duration-500 ease-in-out h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72 object-cover rounded-full shadow-lg':
                selectedMember !== member,
              'transition-all duration-500 ease-in-out h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-cover rounded-full':
                selectedMember === member,
            }"
            alt="Member Image"
          />
          <div v-if="selectedMember !== member" class="ml-3 sm:ml-6 md:ml-8">
            <h2
              class="text-xl sm:text-2xl md:text-3xl font-semibold mb-1 sm:mb-2 md:mb-4"
            >
              {{ member.name }}
            </h2>
            <p class="text-sm sm:text-base md:text-lg text-gray-600">
              {{ member.role }}
            </p>
          </div>
          <div v-else>
            <h2 class="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              {{ member.name }}
            </h2>
            <p class="text-xs sm:text-sm text-gray-400">{{ member.role }}</p>
          </div>
        </div>
        <div
          v-if="selectedMember === member"
          class="animate__animated custom-fadeInRight duration-700 sm:ml-auto"
        >
          <div
            class="rounded-lg p-3 sm:p-6 md:p-8 space-y-2"
            :class="{ 'text-sm': isMobile }"
          >
            <p>{{ member.bio }}</p>
            <p>{{ member.moreBio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      teamMembers: [
        {
          name: 'Alley',
          role: 'Creative Director',
          img: 'https://source.unsplash.com/featured/?people,creative',
          dateJoined: 'Jan 1, 2020',
          bio: 'Alley is the creative genius behind the artistry of our products. From concept to creation, she ensures every detail is meticulously crafted.',
          moreBio:
            'Having worked as a digital artist for over 10 years, Alley brings her wealth of experience to the team.',
        },
        {
          name: 'Dio',
          role: 'Software Engineer',
          img: 'https://source.unsplash.com/featured/?people,tech',
          dateJoined: 'Mar 15, 2020',
          bio: 'Dio is the tech-savvy mind that brought our online platform to life. With a focus on user experience, he is the backbone of our technical operations.',
          moreBio:
            'Dio has been coding since he was in high school and brings an analytical mindset to solve complex challenges.',
        },
      ],
      selectedMember: null,
    };
  },
  methods: {
    toggleMember(member) {
      this.selectedMember = this.selectedMember === member ? null : member;
    },
  },
};
</script>

<style scoped>
@import 'animate.css';

@keyframes custom-slideInRight {
  from {
    transform: translate3d(20%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes custom-slideInLeft {
  from {
    transform: translate3d(-20%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.animate__animated.custom-fadeInRight {
  animation-name: custom-slideInRight, fadeIn;
}

.animate__animated.custom-fadeInLeft,
.animate__animated.custom-fadeInLeftSmall {
  animation-name: custom-slideInLeft, fadeIn;
}
</style>
