<template>
  <div class="container mx-auto p-6">
    
    <!-- Profile Header -->
    <div class="flex flex-col items-center mb-10">
      <div class="relative">
        <img
          :src="user.avatar"
          alt="Avatar"
          class="w-24 h-24 rounded-full mb-4"
        />
        <label
          for="avatarUpload"
          class="absolute bottom-2 right-0 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-0.5 px-2 rounded-lg cursor-pointer"
        >
          Edit
          <input
            type="file"
            id="avatarUpload"
            @change="handleAvatarChange"
            class="hidden"
          />
        </label>
      </div>
      <h1 class="text-2xl font-semibold">
        {{ `${user.firstName} ${user.lastName}` }}
      </h1>
      <p class="text-gray-600">{{ user.email }}</p>
    </div>

    <!-- Profile Sections -->
    <div class="flex flex-col gap-6">

      <!-- Personal Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Personal Information</h2>
        <form @submit.prevent="updateProfile">
          <div class="flex flex-wrap -mx-2">
            <div class="mb-4 px-2 w-full md:w-1/2">
              <input
                v-model="formData.firstName"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div class="mb-4 px-2 w-full md:w-1/2">
              <input
                v-model="formData.lastName"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-2">
            <div class="mb-4 px-2 w-full md:w-1/2">
              <input
                v-model="formData.email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div
              class="mb-4 px-2 w-full md:w-1/2 flex justify-center items-center"
            >
              <button
                @click="showChangePasswordModal = true"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Change Password
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-auto py-2 px-4 rounded block mt-6 focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </form>
      </div>

      <!-- Payment Methods -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Payment Methods</h2>
        <div class="flex flex-wrap justify-start">
          <div
            v-for="card in paymentMethods"
            :key="card.id"
            class="p-2 w-full md:w-1/3"
          >
            <div
              class="flex flex-col md:flex-row items-start md:items-center justify-between border p-6 py-8 rounded-xl"
            >
              <div class="flex-1">
                <p>{{ card.cardType }} ending in {{ card.last4Digits }}</p>
                <p class="text-gray-600">Expires {{ card.expiry }}</p>
              </div>
              <button
                @click="removeCard(card.id)"
                class="text-red-500 hover:text-red-700 focus:outline-none self-end md:self-center"
              >
                <span class="material-icons">delete_outline</span>
              </button>
            </div>
          </div>
        </div>
        <button
          @click="showAddCardModal = true"
          class="mt-6 mx-auto block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Card
        </button>
      </div>

      <!-- Danger Zone -->
      <div class="bg-red-100 p-6 shadow rounded-lg">
        <h2 class="text-2xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <div class="text-center">
          <button
            @click="showDeleteAccountModal = true"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg p-6 w-1/3">
        <h2 class="text-xl font-semibold mb-4">Change Password</h2>
        <form @submit.prevent="changePassword">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="oldPassword"
            >
              Old Password
            </label>
            <input
              v-model="oldPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="oldPassword"
              type="password"
              placeholder="Old Password"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newPassword"
            >
              New Password
            </label>
            <input
              v-model="newPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="New Password"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirmNewPassword"
            >
              Confirm New Password
            </label>
            <input
              v-model="confirmNewPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
            />
          </div>
          <div class="flex justify-between items-center">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Password
            </button>
            <button
              @click="showChangePasswordModal = false"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Add Card Modal -->
  <div
    v-if="showAddCardModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-6 w-1/2">
      <h2 class="text-xl font-semibold mb-4">Add New Card</h2>
      <form @submit.prevent="addCard">
        
        <!-- Cardholder Name -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="cardHolderName"
          >
            Cardholder Name
          </label>
          <input
            v-model="newCard.cardHolderName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardHolderName"
            type="text"
            placeholder="Name on Card"
          />
        </div>

        <!-- Card Number -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="cardNumber"
          >
            Card Number
          </label>
          <input
            v-model="newCard.cardNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardNumber"
            type="text"
            placeholder="Card Number"
          />
        </div>

        <!-- Expiry Date -->
        <div class="flex mb-4">
          <div class="mr-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="expiryMonth"
            >
              Expiry Month
            </label>
            <input
              v-model="newCard.expiryMonth"
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiryMonth"
              type="text"
              placeholder="MM"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="expiryYear"
            >
              Expiry Year
            </label>

            <!-- Expiry Year -->
            <input
              v-model="newCard.expiryYear"
              class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiryYear"
              type="text"
              placeholder="YYYY"
            />
          </div>
        </div>

        <!-- CVV -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="cvv">
            CVV
          </label>
          <input
            v-model="newCard.cvv"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cvv"
            type="text"
            placeholder="CVV"
          />
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Card
          </button>
          <button
            @click="showAddCardModal = false"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Account Confirmation Modal -->
  <div
    v-if="showDeleteAccountModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-6 w-1/3">
      <h2 class="text-xl font-semibold mb-4 text-red-600">Delete Account</h2>
      <p class="mb-4">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <div class="flex justify-between items-center">
        <button
          @click="deleteAccount"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
        <button
          @click="showDeleteAccountModal = false"
          class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.formData = { ...this.user };
  },
  data() {
    return {
      user: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        avatar: 'https://source.unsplash.com/random/face',
      },
      showChangePasswordModal: false,
      showDeleteAccountModal: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      paymentMethods: [
        {
          id: 1,
          cardType: 'Visa',
          last4Digits: '1234',
          expiry: '12/25',
        },
        {
          id: 2,
          cardType: 'Visa',
          last4Digits: '1234',
          expiry: '12/25',
        },
      ],
      showAddCardModal: false,
      newCard: {
        cardHolderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
      },
      formData: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },
  methods: {
    addCard() {
      this.paymentMethods.push({
        id: Math.random(),
        cardType: this.newCard.cardNumber.startsWith('4')
          ? 'Visa'
          : 'Mastercard',
        last4Digits: this.newCard.cardNumber.slice(-4),
        expiry: `${this.newCard.expiryMonth}/${this.newCard.expiryYear.slice(
          -2
        )}`,
      });

      this.showAddCardModal = false;
    },
    removeCard(cardId) {
      if (!confirm('Are you sure you want to remove this card?')) {
        return;
      }

      this.paymentMethods = this.paymentMethods.filter(
        (card) => card.id !== cardId
      );
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    deleteAccount() {
      this.showDeleteAccountModal = false;
      this.$emit('logout');
      alert('Account deleted.');
      this.$emit('go-to', 'home');
    },
    updateProfile() {
      this.user = { ...this.formData };
    },
  },
};
</script>
