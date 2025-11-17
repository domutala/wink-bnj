<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { NavigationMenuItem } from "@nuxt/ui";

const navbarItems: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      active: true,
    },
    {
      label: "Inbox",
      icon: "i-lucide-inbox",
      badge: "4",
    },
    {
      label: "Contacts",
      icon: "i-lucide-users",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      defaultOpen: true,
      children: [
        {
          label: "General",
        },
        {
          label: "Members",
        },
        {
          label: "Notifications",
        },
      ],
    },
  ],
  [
    {
      label: "Feedback",
      icon: "i-lucide-message-circle",
      to: "https://github.com/nuxt-ui-templates/dashboard",
      target: "_blank",
    },
    {
      label: "Help & Support",
      icon: "i-lucide-info",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
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

          <template #right> </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <Placeholder class="h-full" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
