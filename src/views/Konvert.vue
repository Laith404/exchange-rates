<template>
  <div class="konvert">
    <div class="container">
      <div class="konvert__content content">
        <div class="konvert__userrate">
          <select v-model="toRate" class='select-rate'>
            <option value="RUB">Российский рубль</option>
              <option v-for="rates in RATES" 
                      :key="rates.ID" 
                      :value="rates">{{rates.Name}}</option> <!-- вывод списка валют в select -->
            </select>
            <input type="text"
                  v-model="wordRate"
                  placeholder="0"
                  class="konvert__number"> <!-- Ввод числа для конвертации -->
        </div>

        <button @click="sumRates()" class="konvert__btn"></button> <!-- Кнопка рассчета -->

        <div class="konvert__comprate">
          <select v-model="fromRate" class='select-rate'>
            <option value="RUB">Российский рубль</option>
            <option v-for="rates in RATES" 
                    :key="rates.ID" 
                    :value="rates">{{rates.Name}}</option> <!-- вывод списка валют в select -->
            </select> 
            <div class="konvert__number">{{sumRate | format}}</div> <!-- Конвертированное число (форматированное)-->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex"
export default {
  name: 'Konvert',
  data() {
    return {
      toRate: 'RUB',
      fromRate: 'RUB', //
      sumRate: 0, // сумма конвертации
      wordRate: ''
    }
  },
  computed: {
    ...mapGetters([
      'RATES' // получение данных с api
    ])
  },
  methods: {

    sumRates() {
      
      if(Number.isInteger(+this.wordRate)) { // является ли введенное значение числом
        let sum = 0;
          if(this.fromRate == "RUB" && this.toRate != "RUB") { // выбран перевод из Российской валюты в другую (не является Российской валютой)
             sum = this.toRate.Value * this.wordRate
        } else if(this.fromRate == "RUB" && this.toRate == "RUB") { // выбран перевод из Росскийской валюты в Российскую валюту
             sum = Number(this.wordRate);
        } else if (this.fromRate != "RUB" && this.toRate == "RUB"){ // выбран перевод из любой валюты не являющейся Российской валютой в Российскую валюты
            sum = this.wordRate / this.fromRate.Value
        }else {
          sum = (this.toRate.Value * this.wordRate) / this.fromRate.Value;
        }
        return this.sumRate = sum.toFixed(3);

      } else if(this.wordRate == '') { // если input пустой то вывести 0
         this.sumRate = 0;
      } else {
        this.sumRate = 'Ошибка';
      }
      

    }
  },
  filters: {
      format(num) {
     
        if (num > 999) { // форматирует значение от 999 и выше
          let numString = (+num).toFixed(2); // преобразует значение
          let numArray = numString.split('').reverse(); 
          let index = 3; // вставляет запятые через каждые три символа
          while (numArray.length > index + 3) {
            numArray.splice(index + 3, 0, ',');
            index += 4;
          }
          return numArray.reverse().join(''); // возвращает отформатированное значение
        } else {
          return (+num).toFixed(2); // если число меньше 999 возвращает отформатированное значение
        }
      }
    }
}
</script>

<style lang="sass" scoped>
.konvert
  &__content
    display: flex
    align-items: center
    height: 60vh
    justify-content: center

  &__userrate, &__comprate
    display: flex
    flex-direction: column-reverse
    align-items: center

  &__number
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    width: 300px
    height: 150px
    border: 0
    border-radius: 1.25rem
    background: #fff
    box-shadow: 0 5px 50px rgba(0,0,0,.1)
    font-size: 1.5rem
    margin: 0 0 1.25rem 0

    &::placeholder
      font:
        size: 1.5rem
        weight: 400
        opacity: 1
        family: "Rubik", sans-serif
      color: #000

    &:focus::placeholder
      opacity: 0

  &__btn
    position: relative
    width: 4.375rem
    height: 4.375rem
    border-radius: 100%
    border: 2px solid $border-color
    background: #fff
    cursor: pointer
    transition: .4s

    &::before
      content: '\f061'
      font:
        size: 1.5rem
        family: 'Font Awesome 5 Free'
        weight: 900
      color: $border-color

    &:hover
      background: $border-color

      &::before
        color: #fff
    
// MEDIA < 992px (62 rem)
@media screen and (max-width: 62rem)
  .konvert
    &__content
      flex-direction: column
    &__userrate
      margin: 0 0 2.5rem 0
    &__comprate
      margin: 2.5rem 0 0 0
    &__btn::before
      content: '\f063'
// MEDIA < 768px (48rem)
@media screen and (max-width: 48rem)
  .konvert
    &__content
      height: 75vh
    &__number
      height: 4.6875rem
</style>