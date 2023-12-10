<template>
  <div class="pt-24">
    <Welcome />

    <Header
      :isMobile="isMobile"
      :user="user"
      :notifications="notifications"
      :cart="cart"
      @go-to="goTo"
      @set-user="setUser"
      @select-nav-item="selectNavItem"
      @set-notifications="setNotifications"
      @logout="logout"
      @demo="setupDemo"
      @sign-in="clerk.openSignIn"
    />

    <HeroSection
      v-if="selectedNavItem === 'home'"
      :isMobile="isMobile"
      :randomArts="randomArts"
      :arts="arts"
    />

    <Home
      v-if="selectedNavItem === 'home'"
      :isMobile="isMobile"
      :isSidebarHidden="isSidebarHidden"
      :arts="arts"
      :selectedArt="selectedArt"
      @go-to="goTo"
      @select-art="selectArt"
      @add-to-cart="addToCart"
    />

    <WallArt
      v-if="selectedNavItem === 'wall-art'"
      :isMobile="isMobile"
      :selectedArt="selectedArt"
      @delete-wall-art="deleteWallArt"
      @add-to-cart="addToCart"
      @select-image="selectImage"
    />

    <Checkout
      v-if="selectedNavItem === 'checkout'"
      :cart="cart"
      :isMobile="isMobile"
      @goTo="goTo"
    />

    <NotificationsPage
      v-if="selectedNavItem === 'notifications'"
      :notifications="notifications"
      :isMobile="isMobile"
    />

    <Orders
      v-if="selectedNavItem === 'orders'"
      :isMobile="isMobile"
      :orders="cart"
    />

    <AllOrders v-if="selectedNavItem === 'all-orders'" />

    <OurStory v-if="selectedNavItem === 'our-story'" :isMobile="isMobile" />

    <Team v-if="selectedNavItem === 'team'" />

    <Contact v-if="selectedNavItem === 'contact'" />

    <TermsOfService v-if="selectedNavItem === 'terms-of-service'" />

    <PrivacyPolicy v-if="selectedNavItem === 'privacy-policy'" />

    <HowItWorks v-if="selectedNavItem === 'how-it-works'" :isMobile="isMobile" />

    <Pricing v-if="selectedNavItem === 'pricing'" />

    <Profile
      v-if="selectedNavItem === 'profile'"
      :user="user"
      @logout="logout"
      @go-to="goTo"
    />

    <Footer />
  </div>
</template>

<script>
import { useClerk } from 'vue-clerk';
import Welcome from './Welcome.vue';
import Header from './Header.vue';
import Home from './Home.vue';
import HeroSection from './HeroSection.vue';
import WallArt from './WallArt.vue';
import WallArtSide from './WallArtSide.vue';
import Testimonials from './Testimonials.vue';
import Checkout from './Checkout.vue';
import NotificationsPage from './Notifications/Page.vue';
import Orders from './Orders.vue';
import OurStory from './OurStory.vue';
import Team from './Team.vue';
import Contact from './Contact.vue';
import TermsOfService from './TermsOfService.vue';
import PrivacyPolicy from './PrivacyPolicy.vue';
import Pricing from './Pricing.vue';
import HowItWorks from './HowItWorks.vue';
import Upload from './Admin/Arts.vue';
import AllOrders from './Admin/Orders.vue';
import Profile from './Profile.vue';
import Footer from './Footer.vue';
import data from '../data.js';

