<template>
  <Progress :currentStep="currentStep" />
  <div id="app__content">
    <Modal v-if="showModal" @close-modal="showModal = false" />
    <Step1 v-if="currentStep === 1" @validate="goToNextStep" />
    <Step2 v-if="currentStep === 2" :billing="userSelection.billing" @switch="updateBilling" @plan="updatePlan" />
    <Step3 v-if="currentStep === 3" :billing="userSelection.billing" @addons="updateAddons" />
    <Step4 v-if="currentStep === 4" :user="userSelection" />
    <Step5 v-if="currentStep === 5" />
    <!-- Buttons -->
    <div class="buttons-holder p-100" v-if="currentStep !== 1 && currentStep < 5">
      <button class=" button" data-style="muted" @click="currentStep--">Go Back</button>
      <button class="button" data-style="primary" @click="handleButtonNext" v-if="currentStep === 4">Confirm</button>
      <button class="button" data-style="primary" @click="handleButtonNext" v-else>Button Next</button>
    </div>
  </div>
</template>

<script>
// import sass
import "../src/sass/main.scss";
// import vue components
import Progress from "./components/Progress.vue";
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import Step4 from "./components/Step4.vue";
import Step5 from "./components/Step5.vue";
import Modal from "./components/Modal.vue";
// import store
import { store } from "./store";

export default {
  name: 'App',
  components: {
    Progress,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Modal,
  },
  data() {
    return {
      store,

      currentStep: 1,
      validationSuccessful: false,
      showModal: false,

      userSelection: {
        billing: "monthly",
        plan: null,
        addonsList: [],
        prices: {
          // needed for computing
          planPrice: 0,
          addonsPrice: 0,
        },
        sum: 0,
      }
    }
  },
  methods: {
    updateBilling(isSwitched) {
      this.userSelection.billing = isSwitched ? "yearly" : "monthly"
    },
    updatePlan(selectedPlan) {
      this.userSelection.plan = selectedPlan;
    },
    updateAddons(selectedAddons) {
      this.userSelection.addonsList.splice(0, this.store.addons.length, ...selectedAddons)
    },
    goToNextStep() {
      this.currentStep++;
    },
    handleButtonNext(event) {
      this.goToNextStep();
      // if no plan is selected in step 2, prevent going to next step & show warning modal
      if (this.currentStep === 3
        && !this.userSelection.plan) {
        this.currentStep = 2
        this.showModal = true
      }
    },
    getPrice(priceObj) {
      // returns a monthly or yearly price
      if (this.userSelection.billing === "monthly") {
        return priceObj.mo
      } else {
        return priceObj.yr
      }
    },
    updatePlanPrice(planObj) {
      this.userSelection.prices.planPrice = this.getPrice(planObj.price)
    },
    updateSum(planObj) {
      this.userSelection.sum = this.getPrice(planObj.price)
    }
  },
  watch: {
    "userSelection.plan": function (newPlan) {
      // if new plan selected, update planPrice & sum
      if (newPlan) {
        this.updatePlanPrice(newPlan)
        this.updateSum(newPlan)
      } else {
        // if plan deselected set planPrice & sum to 0
        this.userSelection.prices.planPrice = 0
        this.userSelection.sum = 0
      }
    },
    "userSelection.billing": function () {
      // if billing changed after plan selected, update planPrice & sum
      if (this.userSelection.plan) {
        this.updatePlanPrice(this.userSelection.plan)
        this.updateSum(this.userSelection.plan)
      }
    },
    "userSelection.addonsList": {
      deep: true,
      handler: function (selectedAddons) {
        // update addonsPrice when content of addonsList changes
        this.userSelection.prices.addonsPrice =
          Array.from(selectedAddons).
            map((addonObject) => {
              if (this.userSelection.billing === "monthly") {
                return addonObject.price.mo
              } else {
                return addonObject.price.yr
              }
            }).
            reduce((acc, cur) => {
              return acc + cur
            }, 0)
      }
    },
    "userSelection.prices": {
      deep: true,
      handler: function (newValue, oldValue) {
        this.userSelection.sum = (newValue.addonsPrice + newValue.planPrice)
      }
    }
  } // end of watch
} // end of app
</script>

