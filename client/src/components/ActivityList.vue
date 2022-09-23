<template>
  <div>
    <div class="empty">
      <div class="line"></div>
      <div
        class="component"
        v-for="(activities, monthKey) in groupedActivities"
        :key="activities[monthKey]"
      >
        <div class="month-group">{{ monthKey }}</div>
        <div class="flex-container center border" v-for="activity in activities" :key="activity.id">
          <div class="flex-container center">
            <div class="position-container">
              <img class="avatar" :class="activity.product === 'bpjr' ? 'bg-y' : 'bg-c'" :src="activity.topic_data.icon_path" />
              <div class="bpjr" :id="activity.id" v-if="activity.product === 'bpjr'">Jr.</div>
            </div>
            <div class="flex-container column">
              <h3>{{ activity.topic_data.name }} {{ activity.resource_type }}</h3>
              <p>{{ activity.d_created }}</p>
            </div>
          </div>
          <div class="flex-container align-center">
            <p class="score" v-if="activity.showScore">
              score {{ activity.score }}/{{ activity.possible_score }}
            </p>
            <router-link
            v-if="activity.showZoom"
              :activity="activity"
              class="view-button"
              :to="{ name: 'zoom', params: { id: activity.id, apiType: activity.api_type, activity: activity } }"
            >
            View Work
            </router-link>
          </div>
        </div>
      </div>
    </div>
<div class="center-items">
    <div class="load-more-btn" v-if="numOfPaginates < paginateArray.length" @click="loadMoreResults">
      <img src="/assets/down.png"/>Load more
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "ActivityList",
  props: {
    activitiesType: Array,
    activities: Array,
    filterByType: String,
    filterByText: String
  },

  data() {
    return {
      selectedActivity: this.$route.params.id,
      paginateArray: [],
      actPerPaginate: 10,
      numOfPaginates: 1,
      errorMsg: ""
    };
  },
  methods: {
    sortByDate(array) {
      return array.sort((a, b) => {
        return new Date(b.d_created) - new Date(a.d_created);
      });
    },
    createPaginateArray(array) {
      let paginatedArray = [];
      let tempArray = [];
      for (let i = 0; i < array.length; i++) {
        tempArray.push(array[i]);
        if (tempArray.length === this.actPerPaginate) {
          paginatedArray.push(tempArray);
          tempArray = [];
        }
      }
      if (tempArray.length > 0) {
        paginatedArray.push(tempArray);
      }
      return paginatedArray;
    },
    groupByMonth(array, filterByType) {
      if (filterByType !== "all") {
        array = array.filter(activity => activity.resource_type === filterByType);
      }
      let result = {};
      array.forEach(item => {
        let key = item.month_created;

        if (!result[key]) {
          result[key] = [];
        }

        result[key].push(item);
      });

      return result;
    },
    createPaginatePage(array, filterByType) {
      let groupedByMonth = [];
      if (array.length > 0) {
        let sortedArray = this.sortByDate(array);

        // filter bt search field
        if(this.filterByText !== ""){
          sortedArray = sortedArray.filter(activity =>
          `${activity.topic_data.name} ${activity.resource_type}`.toLowerCase().includes(this.filterByText.toLowerCase())
          );
        }
        this.paginateArray = this.createPaginateArray(sortedArray);
        
        const activitiesToPresent = [];
        for (let i = 0; i < this.numOfPaginates; i++) {
          for (let j = 0; j < this.paginateArray[i].length; j++) {
            activitiesToPresent.push(this.paginateArray[i][j]);
          }
        }

        groupedByMonth = this.groupByMonth(activitiesToPresent, filterByType);
      }
      return groupedByMonth;
    },
    loadMoreResults() {
      this.numOfPaginates++;
      this.createPaginatePage(this.activities, this.filterByType);
    }
  },

  computed: {
    groupedActivities() {
      return this.createPaginatePage(this.activities, this.filterByType);
    },
    zoomActivity() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped>

h3{
  margin: 0px;
  margin-top: 20px;
}
div p{
  margin: 0px;
  margin-bottom: 20px;
}
.empty {
  position: relative;
}
.line {
  position: absolute;
  border: 0.5px solid rgb(181, 181, 181);
  left: 60px;
  height: 95%;
  z-index: -1;
}
.month-group {
  padding-top: 5px;
  height: 20px;
  width: 120px;
  text-align: center;
  background-color: rgb(245, 248, 208);
  border-radius: 20px;
}
.view-button {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  color:#008E9B
}
.flex-container {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin: 0px 20px;
}
.align-center {
  align-items: center;
  text-align: center;
}
.score{
  margin: 0px;
  color: #008E9B;
}
.column{
  flex-direction: column;
}
.center{
  align-items: center;
}
.border {
  border: 1px solid rgb(181, 181, 181);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin: 20px;
  margin-left: 0px;
}
.position-container {
  position: relative;
}
.avatar{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 5px;
}
.bg-y{
  background-color: rgb(242, 197, 19);
}
.bg-c{
  background-color: rgb(10, 217, 196);
}
.bpjr {
  position: absolute;
  background-color: rgb(255, 221, 83);
  bottom: 5px;
  right: -5px;
  font-weight: bold;
  border-radius: 10px;
  font-size: 12px;
  padding: 2px;
}
.load-more-btn {
  display: inline-block;
  text-align: center;
  color: #008E9B;
  border: none;
  font-weight: bold;
  cursor: pointer;
  align-items: center;
}
.load-more-btn img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
