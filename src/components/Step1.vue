<template>
    <StepBase title="Personal info" subtitle="Please provide your name, email address, and phone number.">
        <form id="form">
            <div class="form-group">
                <label>
                    <span>Name</span>
                    <span v-if="nameError" class="fw-600 txt-alert-red">This field is required</span>
                </label>
                <input type="text" placeholder="e.g. Stephen King" v-model="name" :class="{ error: nameError }" />
            </div>
            <div class="form-group">
                <label>
                    <span>Email Address</span>
                    <span v-if="emailError" class="fw-600 txt-alert-red">This field is required</span>
                </label>
                <input type="email" placeholder="e.g. stephenking@lorem.com" v-model="email"
                    :class="{ error: emailError }" />
            </div>
            <div class="form-group">
                <label>
                    <span>Phone Number</span>
                    <span v-if="phoneError" class="fw-600 txt-alert-red">This field is required</span>
                </label>
                <input type="tel" placeholder="e.g. +1 234 567 890" v-model="phone" :class="{ error: phoneError }" />
            </div>
        </form>
    </StepBase>
    <div class="buttons-holder p-100">
        <button id="submit" class="button" data-style="primary" @click="validation" type="submit">
            Next step
        </button>
    </div>
</template>

<script>
import StepBase from "./StepBase.vue";
export default {
    components: {
        StepBase,
    },
    props: ["currentStep"],
    data() {
        return {
            // input fields
            name: "",
            email: "",
            phone: "",
            nameError: false,
            emailError: false,
            phoneError: false,

            // form validated
            formValidated: false,
        };
    },
    methods: {
        validation(event) {
            event.preventDefault();

            // name validation
            this.nameError = this.name.length < 1 ? true : false

            // email validation
            this.emailError = this.email.length < 1 ? true : false

            // phone number validation
            this.phoneError = this.phone.length < 1 ? true : false


            // if validation successfull
            if (
                this.nameError === false &&
                this.emailError === false &&
                this.phoneError === false
            ) {
                this.formValidated = true;
            }

            if (this.formValidated === true) {
                // emit to App.vue to update currentStep to 2
                this.$emit("validate", this.formValidated);
            }
        },
    },
};
</script>
