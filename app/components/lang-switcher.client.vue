<script setup lang="ts">
import * as ulocales from "@nuxt/ui/locale";
const { locales, locale, setLocale } = useI18n();

const availableLocales = ref(
  Object.values(ulocales).filter((l) =>
    locales.value.map((l) => l.code).includes(l.code as "en")
  )
);

const langFlags = {
  fr: "i-flag-bl-4x3",
  en: "i-flag-sh-4x3",
  es: "i-flag-es-4x3",
  ar: "i-flag-sa-1x1",
};

const _localeItems = computed(() => {
  return locales.value.map((l) => ({
    label: l.name,
    icon: langFlags[l.code],
    onSelect(e: Event) {
      setLocale(l.code);
    },
  }));
});
</script>

<template>
  <UDropdownMenu :items="_localeItems">
    <UButton icon="i-lucide-languages" color="neutral" variant="ghost">
    </UButton>
  </UDropdownMenu>
</template>
