<template>
  <div class="bg-gray-100 px-4 lg:px-12 my-12 md:my-12 md:mt-32 relatve">
    <!-- Back button -->
    <button
      @click="$emit('go-to', 'home')"
      class="absolute top-24 mt-2 left-6 bg-gray-200 hover:bg-gray-400 p-3.5 px-5 rounded-full transition-colors duration-300 shadow-sm"
    >
      <i class="fas fa-arrow-left text-gray-600 text-sm"></i>
    </button>

    <!-- Breadcrumbs -->
    <div class="my-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Pricing
      </h1>
      <div class="mt-2 text-center md:text-left md:ml-32 text-gray-500">
        <a
          href="#"
          class="hover:underline text-gray-500"
          @click="$emit('goTo', 'home')"
          >Home</a
        >
        /
        <span class="text-gray-700">Pricing</span>
      </div>
    </div>

    <!-- Pricing Data Display -->
    <div
      v-for="category in filteredData"
      :key="category.name"
      class="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8 max-w-6xl mx-auto"
    >
      <h2 class="text-2xl font-bold mb-6 text-gray-700">{{ category.name }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="material in materials"
          :key="material"
          class="relative p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-200"
          style="min-height: 175px"
        >
          <div
            class="absolute top-5 right-5 bg-blue-500 text-white text-xs py-1 px-3 rounded-full"
            v-if="material === 'Canvas'"
          >
            Most Popular
          </div>
          <h3 class="text-lg font-semibold mb-4 text-gray-600">
            {{ material }}
          </h3>

          <!-- Pricing Table -->
          <table class="min-w-full">
            <tbody class="relative">
              <tr>
                <th class="py-2 px-2 md:px-4 border-b border-gray-300 font-medium">
                  Size
                </th>
                <th class="py-2 px-2 md:px-4 border-b border-gray-300 font-medium">
                  3-Month
                </th>
                <th class="py-2 px-2 md:px-4 border-b border-gray-300 font-medium">
                  6-Month
                </th>
              </tr>
              <tr
                v-if="materialCategoryItems(material, category).length"
                v-for="(item, index) in materialCategoryItems(
                  material,
                  category
                )"
                :key="item.size"
                :class="index % 2 ? 'bg-gray-100' : ''"
              >
                <td
                  class="py-2 px-2 md:px-4 border-b border-gray-300 font-medium min-w-fit text-sm text-center"
                >
                  {{ item.size }}
                </td>
                <td class="py-2 px-2 md:px-4 border-b border-gray-300 text-center">
                  ${{ item['3months'] }}
                  <span class="text-xs text-gray-500">/ month</span>
                </td>
                <td class="py-2 px-2 md:px-4 border-b border-gray-300 text-center">
                  ${{ item['6months'] }}
                  <span class="text-xs text-gray-500">/ month</span>
                </td>
              </tr>

              <!-- No Results Message -->
              <div v-else class="p-6 mb-8 text-center absolute w-full">
                <p class="text-md text-gray-600">
                  No matching pricing details.
                </p>
              </div>
            </tbody>
          </table>
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
      materials: ['New', 'Pre-Rented'],
      durations: ['3 months', '6 months'],
      sizes: [
        '14" x 11"',
        '24" x 16"',
        '30" x 20"',
        '24" x 18"',
        '24" x 24"',
        '40" x 30"',
      ],
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
