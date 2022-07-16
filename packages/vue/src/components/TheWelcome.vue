<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>This is a login demo</template>

    Please click the tab left to login.

  </WelcomeItem>
</template>
