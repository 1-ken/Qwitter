<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweetContent"
          placeholder="whats happening"
          counter
          autogrow
          class="newQweet"
          maxlength="280"
        >
          <template v-slot:hint>
            {{ 280 - newQweetContent.length }} characters remaining
          </template>
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
          @click="addNewQweet"
          no-caps
          :disable="!newQweetContent.trim() || newQweetContent.length > 280"
          unelevated
          rounded
          color="primary"
          label="Qweet"
        />
      </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />
    <!-- tweetlist -->
    <q-list separator>
      <transition-group
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
      >
        <q-item v-for="qweet in qweets" :key="qweet.date" class="q-pa-md">
          <q-item-section avatar>
            <q-avatar size="xl" class="q-mr-sm">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-subtitle1">
            <q-item-label
              ><strong>keen ken</strong>
              <span class="text-grey-7">@kee_ken <br class="lt-md"></br>&bull;{{ relativeDate(qweet.date) }}
</span>
            </q-item-label>
            <q-item-label class="qweet-content text-body1">
              {{ qweet.content }}
            </q-item-label>
            <div class="qweet-icons row justify-between q-mt-md">
              <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
              <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
              <q-btn flat round size="sm" color="grey" icon="far fa-heart" />
              <q-btn
                @click="deleteQweet(qweet)"
                flat
                round
                size="sm"
                color="grey"
                icon="fas fa-trash"
              />
            </div>
          </q-item-section>

        </q-item>
      </transition-group>
      <q-separator inset="item" />
    </q-list>
  </q-page>
</template>
<script>
import { formatDistanceStrict } from "date-fns";
import { lt } from "date-fns/locale";
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        {
          content: "Let's create something beautiful",
          date: 1754031132848,
        },
        {
          content:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          date: 1754031251805,
        },
      ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistanceStrict(value, new Date(), { addSuffix: true });
    },
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
      };
      this.qweets.unshift(newQweet);
      this.newQweetContent = "";
    },
    deleteQweet(qweet) {
      let dateToDelete = qweet.date;
      let index = this.qweets.findIndex((qweet) => qweet.date === dateToDelete);
      this.qweets.splice(index, 1);
    },
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
.qweet-content
  word-wrap: break-word !important
  overflow-wrap: break-word !important
.qweet-icons
  margin-left: -5p
</style>
