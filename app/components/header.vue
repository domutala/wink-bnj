<script lang="ts" setup></script>

<template>
  <UHeader class="bg-default/95" :ui="{ container: 'w-full max-w-full' }">
    <template #left>
      <div class="flex lg:hidden">
        <NuxtLink to="/">
          <wk-logo class="h-10" />
        </NuxtLink>
      </div>
    </template>

    <NuxtLink to="/">
      <wk-logo class="h-10" />
    </NuxtLink>

    <template #right>
      <wk-theme-picker />
      <wk-lang-switcher />

      <UButton
        size="lg"
        color="neutral"
        variant="ghost"
        icon="i-lucide-bell"
      ></UButton>

      <UButton
        size="lg"
        color="neutral"
        variant="ghost"
        icon="i-lucide-circle-question-mark"
      ></UButton>
    </template>
  </UHeader>
</template>
