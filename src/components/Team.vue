<template>
  <div class="bg-white min-h-screen flex flex-col items-center py-16 px-6">
    <h1 class="text-4xl font-extrabold mb-16">Meet The Team</h1>
    <div
      v-for="(member, index) in teamMembers"
      :key="index"
      class="w-full max-w-4xl mb-12 cursor-pointer transform transition-transform duration-300"
      @click="toggleMember(member)"
    >
      <div
        :class="{
          'flex items-center space-x-8': true,
          'opacity-40': selectedMember === member,
        }"
        class="hover:border-blue-500 hover:border-4 rounded-lg duration-500 group transition-all"
      >
        <div
          :class="{
            'flex items-center animate__animated custom-fadeInLeft duration-700':
              selectedMember !== member,
            'flex flex-col items-center animate__animated custom-fadeInLeftSmall duration-400':
              selectedMember === member,
          }"
        >
          <img
            :src="member.img"
            :class="{
              'transition-all duration-500 ease-in-out h-72 w-72 object-cover rounded-full shadow-lg':
                selectedMember !== member,
              'transition-all duration-500 ease-in-out h-20 w-20 object-cover rounded-full':
                selectedMember === member,
            }"
            alt="Member Image"
          />
          <div v-if="selectedMember !== member" class="ml-8">
            <h2 class="text-3xl font-semibold mb-4">{{ member.name }}</h2>
            <p class="text-lg text-gray-600">{{ member.role }}</p>
          </div>
          <div v-else>
            <h2 class="text-xl font-semibold mb-2">{{ member.name }}</h2>
            <p class="text-sm text-gray-400">{{ member.role }}</p>
          </div>
        </div>
        <div
          v-if="selectedMember === member"
          class="animate__animated custom-fadeInRight duration-700 ml-auto"
        >
          <div class="rounded-lg p-8">
            <h3 class="text-2xl font-semibold mb-4">Bio</h3>
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

<style>
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
