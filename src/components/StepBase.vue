<template>
    <div class="step p-100">
        <h1 class="heading-2">
            {{ title }}
        </h1>
        <p class="fs-300 txt-neutral-800 mb-start-2 mb-end-5">
            {{ subtitle }}
        </p>
        <slot>
            <!-- slot content -->
        </slot>
    </div>
</template>

<script>
export default {
    props: ["title", "subtitle"]
}
</script>