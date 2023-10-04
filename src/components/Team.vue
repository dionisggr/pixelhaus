<template>
  <div class="bg-white min-h-screen flex flex-col items-center py-16 px-6">
    <h1 class="text-4xl font-extrabold mb-12">Meet The Team</h1>
    <div
      v-for="(member, index) in teamMembers"
      :key="index"
      :class="{
        'animate__animated animate__fadeInLeft animate__delay-0.5s': index % 2 === 0,
        'animate__animated animate__fadeInRight animate__delay-0.5s': index % 2 !== 0
      }"
      class="w-full max-w-4xl mb-12 cursor-pointer transform transition-transform duration-300"
      @click="toggleMember(member)"
    >
      <div 
        :class="{
          'flex items-center space-x-8': selectedMember !== member,
          'flex items-center space-x-8 opacity-40': selectedMember === member
        }"
        class="hover:border-blue-500 hover:border-4 rounded-lg duration-500 group transition-all"
      >
        <div class="flex flex-col items-center">
          <img :src="member.img" :class="{'h-52 w-52 object-cover rounded-full shadow-lg': selectedMember !== member, 'h-20 w-20 object-cover rounded-full': selectedMember === member}" alt="Member Image" />
          <div>
            <h2 :class="{'text-3xl font-semibold mb-4': selectedMember !== member, 'text-xl font-semibold mb-2': selectedMember === member}">{{ member.name }}</h2>
            <p :class="{'text-lg text-gray-600': selectedMember !== member, 'text-sm text-gray-400': selectedMember === member}">{{ member.role }}</p>
          </div>
          <p :class="{'text-sm text-gray-500': selectedMember !== member, 'text-xs text-gray-400': selectedMember === member}">{{ member.dateJoined }}</p>
        </div>
        <div v-if="selectedMember === member" class="animate__animated animate__fadeIn duration-300 ml-auto">
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
          name: "Alley",
          role: "Creative Director",
          img: "https://source.unsplash.com/featured/?people,creative",
          dateJoined: "Jan 1, 2020",
          bio: "Alley is the creative genius behind the artistry of our products. From concept to creation, she ensures every detail is meticulously crafted.",
          moreBio: "Having worked as a digital artist for over 10 years, Alley brings her wealth of experience to the team."
        },
        {
          name: "Dio",
          role: "Software Engineer",
          img: "https://source.unsplash.com/featured/?people,tech",
          dateJoined: "Mar 15, 2020",
          bio: "Dio is the tech-savvy mind that brought our online platform to life. With a focus on user experience, he is the backbone of our technical operations.",
          moreBio: "Dio has been coding since he was in high school and brings an analytical mindset to solve complex challenges."
        }
      ],
      selectedMember: null
    };
  },
  methods: {
    toggleMember(member) {
      this.selectedMember = this.selectedMember === member ? null : member;
    }
  }
};
</script>

<style>
@import 'animate.css';
</style>
