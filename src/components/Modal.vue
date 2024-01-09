<template>
    <div class="backdrop br-10">
        <div class="modal br-10 p-4 bg-neutral-100">
            <div>
                <button class="button p-0" @click="closeModal">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <g id="Edit / Close_Circle">
                                <path id="Vector"
                                    d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                    stroke="#203267" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </g>

                    </svg>
                </button>
                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z"
                            fill="#e85e6c" />
                    </g>
                </svg>
            </div>
            <div>
                <p class="heading-3 mb-4">Ooops! No plan was selected</p>
                <p class="fs-500 mb-end-4 txt-neutral-800">Please choose a plan in order to proceed to the next step.</p>
                <button class="button" data-style="primary" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        closeModal() {
            // we're going to set showModal to false in App.vue
            this.$emit("close-modal", false)
        }
    }
}
</script>