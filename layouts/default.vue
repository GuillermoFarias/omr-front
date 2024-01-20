<script setup></script>
<template>
  <div class="layout-content h-screen">
    <div class="block-section">
      <div class="block-content">
        <ClientOnly>
          <slot />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
