<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweetContent"
          Placeholder="whats happening"
          counter
          autogrow
          class="newQweet"
          maxlength="280"
        >
          <template v-slot:before>
            <q-avatar size="xl" class="q-mr-sm">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
          class="q-mb-lg"
          no-caps
          :disable="!newQweetContent"
          unelevated
          rounded
          color="primary"
          label="Qweet"
        />
      </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />
    <!-- tweetlist -->
    <q-list>
      <q-item class="q-pa-md">
        <q-item-section avatar>
          <q-avatar size="xl" class="q-mr-sm">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="text-subtitle1">
          <q-item-label
            ><strong>keen ken</strong>
            <span class="text-grey-7">@kee_ken</span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod<br /><br />tempor incididunt ut labore et dolore magna
            aliqua.
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-md">
            <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
            <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
            <q-btn flat round size="sm" color="grey" icon="far fa-heart" />
            <q-btn flat round size="sm" color="grey" icon="fas fa-trash" />
          </div>
        </q-item-section>
        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
      <q-separator inset="item" />
    </q-list>
  </q-page>
</template>
<script>
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
    };
  },
};
</script>
<style lang="sass" scoped>
.newQweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
</style>

<style lang="sass">
.qweet-content
  word-wrap: break-word !important
  overflow-wrap: break-word !important
.qweet-icons
  margin-left: -5px
</style>
