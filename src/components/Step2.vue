<template>
    <StepBase title="Select your plan" subtitle="You have the option of monthly or yearly billing.">
        <ul class="plans">
            <li class="plan p-3" role="button" v-for="plan in plans" @click="handleSelect(plan)" :class="{ selected: plan.isSelected }">
                <img :src="plan.icon" alt="">
                <div>
                    <h2 class="heading-3">{{ plan.title }}</h2>
                    <div>
                        <span class="fs-300 fw-500 txt-neutral-700" v-if="billing === 'monthly'">${{ plan.price.mo
                        }}/mo</span>
                        <span class="fs-300 fw-500 txt-neutral-700" v-else>${{ plan.price.yr }}/yr</span>
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

// Importing icons
import IconArcade from '../assets/images/icon-arcade.svg'
import IconAdvanced from '../assets/images/icon-advanced.svg'
import IconPro from '../assets/images/icon-pro.svg'

export default {
    components: {
        StepBase
    },
    props: ["billing"],
    data() {
        return {
            plans: [
                {
                    key: 1,
                    icon: IconArcade,
                    title: "Arcade",
                    isSelected: false,
                    price: {
                        mo: 9,
                        yr: 90
                    }
                },
                {
                    key: 2,
                    icon: IconAdvanced,
                    title: "Advanced",
                    isSelected: false,
                    price: {
                        mo: 12,
                        yr: 120
                    }
                },
                {
                    key: 3,
                    icon: IconPro,
                    title: "Pro",
                    isSelected: false,
                    price: {
                        mo: 15,
                        yr: 150,
                    },
                }
            ],
            isSwitched: false,
        }
    },
    methods: {
        handleSelect(plan) {
            // toggle isSelected
            plan.isSelected = !plan.isSelected
            // unselect other plans
            this.plans.forEach(item => {
                if (item.key !== plan.key) {
                    item.isSelected = false
                }
            })
            // emit selected plan object to App.vue
            this.$emit("plan", this.selectedPlan)
            console.log(plan)
        },
        handleSwitch() {
            this.isSwitched = !this.isSwitched
            // emit to App.vue to update billing
            this.$emit("switch", this.isSwitched)
        },
    },
    computed: {
        selectedPlan() {
            return this.plans.filter(plan => plan.isSelected)
        },
    },
}
</script>