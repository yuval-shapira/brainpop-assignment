<template>
  <div>
    <div class="float-container" @click="closeAutoComplete"></div>
    <div class="float">
      <ul class="suggestments-list">
        <li
          class="suggestments"
          v-for="activity in sortedActivities"
          :key="activity.id"
          @click="selectActivity(activity)"
        >
          {{ activity.topic_data.name }} {{ activity.resource_type }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: "AutoComplete",
  data() {
    return {
    };
  },
  props: {
    filteredActivities: Array
  },
  methods: {
    selectActivity(activity) {
      this.$emit("selectActivity", activity);
    },
    closeAutoComplete() {
      this.$emit("closeAutoComplete");
    },
    sortAllActivities(filteredActivities) {
        const sortedArray = filteredActivities.sort((a, b) => {

         return `${a.topic_data.name} ${a.resource_type}`.localeCompare(`${b.topic_data.name} ${b.resource_type}`);
      });
      return sortedArray;

    }
  },
  computed: {
    sortedActivities() {
      return this.sortAllActivities(this.filteredActivities.slice(0));
    }
  }
};
</script>
<style scoped>
.float {
  position: absolute;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(78, 78, 78);
  padding: 0px 10px;
  width: inherit;
  height: 100px;
  z-index: 2;
  overflow: auto;
}
.float-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  justify-content: center;
  align-items: center;
}
.suggestments-list {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  cursor: pointer;

}
.suggestment {
  list-style-type: none;
  margin: 0px;
  padding: 2px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}
</style>
