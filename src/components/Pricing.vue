<template>
  <div class="bg-gray-100 min-h-screen p-12">
    <!-- Breadcrumbs -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-700 text-center">
        Pricing
      </h1>
      <div class="mt-2 ml-32 text-gray-500">
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

    <!-- Filters -->
    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-2 gap-8">
        <!-- Size filter -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-600"
            >Size:</label
          >
          <div class="relative">
            <select
              v-model="selectedSize"
              class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-400 cursor-pointer"
            >
              <option value="">All Sizes</option>
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>
        <!-- Material filter -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-600"
            >Material:</label
          >
          <div class="relative">
            <select
              v-model="selectedMaterial"
              class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-400 cursor-pointer"
            >
              <option value="">All Materials</option>
              <option
                v-for="material in materials"
                :key="material"
                :value="material"
              >
                {{ material }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Data Display -->
    <div
      v-for="category in filteredData"
      :key="category.name"
      class="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 class="text-2xl font-bold mb-6 text-gray-700">{{ category.name }}</h2>
      <div class="grid grid-cols-2 gap-6">
        <div
          v-for="material in materials"
          :key="material"
          class="relative p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-200"
          style="min-height: 175px"
        >
          <!-- Most Popular badge for Canvas -->
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
            <tbody class="relative min-h-[500px]">
              <tr>
                <th class="py-2 px-4 border-b border-gray-300 font-medium">
                  Size
                </th>
                <th class="py-2 px-4 border-b border-gray-300 font-medium">
                  3-Month
                </th>
                <th class="py-2 px-4 border-b border-gray-300 font-medium">
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
                  class="py-2 px-4 border-b border-gray-300 font-medium text-center"
                >
                  {{ item.size }}
                </td>
                <td class="py-2 px-4 border-b border-gray-300 text-center">
                  ${{ item['3months'] }}
                  <span class="text-xs text-gray-500">/ month</span>
                </td>
                <td class="py-2 px-4 border-b border-gray-300 text-center">
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
      sizes: [
        '14" x 11"',
        '24" x 16"',
        '30" x 20"',
        '24" x 18"',
        '24" x 24"',
        '40" x 30"',
      ],
      materials: ['Canvas', 'Posters'],
      durations: ['3 months', '6 months'],
      pricingData: [
        {
          name: 'Premium',
          items: [
            {
              size: '14" x 11"',
              type: 'Posters',
              '3months': '20.00',
              '6months': '15.00',
            },
            {
              size: '24" x 16"',
              type: 'Posters',
              '3months': '30.00',
              '6months': '20.00',
            },
            {
              size: '30" x 20"',
              type: 'Posters',
              '3months': '40.00',
              '6months': '25.00',
            },
            {
              size: '14" x 11"',
              type: 'Canvas',
              '3months': '15.00',
              '6months': '10.00',
            },
            {
              size: '24" x 18"',
              type: 'Canvas',
              '3months': '25.00',
              '6months': '15.00',
            },
            {
              size: '24" x 24"',
              type: 'Canvas',
              '3months': '30.00',
              '6months': '20.00',
            },
            {
              size: '40" x 30"',
              type: 'Canvas',
              '3months': '55.00',
              '6months': '35.00',
            },
          ],
        },
        {
          name: 'Standard',
          items: [
            {
              size: '14" x 11"',
              type: 'Posters',
              '3months': '15.00',
              '6months': '10.00',
            },
            {
              size: '24" x 16"',
              type: 'Posters',
              '3months': '20.00',
              '6months': '10.00',
            },
            {
              size: '30" x 20"',
              type: 'Posters',
              '3months': '20.00',
              '6months': '15.00',
            },
            {
              size: '14" x 11"',
              type: 'Canvas',
              '3months': '10.00',
              '6months': '10.00',
            },
            {
              size: '24" x 18"',
              type: 'Canvas',
              '3months': '15.00',
              '6months': '10.00',
            },
            {
              size: '24" x 24"',
              type: 'Canvas',
              '3months': '20.00',
              '6months': '15.00',
            },
            {
              size: '40" x 30"',
              type: 'Canvas',
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
