<template>
  <q-page class="reative-position">
    <q-scroll-area class="absolute fullscreen">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input bottom-slots v-model="newQweetContent" placeholder="whats happening" counter autogrow class="newQweet"
          maxlength="280">
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
        <q-btn class="q-mb-lg" @click="addNewQweet" no-caps
          :disable="!newQweetContent.trim() || newQweetContent.length > 280" unelevated rounded color="primary"
          label="Qweet" />
      </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />
    <!-- tweetlist -->
    <q-list separator>
      <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
        <q-item v-for="qweet in qweets" :key="qweet.date" class="q-pa-md">
          <q-item-section avatar>
            <q-avatar size="xl" class="q-mr-sm">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-subtitle1">
            <q-item-label><strong>keen ken</strong>
              <span class="text-grey-7">@kee_ken <br class="lt-md"></br>&bull;{{ relativeDate(qweet.date) }}
              </span>
            </q-item-label>
            <q-item-label class="qweet-content text-body1">
              {{ qweet.content }}
            </q-item-label>
            <div class="qweet-icons row justify-between q-mt-md">
              <q-btn flat round size="sm" color="grey" icon="far fa-comment" />
              <q-btn flat round size="sm" color="grey" icon="fas fa-retweet" />
              <q-btn
                flat
                @click="toggledLiked(qweet)"
                :color="qweet.liked ? 'pink' : 'grey'"
                :icon="qweet.liked ? 'fas fa-heart': 'far fa-heart'"
                round
                size="sm"
                 />
              <q-btn @click="deleteQweet(qweet)" flat round size="sm" color="grey" icon="fas fa-trash" />
            </div>
          </q-item-section>

        </q-item>
      </transition-group>
      <q-separator inset="item" />
    </q-list>
    </q-scroll-area>
  </q-page>
</template>
<script>
import db from 'src/boot/firebase'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { formatDistanceStrict } from "date-fns";
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [],
      // qweets: [
      //   {
      //     id: "1",
      //     content: "Let's create something beautiful",
      //     date: 1754031132848,
      //     liked: false,
      //   },
      //   {
      //     id: "2",
      //     content:
      //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //     date: 1754031251805,
      //     liked: true,

      //   },
      // ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistanceStrict(value, new Date(), { addSuffix: true });
    },
    async addNewQweet() {
      try {
        let newQweet = {
          content: this.newQweetContent,
          date: Date.now(),
          liked: false
        };
        await addDoc(collection(db, "qweets"), newQweet);
        this.newQweetContent = "";
      } catch (error) {
        console.error("Error adding qweet: ", error);
      }
    },
    async deleteQweet(qweet) {
      try {
        if (qweet.id) {
          await deleteDoc(doc(db, "qweets", qweet.id));
        }
      } catch (error) {
        console.error("Error deleting qweet: ", error);
      }
    },
    async toggledLiked(qweet) {
      try {
        if (qweet.id) {
          // Toggle the liked status
          const newLikedStatus = !qweet.liked;

          // Update the document in Firestore
          await updateDoc(doc(db, "qweets", qweet.id), {
            liked: newLikedStatus
          });

          console.log(`Qweet ${qweet.id} liked status updated to: ${newLikedStatus}`);
        }
      } catch (error) {
        console.error("Error updating liked status: ", error);
      }
    }
  },
  mounted(){
    // Listen for real-time updates to the qweets collection
    const qweetsCollection = collection(db, "qweets");
    onSnapshot(qweetsCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New qweet: ", change.doc.data());
          const qweetData = {
            id: change.doc.id,
            ...change.doc.data()
          };
          // Check if qweet already exists to avoid duplicates
          const existingIndex = this.qweets.findIndex(q => q.id === qweetData.id);
          if (existingIndex === -1) {
            this.qweets.unshift(qweetData);
          }
        } else if (change.type === "modified") {
          console.log("Modified qweet: ", change.doc.data());
          const qweetData = {
            id: change.doc.id,
            ...change.doc.data()
          };
          const index = this.qweets.findIndex(q => q.id === qweetData.id);
          if (index !== -1) {
            this.qweets.splice(index, 1, qweetData);
          }
        } else if (change.type === "removed") {
          console.log("Removed qweet: ", change.doc.data());
          const qweetId = change.doc.id;
          const index = this.qweets.findIndex(q => q.id === qweetId);
          if (index !== -1) {
            this.qweets.splice(index, 1);
          }
        }
      });

      // Sort qweets by date (newest first)
      this.qweets.sort((a, b) => b.date - a.date);
    });
  }
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
  margin-left: -5px
</style>
