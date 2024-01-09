<template>
    <div class="progress-bar">
        <div class="progress-step" v-for="item in progressSteps">
            <div class="progress-step__icon" :class="{current: currentStep === item.step}">
                <span>{{ item.step }}</span>
            </div>
            <div class="progress-step__info">
                <p>Step {{ item.step }}</p>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["currentStep"],
    data() {
        return {
            progressSteps: [
                {
                    step: 1,
                    description: "Your info"
                },
                {
                    step: 2,
                    description: "Select plan"
                },
                {
                    step: 3,
                    description: "Add-ons"
                },
                {
                    step: 4,
                    description: "Summary"
                }
            ]
        }
    }
}
</script>