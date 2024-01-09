<template>
  <Progress :currentStep="currentStep" />
  <div id="app__content">
    <Modal v-if="showModal" @close-modal="showModal = false" />
    <Step1 v-if="currentStep === 1" @validate="goToStep2" />
    <Step2 v-if="currentStep === 2" :billing="billing" @switch="updateBilling" @plan="updatePlan" />
    <Step3 v-if="currentStep === 3" :billing="billing" @addons="updateAddons" />
    <Step4 v-if="currentStep === 4" :billing="billing" :plan="plan" :addons="addons" :billingShort="billingShort" />
    <Confirmation v-if="currentStep === 5" />
    <!-- Buttons -->
    <div class="buttons-holder p-100" v-if="currentStep !== 1">
      <button class=" button" data-style="muted" v-if="currentStep !== 1 && currentStep < 5" @click="currentStep--">Go
        Back</button>
      <button class="button" data-style="primary" v-if="currentStep !== 1 && currentStep < 5" @click="handleButtonNext">Next
        Step</button>
    </div>
  </div>
</template>

<script>
import "../src/sass/main.scss"
import Progress from "./components/Progress.vue";
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import Step4 from "./components/Step4.vue";
import Confirmation from "./components/Confirmation.vue";
import Modal from "./components/Modal.vue"

export default {
  name: 'App',
  components: {
    Progress,
    Step1,
    Step2,
    Step3,
    Step4,
    Confirmation,
    Modal,
  },
  data() {
    return {
      currentStep: 1,
      billing: "monthly",
      billingShort: "mo",
      plan: undefined,
      addons: [],
      validationSuccessful: false,
      showModal: false,
    }
  },
  methods: {
    updateBilling(isSwitched) {
      if (isSwitched === false) {
        this.billing = "monthly"
        this.billingShort = "mo"
      } else {
        this.billing = "yearly"
        this.billingShort = "yr"
      }
    },
    updatePlan(selectedPlan) {
      // update plan with selected plan from step 2
      this.plan = selectedPlan[0];
    },
    updateAddons(checkedAddons) {
      // update addons with checked ones
      this.addons.splice(0, this.addons.length, ...checkedAddons)
    },
    goToStep2() {
      this.currentStep = 2
    },
    handleButtonNext(event) {
      // increase currentStep
      this.currentStep++;
      // if no plan is selected in step 2, prevent going to step 3 & show warning modal
      if (this.currentStep === 3 && this.plan === undefined) {
        this.currentStep = 2
        this.showModal = true
      }
      // in step 4 "next step" replace with "confirm"
      if(this.currentStep === 4){
        event.target.innerText = "Submit"
      }
    }
  },
}
</script>

