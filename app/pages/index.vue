<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const navbarItems: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-fluent-layout-column-two-split-right-16-regular",
      active: true,
    },
    {
      label: "Jobs",
      icon: "i-material-symbols-work-outline",
    },
    {
      label: "Inbox",
      icon: "i-lucide-mail",
      badge: "4",
    },

    {
      label: "Users",
      icon: "i-lucide-users",
    },
  ],
  [
    {
      label: "Add user",
      icon: "i-lucide-user-round-plus",
    },
  ],
];

const isCollapse = ref(true);
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      v-model:collapsed="isCollapse"
      :ui="{ footer: 'border-t border-default' }"
    >
      <template #header="{ collapsed }"> </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="navbarItems[0]"
          orientation="vertical"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="navbarItems[1]"
          orientation="vertical"
          class="mt-auto"
        />

        <WkUserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel resizable>
      <template #header>
        <UDashboardNavbar>
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
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
        </UDashboardNavbar>
      </template>

      <template #body>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
        accusantium reprehenderit assumenda temporibus. Accusantium eius
        repellendus, sed esse ratione asperiores ab laudantium rem libero in,
        necessitatibus perspiciatis dolores, quisquam quod?
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
