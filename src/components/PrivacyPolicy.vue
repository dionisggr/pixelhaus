<template>
  <div class="min-h-screen bg-gray-100 py-12">
    
    <!-- Header and Breadcrumbs -->
    <div class="px-8 mb-4">
      <div class="flex justify-between items-center mb-2">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-gray-700 w-full text-center"
        >
          Privacy Policy
        </h1>
      </div>
      <div class="mt-2 ml-32 text-gray-500">
        <a href="#" class="hover:underline text-gray-500">Home</a> /
        <span class="text-gray-700">Privacy Policy</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full lg:w-10/12 xl:w-9/12 mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md p-8 space-y-8">
        <section
          class="space-y-4"
          v-for="(item, index) in policySections"
          :key="index"
        >
          <h2 class="text-2xl font-semibold text-gray-700 mb-2">
            {{ item.title }}
          </h2>
          <div class="bg-gray-100 rounded-lg p-4 text-lg text-gray-600">
            <div v-html="item.content"></div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      policySections: [
        {
          title: '1. Introduction',
          content:
            'Your privacy is important to us. This Privacy Policy outlines the types of information we collect, how we use it, and the choices you have regarding your personal information.',
        },
        {
          title: '2. Information We Collect',
          content:
            '<ul><li><strong>Personal Information:</strong> Name, email address, and shipping details.</li><li><strong>Financial Information:</strong> Credit card details and billing address.</li><li><strong>Usage Data:</strong> Your interactions with the platform, including rental history and art preferences.</li></ul>',
        },
        {
          title: '3. How We Use Your Information',
          content:
            'We use your personal information to process orders, manage rentals, and improve our services. Your email may be used for marketing communications, unless you opt-out.',
        },
        {
          title: '4. Information Sharing',
          content:
            'We may share your information with trusted third-party services for payment processing and delivery. We do not sell or rent your personal information.',
        },
        {
          title: '5. Data Security',
          content:
            'We employ industry-standard security measures to protect your information. However, no method is 100% secure. We cannot guarantee its absolute security.',
        },
        {
          title: '6. Cookies',
          content:
            'We use cookies to enhance your experience on our platform. You can choose to disable cookies through your browser settings, although this may affect certain features of the service.',
        },
        {
          title: '7. Your Choices',
          content:
            'You have the right to access, modify, or delete your personal information at any time through your account settings.',
        },
        {
          title: '8. Changes to this Policy',
          content:
            'We reserve the right to change this Privacy Policy at any time. Changes will be posted on this page, and your continued use of the platform indicates your acceptance of the new terms.',
        },
        {
          title: '9. Contact Us',
          content:
            'For any questions or concerns regarding this Privacy Policy, please contact us at [email].',
        },
      ],
    };
  },
};
</script>
