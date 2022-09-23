<template>
  <div id="app" class="container">
    <div class="center-items">
      <p class="api-btn" @click="getActivitiesFromServer(defaultApi, 'V1')">Use API #V1</p>
      <p class="api-btn" @click="getActivitiesFromServer(secondApi, 'V2')">Use API #V2</p>
    </div>
    <h1>Timeline</h1>
    <Search
    :activitiesType="activitiesType"
    :activities="activities"
    @freeTextFilter="getFilterByText"
    />
    <FilterTimeline
    :activitiesType="activitiesType"
    @filterByType="getFilterByType"
    />
    <ActivityList
    :activitiesType="activitiesType"
    :activities="activities"
    :filterByType="filterByType"
    :filterByText="filterByText"
    />
    <router-view />
  </div>
</template>
<script>
import store from "@/store";
import Search from "@/components/Search.vue";
import FilterTimeline from "@/components/Filter.vue";
import ActivityList from "@/components/ActivityList.vue";

export default {
  name: "app",
  components: {
    Search,
    FilterTimeline,
    ActivityList
  },
  data() {
    return {
      activitiesType: store.activitiesType,
      activities: [],
      filterByType: "all",
      filterByText: "",
      defaultApi: this.$defaultApi,
      secondApi: this.$secondApi
    };
  },
  created() {
    this.getActivitiesFromServer(this.$defaultApi, 'V1');
  },
  methods: {
    getFilterByType(filterByType) {
      this.filterByType = filterByType;
    },
    getFilterByText(filterByText) {
      this.filterByText = filterByText;
    },
    getActivitiesFromServer(api, apiType) {
      // GET request using fetch with error handling
      fetch(api)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          let tempActivitesArray = [];
          if (apiType === 'V1') {
            tempActivitesArray = data;
          } else {
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].activities.length; j++) {
                tempActivitesArray[i] = data[i].activities[j];
              }
              tempActivitesArray[i].resource_type = data[i].resource_type;
            }
          }

          for (let i = 0; i < tempActivitesArray.length; i++) {
            tempActivitesArray[i].api_type = apiType;
            const resourceType = tempActivitesArray[i].resource_type;
            tempActivitesArray[i].showScore = this.activitiesType.find(
              activity => activity.resource_type === resourceType
            ).score;
            tempActivitesArray[i].showZoom = this.activitiesType.find(
              activity => activity.resource_type === resourceType
            ).zoom;

            let date = new Date(0);
            date.setUTCSeconds(tempActivitesArray[i].d_created);
            tempActivitesArray[i].month_created = date.toLocaleString("en-US", {
              month: "long"
            });

            tempActivitesArray[i].d_created = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            });
          }

          this.activities = tempActivitesArray;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.center-items {
  display: flex;
  justify-content: center;
  align-items: center;
}
.api-btn{
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
  border: 2px solid #008E9B;
  border-radius: 5px;
  background-color: white;
  color: #008E9B;
  font-weight: bold;
  padding: 5px 10px;
}
.api-btn:hover{
  background-color: #008E9B;
  color: white;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