export default {
  components: {
    Welcome,
    Home,
    Header,
    HeroSection,
    WallArt,
    WallArtSide,
    Testimonials,
    Checkout,
    NotificationsPage,
    Orders,
    OurStory,
    Team,
    Contact,
    TermsOfService,
    PrivacyPolicy,
    Pricing,
    HowItWorks,
    Upload,
    AllOrders,
    Profile,
    Footer,
  },
  created() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  async mounted() {
    function showSlides() {
      let slides = document.getElementsByClassName('slide');

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 2000);
      }
    }

    // Data source (File vs API)
    const notifications = data.notifications;
    const arts = data.arts;
    const cart = data.cart;

    let slideIndex = 0;

    this.cart = cart;
    this.notifications = notifications.map((notification) => {
      const { created_at } = notification;

      notification.created_at = new Date(created_at)
        .toISOString()
        .split('T')[0];

      return notification;
    });
    this.categories = Object.keys(this.sidebar).map((category) => ({
      name: category,
      ...this.sidebar[category],
    }));

    showSlides();
    this.checkShowMoreButton();

    await this.clerk?.load();
    this.$forceUpdate();

    this.user = { ...this.clerk?.user };

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  data() {
    const arts = data.arts.map((art) => ({
      ...art, isAdded: false, flipped: false
    }));

    return {
      arts,
      clerk: useClerk(),
      selectedNavItem: 'home',
      displayedArts: [],
      selectedArt: null,
      showMoreButton: true,
      itemsToShow: 9,
      step: 12,
      cart: [],
      notification: null,
      timeout: null,
      isSidebarHidden: false,
      isLoggedIn: false, // Add this data property
      showDropdown: false,
      openModal: null,
      notifications: [],
      cart: [],
      showWelcomeModal: !localStorage.getItem('hidePixelHausModal'),
      disableWelcomeModal: localStorage.getItem('hidePixelHausModal'),
      sidebar: {
        Popular: { icon: 'star', color: 'blue' },
        New: { icon: 'new_releases', color: 'green' },
        Landscape: { icon: 'landscape', color: 'gray' },
        Water: { icon: 'waves', color: 'blue' },
        Sunflower: { icon: 'nature', color: 'yellow' },
        Food: { icon: 'fastfood', color: 'red' },
        Motherhood: { icon: 'pregnant_woman', color: 'green' },
        Woman: { icon: 'female', color: 'pink' },
        'Self Love': { icon: 'favorite', color: 'pink' },
        Sunset: { icon: 'brightness_3', color: 'blue' },
        Jibaro: { icon: 'music_note', color: 'green' },
        'Puerto Rico': { icon: 'beach_access', color: 'yellow' },
        'Tropical Paradise': { icon: 'umbrella', color: 'blue' },
      },
      isMobile: false,
      showNavSidebar: false,
    };
  },
  computed: {
    testimonials() {
      return data.testimonials;
    },
    faq() {
      return data.faq;
    },

    isAdmin() {
      return this.user?.publicMetadata?.is_admin;
    },
  },
  methods: {
    goTo(section) {
      this.openModal = null;
      this.selectedNavItem = section;

      if (this.isMobile) {
        this.showNavSidebar = false;
      }

      window.scrollTo(0, 0);
    },
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    },


    checkShowMoreButton() {
      this.showMoreButton = this.itemsToShow < this.arts.length;
    },

    checkWindowSize() {
      this.isMobile = window.innerWidth < 768;

      if (this.isMobile) {
        this.isSidebarHidden = true;
      }
    },
    async deleteWallArt() {
      this.arts = this.arts.filter((art) => art.id !== this.selectedArt.id);
      this.selectedNavItem = 'home';
    },
    addToCart(art) {
      const duplicate = this.cart.arts.find(
        (item) =>
          item.id === art.id &&
          item.duration === art.duration &&
          item.size === art.size &&
          item.category === art.category
      );

      if (duplicate) {
        duplicate.quantity += art.quantity;
      } else {
        this.cart.arts.push(art);
      }
    },
    editWallArt(art) {
      this.selectedArt = art;
      this.selectedNavItem = 'upload';
    },



    addNotification(notification) {
      this.notifications.unshift(notification);
    },
    dismissWelcomeModal() {
      this.showWelcomeModal = false;

      if (this.disableWelcomeModal) {
        localStorage.setItem('hidePixelHausModal', true);
      }
    },

    logout() {
      this.clerk?.signOut();

      this.user = null;

      this.goTo('home');
      this.$forceUpdate();
    },
    selectNavItem(item) {
      this.selectedNavItem = item;
    },
    setupDemo() {
      this.user = {
        id: 'demo',
        firstName: 'User',
        lastName: 'Demo',
        email: 'user@demo.com',
        is_admin: true,
      };

      this.$forceUpdate();
    },
    setNotifications(notifications) {
      this.notifications = notifications;
    },
    selectArt(art) {
      this.selectedArt = art;
    },
  },
  watch: {
    disableWelcomeModal(newVal) {
      if (newVal) {
        localStorage.setItem('hidePixelHausModal', true);
      } else {
        localStorage.removeItem('hidePixelHausModal');
      }
    },
  },
};
</script>

<style scoped>
.art-item:hover .art-hover {
  display: block;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 33.3333%));
  }
}

.animate-scroll {
  animation: scroll 20s linear infinite;
}

.answer.hidden {
  display: none;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background-color: #f3f4f6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Initial State */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-right-enter-to {
  transform: translateX(0%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

.material-icons.large-icon {
  font-size: 50px; /* Further adjust the size */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  backdrop-filter: blur(4px);
}

/* Slide and fade combination */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.fade-slide-enter,
.fade-slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}

.two-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(1.5em * 2);
}
</style>
