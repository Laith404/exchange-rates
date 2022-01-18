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
            <div
            v-for="rate in RATES" 
            :key="rate.ID"
            class="block"> <!-- Вывод списка валют -->
              <p class="block__num">{{rate.Nominal }}<span class="block__charcode"> {{rate.CharCode}}</span></p>
              <span class='block__equals'>=</span>
              <p class="block__num">{{countRate(rate)}} 
                <span 
                :class="[rate.Value > rate.Previous ? 
                'block__charcode up' : 'block__charcode down']"
                >{{userRates}}</span></p> <!-- вывод выбранной валюты, также информация о повышении/падении цены -->
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
   data() {
    return {
      s: '',
      userRates: 'RUB', // выбранна валяюта (только charcode)
      activeRates: 'RUB' // выбранная валюта (данные о выбранной валюте)
    }
  },
  computed: {
    ...mapGetters([
      'RATES' // получение данных с api
    ])
  },
  methods: {
    countRate(rate) { // метод перевода выбранной валюты
      if(this.userRates == "RUB") {
        return rate.Value.toFixed(2)
      } else {
        return (rate.Value / this.activeRates.Value).toFixed(2);
      }
    },
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
.block
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
  min-height: 6.25rem
  width: calc(50% - 2.5rem)
  margin: 1.25rem
  padding: 3.125rem
  border-radius: .625rem
  box-shadow: 0 5px 50px rgba(0,0,0,.1)
  transition: .25s ease-in-out
  box-sizing: border-box
  border: 2px solid transparent
  &:hover
     transform: scale(1.1)
     box-shadow: 0 0 3.125rem rgba(0,0,0,.15)
     border: 2px solid $border-color

  &__num
    font:
      size: 2rem
      weight: 600

  &__charcode
    font:
      size: 1.5rem
      weight: 400
    position: relative
    margin: 0 .5rem 0 0
    

    &::after
      font-family: 'Font Awesome 5 Free'
      font-weight: 900
      position: absolute
      font:
        size: 1rem
      right: -1.5rem
      top: 50%
      transform: translateY(-50%)

    &.up::after
      content: '\f062'
      color: green

    &.down::after
      content: '\f063'
      color: red

  &__equals
    position: absolute
    left: 47%
    top: 50%
    transform: translate(-50%,-50%)
    font:
      size: 1.5rem

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