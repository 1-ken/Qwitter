<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold"> Qwitter </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer :width="283" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- left drawer content -->
      <q-icon
        name="fa-solid fa-dove"
        size="lg"
        color="primary"
        class="q-pa-md"
      />
      <q-list>
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="md"  name="home" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item to="/about" clickable v-ripple>
          <q-item-section avatar>
            <q-icon size="md"  name="help" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>
