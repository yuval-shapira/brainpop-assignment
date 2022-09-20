<template>
  <div>
    <div v-for="(activities, monthKey) in groupedActivities" :key="activities[monthKey]">
      <span class="month-group">{{ monthKey }}</span>
      <div class="flex-container border" v-for="activity in activities" :key="activity.id">
        <div class="flex-container">
          <div class="position-container">
            <img :src="'@'+ activity.topic_data.icon_path" />
            <div class="bpjr" :id="activity.id" v-if="activity.product === 'bpjr'">Jr.</div>
          </div>
          <div>
            <h3>{{ activity.topic_data.name }} {{ activity.resource_type }}</h3>
            <p>{{ activity.d_created }}</p>
          </div>
        </div>
        <div class="flex-container">
          <p v-if="activity.showScore">score {{ activity.score }}/{{ activity.possible_score }}</p>
            <router-link :activity="activity" class="view-button" :to="{name: 'zoom', params: {id: activity.id, activity: activity}}">
              <!-- <router-link class="view-button" :to="'/' + activity.id"> -->
            <p v-if="activity.showZoom">View Work</p>
          </router-link>
        </div>
        <!-- <router-view /> -->
      </div>
    </div>
    <!-- <div class="float-container" v-if="this.$route.params.id !== undefined">
      <div class="float">
        <router-link class="view-button" :to="'/'">X</router-link>
        <div class="position-container">
          <img :src="`..${this.$route.params.activity.topic_data.icon_path}`" />
            <div class="bpjr" id="activity.id" >Jr.</div>
        </div>
        <h3> {{ this.$route.params.activity.topic_data.name }} {{ this.$route.params.activity.resource_type }} </h3>
        <p>{{ this.$route.params.activity.d_created }}</p>
        <p v-if="this.$route.params.activity.showScore"> score {{ this.$route.params.activity.score }} / {{ this.$route.params.activity.possible_score }} </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ActivityList",
  props: {
    activitiesType: Array,
    filterBy: String
  },
  created() {
    this.getActivities();
  },
  data() {
    return {
      selectedActivity: this.$route.params.id,
      activities: [],
      viewW: false,
      errorMsg: ""
    };
  },
  methods: {
    getActivities() {
      axios
        .get("http://localhost:3000/activities/v1")
        .then(response => {
          this.activities = response.data;

          // menipulate the data:
          // add showScore, showZoom,created month
          // convert epoch time to date
          // sort by date
          for (let i = 0; i < this.activities.length; i++) {
            const resourceType = this.activities[i].resource_type;
            this.activities[i].showScore = this.activitiesType.find(
              activity => activity.resource_type === resourceType
            ).score;
            this.activities[i].showZoom = this.activitiesType.find(
              activity => activity.resource_type === resourceType
            ).zoom;

            let date = new Date(0);
            date.setUTCSeconds(this.activities[i].d_created);
            this.activities[i].month_created = date.toLocaleString("en-US", {
              month: "long"
            });

            this.activities[i].d_created = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            });
          }

          // this.activities.sort((a, b) => {
          //   return new Date(b.d_created) - new Date(a.d_created);
          // });
        })
        .catch(error => {
          console.log(error);
          this.errorMsg = "Error retrieving data";
        });
    },

    //  Create goupby function
    // 1. Sort the array by date
    // 2. Create an empty object to store the results
    // 3. Loop through the array
    // 4. Call the function on each item in the array and store the result in a variable
    // 5. If the key doesn't exist in the object, create it and set it equal to an empty array
    // 6. Push the item into the array
    // 7. Return the object
    groupBy(array, filterBy) {
      array.sort((a, b) => {
        return new Date(b.d_created) - new Date(a.d_created);
      });
      console.log("sort", array);
      if(filterBy !== "all"){
        array = array.filter(activity => activity.resource_type === filterBy);
      }
      console.log("filter", array);

      let result = {};
      array.forEach(item => {
        let key = item.month_created;

        if (!result[key]) {
          result[key] = [];
        }

        result[key].push(item);
      });

      return result;
    }
  },

  computed: {
    groupedActivities() {
      return this.groupBy(this.activities, this.filterBy);
    },
    zoomActivity(){
      return this.$route.params.id
    }
  }
};
</script>

<style scoped>
.month-group {
  padding: 0px 20px;
  margin: 20px 0px;
  background-color: rgb(245, 248, 208);
  border-radius: 10px;
}
.view-button{
  text-decoration: none;
  color: #2c3e50;
}
.flex-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  margin: 0px 20px;
}
.border {
  border: 1px solid rgb(78, 78, 78);
  border-radius: 5px;
  margin: 20px;
  margin-left: 0px;
}
.position-container {
  position: relative;
}
.bpjr {
  position: absolute;
  background-color: rgb(255, 221, 83);
  left: 40%;
  font-weight: bold;
  border-radius: 10px;
  font-size: 12px;
  padding: 2px;
}
/* .float{
    position: fixed;
    background-color: rgb(255, 255, 255);
    border: 3px solid rgb(78, 78, 78);
    border-radius: 15px;
    padding: 16px;
    width: 70%;
    height: 70%;
    overflow: auto;
}
.float-container{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    top:0;
    left:0;
    width:100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
} */
</style>
