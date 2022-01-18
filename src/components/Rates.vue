<template>
    <div class="ratesList">
        <div
            v-for="rate in RATES" 
            :key="rate.ID" 
            :rate="rate"
            :class="[rate.Value > rate.Previous ? 'big' : 'small']"
            style="display: flex; justify-content: center;">
                {{rate.Nominal }} {{rate.CharCode}} = {{cs(rate)}} {{userRates}}
            </div>
    </div>
</template>

<script>
export default {
    name: 'RatesList',
    mounted() {
    this.GET_STORE_API()
        .then((response) => {
            if(response.data) {
                console.log("yes")
            }
        })
    },
    methods: {
        cs(rate) {
      if(this.userRates == "RUB") {
        return rate.Value.toFixed(2)
      } else {
        return (rate.Value / this.activeRates.Value).toFixed(2);
      }
    }
    }
}
</script>