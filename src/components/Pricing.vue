<template>
  <div class="how-it-works" :class="isMobile ? 'p-4 py-10' : 'p-12'">
    <!-- Breadcrumbs -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        How It Works
      </h1>
      <div class="mt-2 text-center text-gray-500">
        <a href="#" class="hover:underline text-gray-500" @click="$emit('goTo', 'home')">Home</a> /
        <span class="text-gray-700">How It Works</span>
      </div>
    </div>

    <!-- Section Template -->
    <div v-for="section in sections" :key="section.key" class="mb-12 relative text-gray-700 rounded-lg shadow-lg p-8 bg-white">
      <h3 class="text-3xl font-semibold mb-2 text-center border-b-2 pb-2">
        {{ section.title }}
      </h3>
      <p class="text-center text-gray-600 italic pb-4 text-sm">{{ isMobile ? 'Tap' : 'Click' }} on each step to learn more</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mt-6">
        <div v-for="step in section.steps" :key="step.key" class="relative w-full mx-auto cursor-pointer" style="min-height: 230px" @click="flipCard(step.key)">
          <!-- Default View -->
          <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl" v-if="!flipped[step.key]">
            <div :class="iconSize(step.key)" class="bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer">
              <i class="material-icons">{{ step.icon }}</i>
            </div>
            <h4 class="font-bold mb-4">{{ step.title }}</h4>
            <p class="text-center">{{ step.description }}</p>
          </div>
          <!-- Flipped View -->
          <div class="absolute top-0 left-0 w-full h-fit flex flex-col items-center transform hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg hover:shadow-xl" v-if="flipped[step.key]">
            <div :class="iconSize(step.key)" class="bg-blue-500 rounded-full flex items-center justify-center mb-6 text-white cursor-pointer">
              <i class="material-icons">{{ step.icon }}</i>
            </div>
            <h4 class="font-bold mb-4">{{ step.title }}</h4>
            <ul class="space-y-2" :class="isMobile ? 'text-xs' : 'text-sm'">
              <li v-for="detail in step.details" :key="detail" class="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                <span class="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                {{ detail }}
              </li>
            </ul>
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
      selectedSize: '',
      selectedMaterial: '',
      selectedDuration: '',
      sizes: [
        '14" x 11"',
        '24" x 16"',
        '30" x 20"',
        '24" x 18"',
        '24" x 24"',
        '40" x 30"',
      ],
      materials: ['New', 'Pre-Rented'],
      durations: ['3 months', '6 months'],
      pricingData: [
        {
          name: 'Canvas',
          items: [
            {
              size: '14" x 11"',
              type: 'New',
              '3months': '15.00',
              '6months': '10.00',
            },
            {
              size: '24" x 18"',
              type: 'New',
              '3months': '25.00',
              '6months': '15.00',
            },
            {
              size: '24" x 24"',
              type: 'New',
              '3months': '30.00',
              '6months': '20.00',
            },
            {
              size: '40" x 30"',
              type: 'New',
              '3months': '55.00',
              '6months': '35.00',
            },
            {
              size: '14" x 11"',
              type: 'Pre-Rented',
              '3months': '10.00',
              '6months': '10.00',
            },
            {
              size: '24" x 18"',
              type: 'Pre-Rented',
              '3months': '15.00',
              '6months': '10.00',
            },
            {
              size: '24" x 24"',
              type: 'Pre-Rented',
              '3months': '20.00',
              '6months': '15.00',
            },
            {
              size: '40" x 30"',
              type: 'Pre-Rented',
              '3months': '35.00',
              '6months': '20.00',
            },
          ],
        },
      ],
    };
  },
  computed: {
    filteredData() {
      return this.pricingData.map((category) => {
        let items = category.items.filter((item) => {
          if (this.selectedSize && item.size !== this.selectedSize)
            return false;
          if (this.selectedMaterial && item.type !== this.selectedMaterial)
            return false;
          if (this.selectedDuration === '3 MONTHS' && !item['3months'])
            return false;
          if (this.selectedDuration === '6 MONTHS' && !item['6months'])
            return false;
          return true;
        });

        return { name: category.name, items };
      });
    },
  },
  methods: {
    materialCategoryItems(material, category) {
      return category.items.filter((i) => i.type === material);
    },
  },
};
</script>
