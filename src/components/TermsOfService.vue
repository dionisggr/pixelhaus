<template>
  <div class="min-h-screen bg-gray-100 py-12">
        <!-- Back button -->
        <button
      @click="$emit('go-to', 'home')"
      class="absolute top-24 mt-2 left-6 bg-gray-200 hover:bg-gray-400 p-3.5 px-5 rounded-full transition-colors duration-300 shadow-sm"
    >
      <i class="fas fa-arrow-left text-gray-600 text-sm"></i>
    </button>

    <!-- Header and Breadcrumbs -->
    <div class="px-8 mb-4">
      <div class="flex justify-between items-center mb-2">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-gray-700 w-full text-center ml-2 md:ml-0"
        >
          Terms of Service
        </h1>
      </div>
      <div class="mt-2 ml-32 text-gray-500">
        <a href="#" class="hover:underline text-gray-500">Home</a> /
        <span class="text-gray-700">Contact Us</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full lg:w-10/12 xl:w-9/12 mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md p-8 space-y-8">
        <section
          class="space-y-4"
          v-for="(item, index) in termsSections"
          :key="index"
        >
          <h2 class="text-2xl font-semibold text-gray-700 mb-2">
            {{ item.title }}
          </h2>
          <div class="bg-gray-100 rounded-lg p-4 text-lg text-gray-600">
            {{ item.content }}
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
      termsSections: [
        {
          title: '1. Introduction',
          content:
            'These Terms of Service ("Terms") govern your access to and use of PixelHaus (the "Service") provided by [Your Name] ("Company," "we," or "us"). By using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.',
        },
        {
          title: '2. The Service',
          content:
            'The Service allows users to rent or purchase digital wall art that the Company creates using AI image generators such as DALL-E, Midjourney, and Stable Diffusion. Users can browse wall art categories, select pieces to rent or buy, order prints and frames, and manage rentals or purchases through the Service. Company retains the right to remove, add, or modify the art pieces and features available through the Service without prior notice.',
        },
        {
          title: '3. Your Account',
          content:
            'To use the Service, you must register for an account. You agree to provide accurate and complete information and update your information to keep it accurate and complete. You are solely responsible for the confidentiality of your account credentials and restricting access to your account. You accept responsibility for all activities under your account.',
        },
        {
          title: '4. Content Ownership',
          content:
            "All wall art images created by the Company using AI image generators are owned by the Company. Users may rent or purchase and display images per these Terms but don't acquire ownership rights. Users may not copy, download, modify, distribute, or create derivative works from rented or purchased art, nor use the Company's brand assets, including logos and trademarks, without prior written consent.",
        },
        {
          title: '5. Rental and Purchase Terms',
          content:
            "<ul><li><strong>Personal and Business Use</strong>: Rented or purchased art can be displayed in homes or businesses. Art can't be used for other commercial purposes unless through a commercial licensing agreement with the Company.</li><li><strong>Duration & Swapping</strong>: Rentals have set durations (month, 3 months, or 6 months). Users can swap pieces per rental term. At the end of a rental term, users must return, purchase, or swap the art.</li><li><strong>Purchases</strong>: Users may choose to purchase any piece they like, turning the rental into a permanent acquisition.</li><li><strong>Returns & Maintenance</strong>: Users are responsible for maintaining the quality of the wall art. Damages or excessive wear may incur restoration or restocking fees. Users should retain the shipping boxes containing return labels for the term's end. Users returning items without the original shipping box or without a fitting box may be charged additional fees.</li><li><strong>Violations</strong>: Company reserves the right to terminate rentals and request the return of art for violations of these Terms or other policies.</li></ul>",
        },
        {
          title: '6. AI Image Generation',
          content:
            "The Company uses AI image generators for wall art. While the Company avoids content that infringes rights or violates laws, it can't guarantee the absence of such content. Users should notify the Company of unauthorized content for takedown and refrain from claims against the Company in these instances.",
        },
        {
          title: '7. DMCA Policy',
          content:
            'The Company respects copyright law. As per the DMCA, copyright holders can request infringing material takedowns by submitting a notice to [Email]. Unauthorized content sharing by users may face legal actions.',
        },
        {
          title: '8. Acceptable Use',
          content:
            '<ul><li>Violating laws or third-party rights</li><li>Sharing rented or purchased art beyond allowed uses</li><li>Distributing malware or spam</li><li>Unauthorized data access</li><li>Interfering with Service operations or imposing unreasonable loads</li></ul>',
        },
        {
          title: '9. Fees and Billing',
          content:
            "Users pay directly for wall art selections, based on the piece's characteristics. All fees are in USD. The Company charges your payment method. Users cover any associated taxes, charges, or local fees. Refunds are considered case-by-case. Accounts with outstanding fees may face suspension or termination.",
        },
        {
          title: '10. Termination',
          content:
            'Users can terminate accounts anytime. Upon termination or the end of a rental term, the rented art must be returned. Accounts can be put on Hold until the Company confirms the return of the last serviced wall art, after which it will proceed with account deletion unless legal considerations arise.',
        },
        {
          title: '11. Disclaimer of Warranties',
          content:
            'The Service is "as is" without warranties. Use at your risk. The Company disclaims all warranties, whether express or implied.',
        },
        {
          title: '12. Limitation of Liability',
          content:
            "Unless due to gross negligence, the Company isn't liable for damages from using the Service. Liability is capped at the amounts paid to the Company under these Terms in the prior 12 months.",
        },
        {
          title: '13. Indemnity',
          content:
            'Users will indemnify and hold the Company harmless from any claims, damages, losses, liabilities, and related costs arising from: (i) Service use or Terms breach; (ii) any law or third-party right violations; or (iii) disputes between users.',
        },
        {
          title: '14. Governing Law',
          content:
            'These Terms adhere to [Your State] laws. Disputes related to these Terms are resolved in [County] courts.',
        },
        {
          title: '15. Modifications',
          content:
            'The Company can update these Terms, with modifications effective upon posting. Check regularly.',
        },
        {
          title: '16. Contact',
          content: 'For questions about these Terms, contact [email].',
        },
      ],
    };
  },
};
</script>
