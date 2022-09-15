<template>
  <div class="filter-by-timeline">
    <h3>Filter by</h3>
    <div class="flex-container">
      <button class="btn-filter-activity" @click="filterByActivity(activity)">
        All Work
        </button>      
      <button class="btn-filter-activity" v-for="activity in activitiesType" :key="activity.id" @click="filterByActivity(activity)">
        {{ activity.type }}
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterTimeline",
  props: {
    activitiesType: Array
  },

  methods: {
    filterByActivity(activity) {
      console.log(activity);
    }
  },
};
</script>
<style >
.btn-filter-activity {
  border: 2px solid rgb(4, 149, 160);
  border-radius: 5px;
  background-color: white;
  color: rgb(4, 149, 160);
  font-weight: bold;
  padding: 5px 10px;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 1px;
  cursor: pointer;
}
.flex-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
