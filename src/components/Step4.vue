<template>
    <StepBase title="Finishing up" subtitle="Double-check everything looks OK before confirming">
        <div class="summary p-3">
            <div class="summary__plan">
                <div>
                    <p class="heading-3">{{ user.plan.title }}&nbsp;({{ this.billingMethod.full }})</p>
                    <button class="button" data-style="muted">Change</button>
                </div>
                <div>
                    <span class="fs-300 fw-600 txt-project-blue-900">${{ this.planPrice }}/{{ this.billingMethod.short
                    }}</span>
                </div>
            </div>
            <ul class="summary__addons">
                <li class="summary__addon" v-for="addon in user.addonsList">
                    <p class="fs-500 txt-neutral-700">{{ addon.title }}</p>
                    <p class="fs-500 txt-project-blue-900">
                        <span v-if="user.billing === 'monthly'">+${{ addon.price.mo }}/mo</span>
                        <span v-else>+${{ addon.price.yr }}/yr</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="total">
            <span class="fs-500 txt-neutral-700">Total&nbsp;({{ user.billing }})</span>
            <span class="fs-700 fw-600 txt-project-blue-500">+${{ user.sum }}/{{ this.billingMethod.short }}</span>
        </div>
    </StepBase>
</template>

<script>
import StepBase from './StepBase.vue';

export default {
    components: {
        StepBase
    },
    props: ["user"],
    data() {
        return {
            planPrice: undefined,
            addonsPrices: [],
            billingMethods: [
                // this data is only for DOM
                {
                    method: "monthly",
                    full: "Monthly",
                    short: "mo"
                },
                {
                    method: "yearly",
                    full: "Yearly",
                    short: "yr"
                }
            ],
            billingMethod: undefined
        }
    },
    methods: {
        getBillingMethod() {
            // based on prop billing we're going to find an object from billingMethods 
            this.billingMethod = this.billingMethods.find((element) => element.method === this.user.billing)
        }
    },
    created() {
        this.getBillingMethod()
    },
    mounted() {
        // get price of selected plan - from prop
        if (this.user.billing === "monthly") {
            this.planPrice = this.user.plan.price.mo
        } else {
            this.planPrice = this.user.plan.price.yr
        }

        // get prices of checked addons - from prop
        if (this.user.billing === "monthly") {
            this.user.addonsList.forEach(addon => {
                const price = addon.price.mo
                this.addonsPrices.push(price)
            })
        } else {
            this.user.addonsList.forEach(addon => {
                const price = addon.price.yr
                this.addonsPrices.push(price)
            })
        }
    },
}
</script>