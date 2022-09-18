<template>
  <div>
    <div v-for="(activities, monthKey) in groupedActivities" :key="activities[monthKey]">
      <span class="month-group">{{ monthKey }}</span >
      <div class="flex-container border" v-for="activity in activities" :key="activity.id">
        <div class="flex-container">
          <img :src="activity.topic_data.icon_path" />
          <div>
            <h3>{{ activity.topic_data.name }} {{ activity.resource_type }}</h3>
            <p>{{ activity.d_created }}</p>
          </div>
        </div>
        <div class="flex-container">
          <p v-if="activity.showScore">score {{ activity.score }}/{{ activity.possible_score }}</p>
          <p v-if="activity.showZoom">View Work</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ActivityList",
  props: {
    activitiesType: Object
  },
  created() {
    this.getActivities();
  },
  data() {
    return {
      activities: [],
      errorMsg: ""
    };
  },
  methods: {
    getActivities() {
      axios
        .get("http://localhost:3000/activities/v1")
        .then(response => {
          this.activities = response.data;
          for (let i = 0; i < this.activities.length; i++) {
            const key = this.activities[i].resource_type;
            this.activities[i].showScore = this.activitiesType[key].score;
            this.activities[i].showZoom = this.activitiesType[key].zoom;

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
        })
        .catch(error => {
          console.log(error);
          this.errorMsg = "Error retrieving data";
        });
    },

    //  goupby function
    groupBy(array, fn) {
      let result = {};

      array.forEach(item => {
        let key = fn(item);

        if (!result[key]) {
          result[key] = [];
        }

        result[key].push(item);
      });

      Object.values(result).forEach(el => {
        el.sort(function(a, b) {
          return a.d_created - b.d_created;
        });
      });

      return result;
    }
    // 1. Create a function that takes an array and a function as arguments
    // 2. Create an empty object to store the results
    // 3. Loop through the array
    // 4. Call the function on each item in the array and store the result in a variable
    // 5. If the key doesn't exist in the object, create it and set it equal to an empty array
    // 6. Push the item into the array
    // 7. Return the object
  },
  computed: {
    groupedActivities() {
      return this.groupBy(this.activities, function(item) {
        return item.month_created;
      });
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
</style>
