<template>
  <div class="home">
    <div class="container">
      <div class="home__content content">
        <select v-model="userRates" @change='selectRate()' class='select-rate'> <!-- Выбор валюты -->
          <option value="RUB">Российский рубль</option>
            <option v-for="rates in RATES"  
            :key="rates.ID" 
            :value="rates.CharCode">{{rates.Name}}</option> <!-- вывод списка валют в select -->
        </select>
        <div class="home__rates">
            <RateBlock
            v-for="rate in RATES" 
            :key="rate.ID"
            :rate="rate"
            :activeRates="activeRates"
            :userRates="userRates"> <!-- Вывод списка валют через компонент "RateBlock" -->
          </RateBlock>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import RateBlock from "@/components/RateBlock.vue"
export default {
  name: 'Home',
   data() {
    return {
      userRates: 'RUB', // выбранна валяюта (только charcode)
      activeRates: 'RUB' // выбранная валюта (данные о выбранной валюте)
    }
  },
  components: {RateBlock},
  computed: {
    ...mapGetters([
      'RATES' // получение данных с api
    ])
  },
  methods: {
    selectRate() { // метод для выбора валюты
      if(this.userRates != "RUB") {
        this.activeRates = Object.assign({}, this.RATES[this.userRates]); 
      } else {
        this.activeRates = "RUB";
      }
    }
  }
}
</script>

<!-- style -->

<style lang="sass">

.select-rate
  width: 100%
  border: 0
  border-bottom: .125rem solid $border-color
  padding: .625rem .9375rem
  outline: none
  font:
    size: 1rem
    weight: 600

</style>

<!-- scoped style -->

<style lang="sass" scoped>
.home__rates
  display: flex
  align-items: center
  flex-wrap: wrap
  margin: 0 -1.25rem

// MEDIA < 1200px (75 rem)
@media screen and (max-width: 75rem)
  .home__rates
    margin: 0 .5rem
  .block
    width: 100%
    margin: .625rem 0

// MEDIA < 992px (62 rem)
@media screen and (max-width: 62rem)
  .block
    min-height: 5rem
    padding: 3.125rem 2rem
    box-shadow: 0 5px 50px rgba(0,0,0,.1)
    &__num
      font:
        size: 1.25rem
    &__charcode
      font:
        size: 1rem
      &::after
        font:
          size: .8rem
    &__equals
      font:
        size: 1rem
</style>