<template>
    <div v-if="allDataExist" class="float-container">
      <div v-if="currentActivity.showZoom" class="float">
        <router-link class="close-button" :to="'/'">X</router-link>
        <div class="position-container">
          <img class="icon" :class="currentActivity.product === 'bpjr' ? 'bg-y' : 'bg-c'" :src="`${currentActivity.topic_data.icon_path}`" />
            <div class="bpjr" v-if="currentActivity.product === 'bpjr'" id="activity.id" >Jr.</div>
        </div>
        <h3 class="act-name-and-type"> {{ currentActivity.topic_data.name }} {{ currentActivity.resource_type }} </h3>
        <p class="date" >{{ currentActivity.d_created }}</p>
        <p class="work-comment">{{ currentActivity.comment }}</p>
        <p class="score" v-if="currentActivity.showScore"> score <b>{{ currentActivity.score }}/{{ currentActivity.possible_score }}</b> </p>
      </div>
      <div v-if="!currentActivity.showZoom" class="float">
        <router-link class="close-button" :to="'/'">X</router-link>
        <img class="icon big" src="/assets/noView.png" />
        <h3 class="act-name-and-type"> No View option for this activity </h3>
      </div>
    </div>
</template>
<script>
export default {
  name: "zoomAvtivity",
  data() {
    return {
      currentActivity: {},
      allDataExist: false,
      defaultApi: this.$defaultApi,
      secondApi: this.$secondApi,
      activitiesType: this.$activitiesType
    };
  },
  methods: {
   fechDataForDirectLink(){

      // GET request using fetch with error handling
      const api = this.$route.params.apiType === 'V1' 
      ? this.defaultApi
      : this.secondApi;

      fetch(api)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          let tempActivity = {};
          if (this.$route.params.apiType === 'V1') {
          for(let i = 0; i < data.length; i++){
            if(data[i].id === this.$route.params.id){
              tempActivity = data[i];
              break;
            }
          }
          } else {
            for(let i = 0; i< data.length; i++){
              if(data[i].activities[0].id === this.$route.params.id){
                tempActivity = data[i].activities[0];
                tempActivity.resource_type = data[i].resource_type;
                break;
              }
            }
          }

          let date = new Date(0);
            date.setUTCSeconds(tempActivity.d_created);
            tempActivity.month_created = date.toLocaleString("en-US", {
              month: "long"
            });

            tempActivity.d_created = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            });

          tempActivity.showScore = this.activitiesType.find(activity => activity.resource_type === tempActivity.resource_type).score;
          tempActivity.showZoom = this.activitiesType.find(
              activity => activity.resource_type === tempActivity.resource_type
            ).zoom;
            this.currentActivity = tempActivity;
            this.allDataExist = true;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    }    
  },
  computed: {

  },
  created() {
    if(this.$route.params.activity){
      this.allDataExist = true;
      this.currentActivity = this.$route.params.activity;
    }else{
      this.fechDataForDirectLink();
    }
  }
};
</script>
<style scoped>
.close-button {
  align-self: end;

    border: rgb(181, 181, 181) solid 3px;
    border-radius: 50%;
    width: 25px;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
  text-align: center;
  color: rgb(181, 181, 181);
}
.position-container {
  position: absolute;
  top: 40px;
  grid-column-start: 2;
  grid-row-start: 2;
  align-self: center;
}
.icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 5px;
}
.big{
  width: 100px;
  height: 100px;
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
.act-name-and-type{
  justify-self: center;
  margin-top: 70px;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
}
.date{
  justify-self: center;
  margin: 0px;
}
.work-comment{
  align-self: flex-start;

  font-size: 25px;
  font-weight: bold;
}
.score{
  align-self: flex-start;
  margin: 0px;
  color: #008E9B;
}
.float{
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
  justify-content: space-around;
    background-color: rgb(255, 255, 255);
    border: 3px solid rgb(78, 78, 78);
    border-radius: 15px;
    padding: 16px;
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 300px;
}
.float-container{
    position: fixed;
    background-color: rgba(43, 43, 43, 0.044);
    top:0;
    left:0;
    width:100%;
    height: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
