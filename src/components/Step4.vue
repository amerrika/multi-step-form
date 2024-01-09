<template>
    <StepBase title="Finishing up" subtitle="Double-check everything looks OK before confirming">
        <div class="summary p-3">
            <div class="summary__plan">
                <div>
                    <p class="heading-3">{{ plan.title }}&nbsp;({{ billing.charAt(0).toUpperCase()
                        + billing.slice(1) }})</p>
                    <button class="button" data-style="muted">Change</button>
                </div>
                <div>
                    <span class="fs-300 fw-600 txt-project-blue-900">${{ this.planPrice }}/{{ this.billingShort }}</span>
                </div>
            </div>
            <ul class="summary__addons">
                <li class="summary__addon" v-for="addon in addons">
                    <p class="fs-500 txt-neutral-700">{{ addon.title }}</p>
                    <p class="fs-500 txt-project-blue-900">
                        <span v-if="billing === 'monthly'">+${{ addon.price.mo }}/mo</span>
                        <span v-else>+${{ addon.price.yr }}/yr</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="total">
            <span class="fs-500 txt-neutral-700">Total&nbsp;({{ billing }})</span>
            <span class="fs-700 fw-600 txt-project-blue-500">+${{ this.total }}/{{ this.billingShort }}</span>
        </div>
    </StepBase>
</template>

<script>
import StepBase from './StepBase.vue';

export default {
    components: {
        StepBase
    },
    props: ["billing", "plan", "addons", "billingShort"],
    data() {
        return {
            planPrice: undefined,
            addonsPrices: [],
            total: 0,
        }
    },
    mounted() {
        // get price of selected plan - from prop
        if (this.billing === "monthly") {
            this.planPrice = this.plan.price.mo
        } else {
            this.planPrice = this.plan.price.yr
        }

        // get prices of checked addons - from prop
        if (this.billing === "monthly") {
            this.addons.forEach(addon => {
                const price = addon.price.mo
                this.addonsPrices.push(price)
            })
        } else {
            this.addons.forEach(addon => {
                const price = addon.price.yr
                this.addonsPrices.push(price)
            })
        }
        // calculate and update total
        this.total = this.addonsPrices.reduce((acc, cur) => {
            return acc + cur
        }, this.planPrice)
    },
}
</script>