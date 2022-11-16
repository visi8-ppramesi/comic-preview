<template>
    <div class="rounded overflow-hidden shadow-lg bg-white">
        <div id="card-slot" class="px-6 py-4">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card'
}
</script>