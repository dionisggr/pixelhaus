<template>
  <div class="relative">
    <!-- Header -->
    <header
      class="bg-white shadow-md text-gray-700"
      :class="[isMobile ? 'p-4' : 'p-6', { 'sticky top-0 z-50': isMobile }]"
    >
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo and Title -->
        <div
          class="flex items-center space-x-4 cursor-pointer"
          @click="goTo('home')"
        >
          <i class="material-icons text-4xl pr-0 text-blue-500">border_all</i>
          <h1 class="text-2xl font-semibold">PixelHaus</h1>
        </div>

        <!-- Nav Links (Visible on large screens) -->
        <div
          class="justify-between w-1/3 space-x-4"
          :class="isMobile ? 'hidden' : 'flex'"
        >
          <a
            href="#how-it-works"
            class="text-gray-700 font-bold hover:text-blue-500"
            @click="selectedNavItem = 'how-it-works'"
            >How It Works</a
          >
          <a
            href="#pricing"
            class="text-gray-700 font-bold hover:text-blue-500"
            @click="selectedNavItem = 'pricing'"
            >Pricing</a
          >
        </div>

        <!-- Hamburger Menu (Visible on small screens) -->
        <div v-if="isMobile" class="lg:hidden flex items-center space-x-5">
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500"
            @click="showNavSidebar = !showNavSidebar"
            >menu</i
          >
        </div>
        <div v-else class="flex items-center space-x-5">
          <!-- Notifications -->
          <div class="relative">
            <i
              class="material-icons text-2xl cursor-pointer hover:text-blue-500"
              @click="
                openModal =
                  openModal === 'notifications' ? null : 'notifications'
              "
            >
              notifications
            </i>
            <!-- Blue Dot for Unread Notifications -->
            <span
              v-if="notifications.some((notification) => !notification.read)"
              class="absolute bottom-1.5 right-0 w-2.5 h-2.5 bg-blue-500 shadow-lg rounded-full"
            ></span>
          </div>
          <div
            v-if="openModal === 'notifications'"
            @mouseleave="markNotificationsRead"
            class="absolute top-12 right-10 w-96 bg-white rounded-lg shadow-md z-20 p-4 border-l border-r border-gray-300"
          >
            <div class="border-b-2 border-gray-200 pb-2 mb-4">
              <h3 class="text-2xl font-extrabold text-gray-800">
                Notifications
              </h3>
            </div>
            <div class="overflow-y-auto max-h-72">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex items-center space-x-4 mb-4 rounded-lg p-3 transition cursor-pointer"
                :class="
                  notification.read
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : 'bg-yellow-50 hover:bg-yellow-100'
                "
              >
                <i
                  :class="{
                    'material-icons text-blue-500':
                      notification.type === 'order',
                    'material-icons text-yellow-500':
                      notification.type === 'reminder',
                  }"
                >
                  {{
                    notification.type === 'order'
                      ? 'local_shipping'
                      : 'calendar_today'
                  }}
                </i>
                <div class="flex-grow">
                  <span class="block text-sm font-medium text-gray-700">{{
                    notification.message
                  }}</span>
                  <span class="text-xs text-gray-500">{{
                    notification.time
                  }}</span>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="flex justify-center">
              <a
                href="#"
                class="inline-block whitespace-nowrap w-1/2 text-center text-white bg-blue-600 hover:bg-blue-700 p-1.5 rounded-full text-sm"
                @click="goTo('notifications')"
              >
                See All
              </a>
            </div>
          </div>

          <!-- Shopping Cart -->
          <i
            class="material-icons text-2xl cursor-pointer hover:text-blue-500"
            @click="openModal = openModal === 'cart' ? null : 'cart'"
          >
            shopping_cart
          </i>
          <div
            v-if="openModal === 'cart'"
            @mouseleave="openModal = null"
            class="absolute top-16 right-12 w-96 bg-white rounded-lg shadow-md z-20 p-4 border-l border-r border-gray-300"
          >
            <div class="border-b-2 border-gray-300 pb-2 mb-6">
              <h3 class="text-2xl font-extrabold text-gray-700">Your Cart</h3>
            </div>
            <div class="overflow-x-auto max-h-72">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="mb-6 relative"
              >
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <img
                      :src="item.thumbnail"
                      alt="thumbnail"
                      class="w-12 h-12 object-cover rounded"
                    />
                    <span
                      v-if="item.quantity > 1"
                      class="absolute bottom-0 right-0 text-xs bg-blue-500 text-white rounded px-1"
                    >
                      x{{ item.quantity }}
                    </span>
                  </div>
                  <div>
                    <span class="font-medium">{{ item.name }}</span>
                    <span class="text-sm text-gray-500 block">
                      {{ item.material }}, {{ item.size }} ({{
                        item.dimensions
                      }})
                    </span>
                  </div>
                </div>
                <div class="text-gray-700 flex justify-between items-end">
                  <span class="text-xs"># {{ item.id.substring(0, 12) }}</span>
                  <span>${{ item.cost }}</span>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <span class="font-bold">Subtotal</span>
              <span class="text-gray-700">${{ subtotal }}</span>
            </div>
            <a
              href="#"
              @click="selectedNavItem = 'checkout'"
              class="block w-1/2 mx-auto text-center text-white bg-blue-600 hover:bg-blue-700 mt-6 p-1.5 rounded-full text-sm"
            >
              Checkout
            </a>
          </div>

          <div class="border-l-2 h-6 mx-4"></div>

          <!-- Account -->
          <div v-if="isLoggedIn" class="relative">
            <img
              src="https://source.unsplash.com/random/50x50?face"
              alt="User Thumbnail"
              class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
              @click="openModal = openModal === 'account' ? null : 'account'"
            />
            <div
              v-if="openModal === 'account'"
              @mouseleave="openModal = null"
              class="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-md z-10"
            >
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
              >
                My Profile
              </a>
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
                @click="selectedNavItem = 'orders'"
              >
                My Orders
              </a>
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
                @click="selectedNavItem = 'upload'"
              >
                Upload (Admin)
              </a>
              <a
                href="#"
                class="block text-gray-700 hover:bg-blue-500 hover:text-white p-3"
                @click="logout"
              >
                Logout
              </a>
            </div>
          </div>

          <div v-else class="flex items-center space-x-3">
            <a
              href="#"
              class="text-gray-700 font-bold hover:text-blue-500"
              @click="isLoggedIn = true"
              >Sign In</a
            >
          </div>
        </div>
      </div>

      <!-- Overlay to fade the rest of the viewport -->
      <div
        v-if="showNavSidebar"
        class="overlay"
        @click="showNavSidebar = false"
      ></div>

      <transition name="slide-right">
        <!-- Sidebar Navigation (Mobile & Tablet) -->
        <div
          v-if="showNavSidebar"
          class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg rounded-lg z-20 p-2 lg:hidden transition-all duration-300"
        >
          <!-- Header of the sidebar with title and close button -->
          <div
            class="flex justify-between items-center mb-6 border-b-2 p-2 pb-3"
          >
            <span class="text-lg font-bold">PixelHaus</span>
            <i
              class="material-icons text-lg cursor-pointer hover:text-blue-500 transition-colors duration-300"
              @click="showNavSidebar = !showNavSidebar"
              >close</i
            >
          </div>

          <!-- Navigation Links -->
          <nav v-if="isLoggedIn" class="space-y-3">
            <a
              href="#how-it-works"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="showNavSidebar = false"
              >My Profile</a
            >
            <a
              href="#pricing"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="
                selectedNavItem = 'orders';
                showNavSidebar = false;
              "
              >My Orders</a
            >
            <a
              href="#sign-in"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="
                selectedNavItem = 'upload';
                showNavSidebar = false;
              "
              >Upload (Admin)</a
            >
            <a
              href="#sign-in"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="
                isLoggedIn = false;
                selectedNavItem = 'home';
                showNavSidebar = false;
              "
              >Logout</a
            >
          </nav>
          <nav v-else class="space-y-3 mt-10">
            <a
              href="#how-it-works"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="
                selectedNavItem = 'how-it-works';
                showNavSidebar = false;
              "
              >How It Works</a
            >
            <a
              href="#pricing"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="
                selectedNavItem = 'pricing';
                showNavSidebar = false;
              "
              >Pricing</a
            >
            <a
              href="#sign-in"
              class="block text-gray-700 font-bold hover:text-blue-500 text-center py-3 transition-colors duration-300 rounded-md hover:shadow-md active:shadow-md"
              @click="
                isLoggedIn = true;
                selectedNavItem = 'home';
                showNavSidebar = false;
              "
              >Sign In</a
            >
          </nav>

          <!-- Notifications -->
          <div
            class="flex items-center space-x-4 mt-6 ml-2 hover:shadow-md active:shadow-md p-4"
            :class="{ 'opacity-50 cursor-not-allowed': !isLoggedIn }"
            @click="
              selectedNavItem = 'notifications';
              showNavSidebar = false;
            "
          >
            <i
              class="material-icons text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
              @click="
                openModal =
                  openModal === 'notifications' ? null : 'notifications'
              "
              >notifications</i
            >
            <span class="font-medium">Notifications</span>
          </div>

          <!-- Cart -->
          <div
            class="flex items-center space-x-4 ml-2 hover:shadow-md active:shadow-md p-4"
            :class="{ 'opacity-50 cursor-not-allowed': !isLoggedIn }"
            @click="
              selectedNavItem = 'checkout';
              showNavSidebar = false;
            "
          >
            <i
              class="material-icons text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
              @click="openModal = openModal === 'cart' ? null : 'cart'"
              >shopping_cart</i
            >
            <span class="font-medium">Cart</span>
          </div>
        </div>
      </transition>
    </header>

    <!-- Home -->
    <div id="home" class="home px-3" v-if="selectedNavItem === 'home'">
      <!-- Hero Section -->
      <section class="relative" :class="isMobile ? 'mt-2' : 'mt-6'">
        <div class="container mx-auto">
          <div
            class="bg-white p-3 md:p-5 rounded-xl overflow-hidden shadow-md relative"
            :style="isMobile ? 'height: 55vh' : 'height: 70vh'"
          >
            <div class="slide-show h-full overflow-hidden relative">
              <div
                class="slide-container flex transition-transform duration-500 ease-in-out h-full"
              >
              <div class="w-full overflow-hidden rounded-xl">
                <img
                  :src="randomArts?.[0].images[0]"
                  :alt="randomArts?.[0].title"
                  class="rounded-xl w-full object-contain slide h-full"
                  style="transform: scale(3.5)"
                />
                <img
                  :src="randomArts?.[1].images[0]"
                  :alt="randomArts?.[1].title"
                  class="rounded-xl w-full object-contain slide h-full"
                  style="transform: scale(3.5)"
                />
                <img
                  :src="randomArts?.[2].images[0]"
                  :alt="randomArts?.[2].title"
                  class="rounded-xl w-full object-contain slide h-full"
                  style="transform: scale(3.5)"
                />
                <img
                  :src="randomArts?.[3].images[0]"
                  :alt="randomArts?.[3].title"
                  class="rounded-xl w-full object-contain slide h-full"
                  style="transform: scale(3.5)"
                />
                <img
                  :src="randomArts?.[4].images[0]"
                  :alt="randomArts?.[4].title"
                  class="rounded-xl w-full object-contain slide h-full"
                  style="transform: scale(3.5)"
                />
              </div>
              </div>
              <!-- CTA Overlay with Gradient -->
              <div
                class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent flex flex-col justify-center items-center px-2 rounded-xl"
              >
                <h2
                  class="text-2xl font-semibold text-white mb-2 md:text-3xl animate__animated animate__fadeInDown"
                >
                  Discover Modern Art
                </h2>
                <p
                  class="text-md text-white mb-3 opacity-80 md:text-lg animate__animated animate__fadeInUp"
                >
                  Experience creativity like never before.
                </p>
                <!-- Enhanced CTA Button -->
                <a
                  href="#search-bar"
                  class="mt-8 py-2 px-5 md:py-3 md:px-8 rounded-lg text-white bg-blue-500 hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                >
                  Explore Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Search Bar -->
      <section id="search-bar" class="mt-12 container mx-auto">
        <div class="text-center mb-4 text-gray-700">
          <h2 class="text-2xl font-bold">Search Artworks</h2>
          <p class="text-sm text-gray-700 leading-relaxed">
            Find for the wall arts you love.
          </p>
        </div>
        <div
          class="relative flex items-center mx-auto bg-white p-4 rounded-full shadow-md"
          :class="isMobile ? 'w-full' : 'w-3/4'"
        >
          <i
            class="material-icons text-4xl absolute left-6 top-1/2 transform -translate-y-1/2"
            >search</i
          >
          <div
            class="absolute left-14 top-1/2 h-6 border-l-2 transform -translate-y-1/2"
          ></div>
          <input
            type="text"
            placeholder="Search for wall arts..."
            v-model="searchTerm"
            class="rounded-full p-2 pl-16 w-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </section>

      <!-- Sidebar -->
      <section
        class="sidebar container mx-auto mb-16 items-start"
        :class="[{ flex: !isMobile }, isMobile ? 'mt-4' : 'mt-10']"
      >
        <div
          v-if="isMobile && !isSidebarHidden"
          class="fixed inset-0 bg-gray-800 opacity-50 z-20"
          @click="toggleSidebar"
        ></div>

        <aside
          :class="{
            'bg-gray-50 rounded-xl shadow-md transition-transform duration-300 flex flex-col items-center justify-center mr-8':
              !isMobile,
            'fixed top-20 z-20 p-2': !isMobile && isSidebarHidden,
            'fixed top-20 z-20 p-4 left-4 right-4 bg-gray-50 rounded-xl shadow-md transition-transform duration-300 flex flex-col items-center justify-center':
              isMobile && !isSidebarHidden,
            'pb-2 p-6': !isMobile && !isSidebarHidden,
          }"
          style="font-family: 'Poppins', sans-serif; height: fit-content"
          :style="
            !isMobile && !isSidebarHidden && 'width: 25%; min-width: 275px;'
          "
        >
          <div class="w-full flex justify-between items-baseline">
            <h2
              v-if="!isSidebarHidden"
              class="text-2xl font-semibold mb-4 border-b pb-2 text-center w-full bg-clip-text text-transparent text-blue-500 uppercase text-shadow-md"
            >
              Categories
            </h2>
            <button
              @click="toggleSidebar"
              class="flex items-center dark:bg-gray-800 p-2 rounded-full dark:hover:bg-gray-700 transition-colors"
              :class="!isSidebarHidden && 'ml-4 bg-gray-100 hover:bg-gray-200'"
            >
              <i
                v-if="!isMobile || (isMobile && !isSidebarHidden)"
                class="material-icons text-2xl font-bold"
              >
                {{ isSidebarHidden ? 'menu' : 'arrow_back' }}
              </i>
            </button>
          </div>

          <ul v-if="!isSidebarHidden" class="w-full">
            <li
              v-for="{ name, icon, color } in categories"
              :key="name"
              @click="selectCategory(name)"
              :class="[
                'flex items-center mb-3 text-gray-700 transition-all cursor-pointer p-2 rounded transform uppercase pl-2',
                selectedCategory === name
                  ? [
                      'bg-gray-200 shadow-md',
                      `border-${color}-600`,
                      `text-${color}-600 border-l-4`,
                    ]
                  : [
                      `hover:bg-gray-200 hover:shadow-md hover:scale-105 hover:border-${color}-600 hover:text-${color}-600`,
                    ],
              ]"
            >
              <i
                class="material-icons mr-4 transform transition-transform duration-300"
                :class="[
                  `text-${color}-600`,
                  selectedCategory === name ? 'rotate-45' : 'hover:rotate-45',
                ]"
              >
                {{ icon }}
              </i>
              {{ name }}
            </li>
          </ul>
        </aside>

        <!-- Inventory Section -->
        <div
          class="flex-grow grid grid-cols-1 gap-6 px-4"
          id="inventory-section"
        >
          <!-- Dropdown header -->
          <div
            v-if="isSidebarHidden && isMobile"
            class="w-5/6 mx-auto flex items-center justify-between bg-white border rounded-lg shadow-md p-2 cursor-pointer hover:shadow-lg"
            @click="isSidebarHidden = !isSidebarHidden"
          >
            <h2
              class="text-2xl px-2 font-bold text-center uppercase bg-clip-text text-transparent text-blue-500 text-shadow-md"
            >
              {{ selectedCategory }}
            </h2>
            <svg
              class="h-6 w-6 transform transition-transform duration-300"
              :class="{ 'rotate-180': !isSidebarHidden }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <h2
            v-else
            class="text-3xl font-bold text-center uppercase bg-clip-text text-transparent text-blue-500 text-shadow-md text-semibold"
          >
            {{ selectedCategory }}
          </h2>
          <div
            :class="{
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':
                !isSidebarHidden,
              'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6':
                isSidebarHidden,
            }"
          >
            <!-- Wall Art Preview -->
            <div
              v-for="(art, i) in displayedArts"
              :key="i"
              class="group w-full max-w-lg relative art-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500"
            >
              <transition name="fade-slide" mode="out-in">
                <!-- Front Side -->
                <div
                  v-if="!art.flipped"
                  class="image-preview flex-shrink-0 relative aspect-content"
                  :Style="
                    isMobile &&
                    'min-height: 370px; margin-top: calc(-3.7vw * 4);'
                  "
                  @click="
                    selectedNavItem = 'wall-art';
                    selectedArt = art;
                  "
                >
                  <!-- Main Image -->
                  <img
                    :src="art.images[0]"
                    :alt="art.title"
                    class="main-image w-full cursor-pointer"
                  />
                  <!-- Hover Image -->
                  <img
                    :src="art.images[1]"
                    :alt="art.title"
                    class="hover-image w-full cursor-pointer opacity-0 group-hover:opacity-100 absolute top-0 transition-opacity py-4"
                  />

                  <!-- Art Details -->
                  <div
                    class="p-3 pb-3.5 flex flex-col space-y-1 absolute bottom-0 bg-white"
                  >
                    <div
                      class="flex justify-between items-center text-gray-700"
                    >
                      <h3 class="text-lg font-semibold">{{ art.title }}</h3>
                      <button
                        @click.stop="toggleItem(art.id)"
                        :class="[
                          art.isAdded
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-blue-500 hover:bg-blue-600',
                          'text-white rounded-full p-2 transition-all',
                        ]"
                      >
                        <!-- Add Icon -->
                        <svg
                          v-if="!art.isAdded"
                          xmlns="http://www.w3.org/2000/svg"
                          class="add h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <!-- Remove Icon -->
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="remove h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 12h12"
                          />
                        </svg>
                      </button>
                    </div>
                    <p class="text-sm text-gray-700 two-line-ellipsis w-10/12">
                      {{ art.description || loremText }}
                    </p>
                  </div>

                  <!-- Notification Transition -->
                  <transition name="fade" mode="out-in">
                    <div
                      v-if="art.notification"
                      class="absolute top-0 right-0 mt-4 mr-4 px-2 bg-gray-900 bg-opacity-75 text-xs text-white p-1 rounded-full shadow-lg"
                    >
                      {{ art.notification }}
                    </div>
                  </transition>
                </div>

                <!-- Back Side -->
                <div
                  v-else
                  class="p-4 flex flex-col space-y-4 justify-center h-full max-w-screen-md mx-auto"
                >
                  <!-- Art Title with Thumbnail and Back Button -->
                  <div class="flex items-center space-x-4 mb-4">
                    <img
                      :src="art.images[0]"
                      alt="Thumbnail"
                      class="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                    <div class="flex-grow">
                      <h4 class="font-semibold text-xl text-gray-700">
                        {{ art.title }}
                      </h4>
                    </div>
                    <button
                      @click="toggleItem(art.id)"
                      class="bg-gray-200 hover:bg-gray-300 p-3.5 rounded-full transition-colors duration-300"
                    >
                      <i class="fas fa-arrow-left"></i>
                    </button>
                  </div>

                  <!-- Selection Sections: Material, Size, Duration -->
                  <div class="flex flex-col space-y-4">
                    <div
                      v-for="option in [
                        {
                          icon: 'fas fa-paint-brush',
                          label: 'Material',
                          values: ['Canvas', 'Poster'],
                        },
                        {
                          icon: 'fas fa-expand-arrows-alt',
                          label: 'Size',
                          values: ['Small', 'Medium', 'Large'],
                        },
                        {
                          icon: 'fas fa-clock',
                          label: 'Duration',
                          values: ['3-Months', '6-Months'],
                        },
                      ]"
                      :key="option.label"
                      class="flex items-center justify-between"
                    >
                      <label
                        class="text-sm font-medium flex items-center space-x-2"
                      >
                        <i :class="option.icon"></i>
                        <span>{{ option.label }}</span>
                      </label>
                      <div class="flex space-x-1.5">
                        <button
                          v-for="value in option.values"
                          :key="value"
                          @click="
                            art.selected[option.label.toLowerCase()] = value
                          "
                          :class="[
                            value === art.selected[option.label.toLowerCase()]
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700',
                            'text-xs px-4 py-1.5 rounded transition-colors duration-300 hover:bg-gray-300',
                          ]"
                        >
                          {{ value }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add to Cart Button -->
                  <button
                    @click="addToCart(art)"
                    :disabled="
                      !(
                        art.selected.material &&
                        art.selected.size &&
                        art.selected.duration
                      )
                    "
                    class="mt-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white text-medium w-1/2 mx-auto py-1.5 rounded-full transition-all duration-300 shadow-md flex justify-center items-center space-x-2"
                  >
                    <i class="fas fa-cart-plus"></i>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </transition>
            </div>
          </div>
          <button
            v-if="itemsToShow < arts.length"
            @click="showMore"
            class="mt-8 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-all mx-auto"
            style="max-width: fit-content"
          >
            Show More
          </button>
        </div>
      </section>

      <!-- Testimonials -->
      <Testimonials :isMobile="isMobile" />

      <!-- FAQ -->
      <section class="bg-white py-16 shadow-md rounded-lg" id="faq">
        <div class="container mx-auto px-4 text-gray-700">
          <h2 class="text-4xl text-center font-bold mb-12">FAQ</h2>
          <!-- Adjust grid layout for responsiveness -->
          <div
            class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:w-1/2 xl:grid-cols-1 gap-4 grid-flow-row mx-auto"
          >
            <div
              v-for="{ question, answer } in faq"
              class="faq-item bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105 cursor-pointer flex flex-col"
              @click="toggleAnswer($event)"
            >
              <div class="flex justify-between items-center">
                <h3
                  class="text-xl font-semibold text-gray-700 hover:text-gray-800"
                >
                  {{ question }}
                </h3>
                <i class="material-icons toggle-icon">add</i>
              </div>
              <p class="text-gray-700 answer hidden mt-4">
                {{ answer }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Follow Us -->
      <section class="bg-gray-100 py-20 rounded-lg">
        <div class="container mx-auto text-center">
          <h2
            class="text-4xl text-gray-700 font-extrabold mb-12 tracking-tighter"
          >
            Stay Updated!
          </h2>
          <div class="flex justify-center space-x-8 md:space-x-12 flex-wrap">
            <a
              href="#"
              class="text-blue-500 hover:text-blue-600 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
            <a
              href="#"
              class="text-red-600 hover:text-red-700 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-instagram-square"></i>
            </a>
            <a
              href="#"
              class="text-blue-700 hover:text-blue-800 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              href="#"
              class="text-red-500 hover:text-red-600 text-5xl transition duration-300 ease-in-out transform hover:scale-125"
            >
              <i class="fab fa-pinterest-square"></i>
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Wall Art -->
    <WallArt
      v-if="selectedNavItem === 'wall-art'"
      :isMobile="isMobile"
      :selectedArt="selectedArt"
      @delete-wall-art="deleteWallArt"
    />

    <!-- Checkout -->
    <Checkout
      v-if="selectedNavItem === 'checkout'"
      :cartItems="cartItems"
      :isMobile="isMobile"
      @goTo="goTo"
    />

    <!-- Notifications -->
    <NotificationsPage
      v-if="selectedNavItem === 'notifications'"
      :notifications="notifications"
      :isMobile="isMobile"
    />

    <!-- Orders -->
    <Orders v-if="selectedNavItem === 'orders'" :orders="cartItems" />

    <!-- Our Story -->
    <OurStory v-if="selectedNavItem === 'our-story'" :isMobile="isMobile" />

    <!-- Team -->
    <Team v-if="selectedNavItem === 'team'" />

    <!-- Contact -->
    <Contact v-if="selectedNavItem === 'contact'" />

    <!-- Terms of Service -->
    <TermsOfService v-if="selectedNavItem === 'terms-of-service'" />

    <!-- Privacy Policy -->
    <PrivacyPolicy v-if="selectedNavItem === 'privacy-policy'" />

    <!-- How It Works -->
    <HowItWorks
      v-if="selectedNavItem === 'how-it-works'"
      :isMobile="isMobile"
    />

    <!-- Pricing -->
    <Pricing v-if="selectedNavItem === 'pricing'" />

    <!-- Upload -->
    <Upload
      v-if="selectedNavItem === 'upload'"
      :isMobile="isMobile"
      :variants="displayedArts[0].variants"
      :print_areas="displayedArts[0].print_areas"
    />

    <!-- Footer -->

    <footer class="bg-white text-gray-700 mt-4 border-t border-gray-300">
      <div class="container mx-auto px-4 pt-12 pb-6 space-y-8 md:space-y-0">
        <!-- Top Row: Links and Newsletter -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <!-- About Us Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2"
            >
              About Us
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'our-story'"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'team'"
                >
                  Team
                </a>
              </li>
            </ul>
          </div>

          <!-- Support Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2"
            >
              Support
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="goTo('contact')"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'privacy-policy'"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-blue-400"
                  @click="selectedNavItem = 'terms-of-service'"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter Section -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2"
            >
              Newsletter
            </h3>
            <form class="mt-4">
              <input
                type="email"
                placeholder="Email Address"
                class="w-full p-2 rounded-md text-gray-700 border border-gray-300"
              />
              <button
                type="submit"
                class="mt-2 w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white p-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Row: Social Links and Copyright -->
        <div
          class="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-0"
        >
          <div class="flex space-x-4 mb-4 md:mb-0">
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-blue-400">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <div class="text-sm text-gray-700 font-semibold mt-6">
            &copy; 2023 PixelHaus. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import WallArt from './WallArt.vue';
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
import Upload from './Upload.vue';
import service from '../service.js';
import data from '../data.js';

export default {
  components: {
    WallArt,
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
  },
  async mounted() {
    let slideIndex = 0;
    let arts = [];

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

    if (import.meta.env.VITE_ENV === 'production') {
      arts = await service.getProducts();
    } else {
      arts = data.arts;
    }

    arts = arts.map((art) => ({
      ...art,
      isAdded: false,
      flipped: false,
      selected: {
        material: 'Canvas',
        size: 'Large',
        duration: '6-Months',
      },
    }));

    arts.reduce((obj, { tags }) => {
      tags.forEach((tag) => {
        if (!obj[tag]) {
          obj[tag] = 1;
        }
      });

      return obj;
    }, {});

    this.arts = arts;
    this.displayedArts = arts.slice(0, this.itemsToShow);
    this.randomArts = arts.sort(() => Math.random() - 0.5).slice(0, 5);
    this.categories = Object.keys(this.sidebar).map((category) => ({
      name: category,
      ...this.sidebar[category],
    }));

    showSlides();
    this.displayedArts.forEach((art) => (art.isAdded = false));
    this.checkShowMoreButton();
  },
  created() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  data() {
    return {
      arts: [],
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
      selectedCategory: 'Popular',
      isLoggedIn: false, // Add this data property
      showDropdown: false,
      openModal: null,
      notifications: [
        {
          id: 'n1',
          message: 'Your order #123456789 has been confirmed',
          type: 'order',
          time: '1d',
          dateOrder: 1,
          read: false,
        },
        {
          id: 'n2',
          message: 'Your order #987654321 has been shipped',
          type: 'order',
          time: '2d',
          dateOrder: 2,
          read: false,
        },
        {
          id: 'n3',
          message: 'Your wall art is due for return',
          type: 'reminder',
          time: '2w',
          dateOrder: 14,
          read: false,
        },
        {
          id: 'n4',
          message: 'Shipping update for order #1122334455',
          type: 'order',
          time: '9/20',
          dateOrder: 80,
          read: false,
        },
        {
          id: 'n5',
          message: 'Monthly auto-pay reminder',
          type: 'reminder',
          time: '8/23',
          dateOrder: 75,
          read: true,
        },
        {
          id: 'n6',
          message: 'Your wall art is due for return',
          type: 'reminder',
          time: '8/05',
          dateOrder: 21,
          read: true,
        },
        {
          id: 'n7',
          message: 'Your order #3344556677 has been delivered',
          type: 'order',
          time: '7/30',
          dateOrder: 70,
          read: true,
        },
        {
          id: 'n8',
          message: 'Your subscription has been renewed',
          type: 'reminder',
          time: '7/15',
          dateOrder: 55,
          read: true,
        },
        {
          id: 'n9',
          message: 'Your order #1213141516 is on its way',
          type: 'order',
          time: '7/10',
          dateOrder: 50,
          read: true,
        },
        {
          id: 'n10',
          message: 'Return window for order #1213141516 closing soon',
          type: 'reminder',
          time: '7/05',
          dateOrder: 45,
          read: true,
        },
        {
          id: 'n11',
          message: 'Payment confirmation for order #1718192021',
          type: 'order',
          time: '6/15',
          dateOrder: 30,
          read: true,
        },
        {
          id: 'n12',
          message: 'Auto-pay reminder for your subscription',
          type: 'reminder',
          time: '6/10',
          dateOrder: 25,
          read: true,
        },
        {
          id: 'n13',
          message: 'Your order #2223242526 has been canceled',
          type: 'order',
          time: '6/05',
          dateOrder: 20,
          read: true,
        },
        {
          id: 'n14',
          message: 'Payment failed for order #2627282920',
          type: 'order',
          time: '5/30',
          dateOrder: 15,
          read: true,
        },
        {
          id: 'n15',
          message: 'Subscription expiration reminder',
          type: 'reminder',
          time: '5/15',
          dateOrder: 10,
          read: true,
        },
        {
          id: 'n16',
          message: 'Your order #3031323334 has been confirmed',
          type: 'order',
          time: '5/10',
          dateOrder: 5,
          read: true,
        },
      ],
      cartItems: [
        {
          id: '1234567890',
          name: 'Wall Art - Nature',
          cost: 19.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?art',
          material: 'Poster',
          size: 'Small',
          dimensions: '8"x10"',
          quantity: 1,
        },
        {
          id: '2345678901',
          name: 'Wall Art - Abstract',
          cost: 24.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?painting',
          material: 'Canvas',
          size: 'Medium',
          dimensions: '16"x20"',
          quantity: 2,
        },
        {
          id: '3456789012',
          name: 'Wall Art - Modern',
          cost: 21.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?sculpture',
          material: 'Poster',
          size: 'Large',
          dimensions: '24"x36"',
          quantity: 1,
        },
        {
          id: '4567890123',
          name: 'Wall Art - Parenting',
          cost: 19.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?parents',
          material: 'Poster',
          size: 'Small',
          dimensions: '8"x10"',
          quantity: 1,
        },
        {
          id: '5678901234',
          name: 'Wall Art - Puerto Rico',
          cost: 24.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?puertorico',
          material: 'Canvas',
          size: 'Medium',
          dimensions: '16"x20"',
          quantity: 2,
        },
        {
          id: '6789012345',
          name: 'Wall Art - Culture',
          cost: 21.99,
          thumbnail: 'https://source.unsplash.com/random/50x50?culture',
          material: 'Poster',
          size: 'Large',
          dimensions: '24"x36"',
          quantity: 1,
        },
      ],
      sidebar: {
        Popular: { icon: 'star', color: 'blue' },
        New: { icon: 'new_releases', color: 'green' },
        Landscape: { icon: 'landscape', color: 'gray' },
        // Abstract: { icon: 'palette', color: 'purple' },
        // Nature: { icon: 'landscape', color: 'green' },
        // Parenting: { icon: 'family_restroom', color: 'red' },
        // Culture: { icon: 'public', color: 'blue' },
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
      searchTerm: '',
      loremText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    };
  },
  computed: {
    testimonials() {
      return data.testimonials;
    },
    faq() {
      return data.faq;
    },
    subtotal() {
      return this.cartItems
        .reduce((acc, item) => acc + item.cost, 0)
        .toFixed(2);
    },
  },
  methods: {
    goTo(section) {
      if (section === 'home') {
        window.location.href = '/';
      }

      this.openModal = null;
      this.selectedNavItem = section;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.filterDisplayedArts();
    },
    filterDisplayedArts() {
      if (['Popular', 'New'].includes(this.selectedCategory)) {
        this.displayedArts = this.arts.slice(0, this.itemsToShow);
      } else {
        this.displayedArts = this.arts
          .filter((art) => art.tags.includes(this.selectedCategory))
          .slice(0, this.itemsToShow);
      }
      this.checkShowMoreButton();
    },
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    },
    toggleAnswer(event) {
      const answerElement = event.currentTarget.querySelector('.answer');
      if (answerElement.classList.contains('hidden')) {
        answerElement.classList.remove('hidden');
      } else {
        answerElement.classList.add('hidden');
      }
    },
    capitalizeFirstLetter(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    showMore() {
      this.itemsToShow += this.step;
      this.displayedArts = this.arts.slice(0, this.itemsToShow);

      this.checkShowMoreButton();
    },
    checkShowMoreButton() {
      this.showMoreButton = this.itemsToShow < this.arts.length;
    },
    toggleItem(id) {
      const art = this.displayedArts.find((item) => item.id === id);
      art.isAdded = !art.isAdded;
      art.flipped = !art.flipped;

      art.notification = art.isAdded
        ? 'Item added to cart'
        : 'Item removed from cart';

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        art.notification = null;
      }, 3000);
    },
    logout() {
      this.isLoggedIn = false;

      this.goTo('home');
    },
    markNotificationsRead() {
      this.openModal = null;
      this.notifications = this.notifications.map((notification) => {
        if (!notification.read) {
          notification.read = true;
        }

        return notification;
      });
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth < 768;

      if (this.isMobile) {
        this.isSidebarHidden = true;
      }
    },
    async deleteWallArt() {
      if (import.meta.env.VITE_ENV === 'production') {
        await service.deleteProduct(this.selectedArt.id);
      }

      this.arts = this.arts.filter((art) => art.id !== this.selectedArt.id);
      this.displayedArts = this.displayedArts.filter(
        (art) => art.id !== this.selectedArt.id
      );
      this.selectedNavItem = 'home';
    },
  },
  watch: {
    searchTerm() {
      if (this.searchTerm) {
        this.displayedArts = this.arts.filter((art) =>
          art.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.displayedArts = this.arts.slice(0, this.itemsToShow);
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

.image-preview {
  height: 23.5vw;
  max-height: 400px;
}

.main-image {
  transform: scaleX(1.21);
  transform-origin: center bottom;
  object-fit: cover;
  margin-top: calc(-0.9vw * 4);
}

.hover-image {
  transform: scaleY(0.7);
  margin-top: -1.1vw;
}
</style>
