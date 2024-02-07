<template>
    <StepBase title="Select your plan" subtitle="You have the option of monthly or yearly billing.">
        <ul class="plans">
            <li class="plan p-3" role="button" v-for="plan in store.plans" @click="handlePlanSelecting(plan)"
                :class="{ selected: plan.isSelected }">
                <img :src="plan.icon" alt="">
                <div>
                    <h2 class="heading-3">{{ plan.title }}</h2>
                    <div>
                        <span class="fs-300 fw-500 txt-neutral-700" v-if="billing === 'monthly'">${{ plan.price.mo
                        }}/mo</span>
                        <span class="fs-300 fw-500 txt-neutral-700" v-else>${{ plan.price.yr
                        }}/yr</span>
                    </div>
                    <div v-if="billing === 'yearly'">
                        <p class="fs-100 txt-project-blue-900">2 months free</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="toggle-wrapper mb-start-6">
            <p :class="{ selected: isSwitched === false }">Monthly</p>
            <label class="switch">
                <input type="checkbox" @click="handleSwitch">
                <div class="slider round"></div>
            </label>
            <p :class="{ selected: isSwitched === true }">Yearly</p>
        </div>
    </StepBase>

</template>

<script>
import StepBase from './StepBase.vue';
import { store } from '@/store';

export default {
    components: {
        StepBase
    },
    props: ["billing"],
    data() {
        return {
            store,
            isSwitched: false,
        }
    },
    methods: {
        handlePlanSelecting(plan) {
            // toggle isSelected
            plan.isSelected = !plan.isSelected
            // unselect other plans
            this.store.plans.forEach(item => {
                if (item.key !== plan.key) {
                    item.isSelected = false
                }
            })
            // emit selected plan object to App.vue
            this.$emit("plan", this.selectedPlan)
        },
        handleSwitch() {
            // user can switch for monthly or yearly billing options
            this.isSwitched = !this.isSwitched
            // emit to App to update billing
            this.$emit("switch", this.isSwitched)
        },
    },
    computed: {
        selectedPlan() {
            return this.store.plans.find(plan => plan.isSelected)
        },
    },
    
}
</script>