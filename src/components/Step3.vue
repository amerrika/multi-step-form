<template>
    <StepBase title="Pick add-ons" subtitle="Add-ons help enhance your gaming experience">
        <ul class="addons">
            <li class="addon" v-for="addon in store.addons" :class="{ selected: addon.isChecked }">
                <input type="checkbox" @click="handleCheck(addon)">
                <div class="addon__heading">
                    <h2 class="heading-3 mb-end-1">{{ addon.title }}</h2>
                    <p class="fs-300 fw-500 txt-neutral-700">{{ addon.subtitle }}</p>
                </div>
                <div>
                    <span class="fs-300 fw-500 txt-neutral-700" v-if="billing === 'monthly'">+${{ addon.price.mo
                    }}/mo</span>
                    <span class="fs-300 fw-500 txt-neutral-700" v-else>+${{ addon.price.yr }}/yr</span>
                </div>
            </li>
        </ul>
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
            store
        }
    },

    computed: {
        selectedAddons() {
            return this.store.addons.filter(addon => addon.isChecked)
        }
    },
    methods: {
        handleCheck(addon) {
            // toggle isChecked
            addon.isChecked = !addon.isChecked
            // emit checked addons to App.vue
            this.$emit("addons", this.selectedAddons)
        }
    }
}
</script>