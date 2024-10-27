<template>
    <div class='profile container'>

        <!-- {{ info }} -->

        <div class="person_content">

            <div v-if="info" class="person_title">МІЙ ПРОФІЛЬ</div>


            <ValidationObserver v-if="info" v-slot="{ invalid }" class="person">


                <div class="person_item">
                    <span class="label"> {{ label_first_name }} </span>
                    <ValidationProvider class="valid" rules="required|ciryl|min2:2" v-slot="{ errors }">
                        <input v-model="info.first_name" class="first_name" type="text" placeholder="mobile">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="person_item">
                    <span class="label"> {{ label_last_name }} </span>
                    <ValidationProvider class="valid" rules="required|ciryl|min2:2" v-slot="{ errors }">
                        <input v-model="info.last_name" class="first_name" type="text" placeholder="mobile">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="person_item">
                    <span class="label"> {{ label_mail }} </span>
                    <ValidationProvider class="valid" rules="required|email" v-slot="{ errors }">
                        <input v-model="info.email" class="first_name" type="text" placeholder="Пошта">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>


                <div class="person_item">
                    <span class="label"> {{ label_mob }} </span>
                    <ValidationProvider class="valid" rules="required|mobile" v-slot="{ errors }">
                        <input v-model="info.phone" class="mobiles" type="text" placeholder="Мобільний">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <!-- <div class="person_item">
                <span class="label"> {{ label_city }} </span>
                <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                  <input
                    v-model="profile.city"
                    class="mobiles"
                    type="text"
                    placeholder="Мобільний"
                  >
                  <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="person_item">
                <span class="label"> {{ label_adress }} </span>
                <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                  <input
                    v-model="profile.adress"
                    class="mobiles"
                    type="text"
                    placeholder="Мобільний"
                  >
                  <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div> -->



                <!-- v-show="!invalid" -->
                <!-- :disabled="invalid" -->
                <div class="forgot_wrapper">
                    <div @click.prevent="mobileLogin" class="auth"> Змінити пароль
                    </div>
                    <div class="forgor">Забули пароль?</div>

                </div>



                <div v-show="!invalid" @click.prevent="editProfile" :disabled="invalid" class="auth"> Зберегти </div>

                <div v-show="invalid" :disabled="invalid" class="auth"> Зберегти </div>



            </ValidationObserver>

            <!-- {{ info }} -->


        </div>

        <div class="pay">
            <div class="pay_title">ПОПОВНИТИ БАЛАНС</div>

            <form @submit.prevent="submitForm">
                <ValidationObserver v-if="info" v-slot="{ invalid }" class="person">


                <div class="person_item">
                    <span class="label"> Номер карти </span>
                    <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                        <input id="cardNumber" v-model="formattedCardNumber" class="first_name" type="text" placeholder="Введіть номер карти">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="person_item">
                    <span class="label"> Власник карти </span>
                    <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                        <input v-model="cardHolder" class="first_name" type="text" placeholder="Введіть ім'я власника">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="person_item">
                    <span class="label"> Термін дії </span>
                    <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                        <input v-model="expiryDate" class="first_name" type="text" placeholder="MM/YY">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>


                <div class="person_item">
                    <span class="label"> CVV: </span>
                    <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                        <input v-model="cvv" class="mobiles" type="text" placeholder="Введіть CVV">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="person_item">
                    <span class="label"> СУМА </span>
                    <ValidationProvider class="valid" rules="required" v-slot="{ errors }">
                        <input v-model="summ" class="mobiles" type="text" placeholder="Сума">
                        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <!-- v-show="" -->
                <div  @click.prevent="editProfile" :disabled="invalid" class="auth"> Сплатити </div>


                </ValidationObserver>
            </form>

        </div>


    </div>
</template>


<script>
import { ValidationObserver, ValidationProvider } from "vee-validate"
import { mapGetters } from 'vuex'
export default {
    name: 'profile',
    data: () => ({
        label_first_name: "Прізвище",
        label_last_name: "Ім'я",
        label_mail: "Електронна пошта",
        label_mob: "Мобільний телефон",
        label_city: "Місто",
        label_adress: "Адреса",

        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        summ: null,
        cardNumber: '',
        formattedCardNumber: '',
    }),

    computed: {
        ...mapGetters([
            'info', 'shops'
        ])
    },

    methods: {
        submitForm() {}
    },
    watch: {
        formattedCardNumber(newVal) {
        // Видалити всі нецифрові символи з номера картки
        const cleanNumber = newVal.replace(/\D/g, '');

        // Регулярний вираз для розбиття на групи по чотири цифри
        const formattedNumber = cleanNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

        this.formattedCardNumber = formattedNumber;
        }
    },
}

</script>



<style lang='scss' scoped>
.container {
    padding: 20px;
    // width: 50%;
    display: flex;
    justify-content: center;
    // align-items: center;
    // flex-direction: column;
}



.payment-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}




.pay {
    width: 50%;
    // display: flex;
}

.pay_title {
    margin: 25px 0;
    font-size: 22px;
    display: flex;
    justify-content: center;
}

.person_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 0 35px;
  margin-right: 50px;
  .person_title {
    margin: 25px 0;
    font-size: 22px;
    // font-weight: 600;
  }
}

.person {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}



.person_item {
  margin-bottom: 25px;
  position: relative;
  width: 100%;
  .label {
    // position: absolute;
    line-height: 20.7px;
    font-size: 13px;
    font-weight: 500;
    left: 0;
    top: -27px;
    cursor: default;
    color: #676767;
    @media (max-width: 960px) {
      top: 35px;
    }
  }
}

.first_name {
  position: relative;
  padding-left: 15px;
  width: 100%;
  height: 35px;
  margin-left: 0px;
  position: relative !important;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  &::placeholder {
    color: silver;
    opacity: 1; 
  }
}


.mobiles {
  position: relative;
  padding-left: 15px;
  width: 100%;
  height: 35px;
  margin-left: 0px;
  position: relative !important;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  
  &::placeholder {
    color: silver;
    opacity: 1; /* для Firefox */
  }
  &::before {
    content: "+38";
    position: absolute;
    z-index: 99999;
    background-color: red;
    font-size: 17px;
    font-weight: 300;
    left: 4px;
    top: 7px;
    width: 1em;
    height: 1em;
    margin-left: 10px;
    margin-top: 3px;
    text-align: center;
  }
}

.forgot_wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.forgor {
  position: absolute;
  // right: 145px;
  font-size: 13px;
  bottom: 20px;
  &:hover {
    // color: red;
    text-decoration: underline;
    cursor: pointer;
  }
}


.enter {
  font-size: 14px;
  cursor: pointer;
  padding: 8px 15px;
  background-color: #F38F00;
  color: #fff;
  border-radius: 8px;
  margin-left: 30px;
  &:hover {
    background-color: #f8b048;
  }
}



.auth {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 14px;
  width: 50%;
  cursor: pointer;
  padding: 8px 0;
  background-color: #F38F00;
  color: #fff;
  border-radius: 8px;
  margin: 0 0 40px 0;
  &:hover {
    background-color: #f8b048;
  }
}

.auth:disabled,
.auth[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  &:hover {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
}



  // input,
  // label {
  //   display: flex;
  //   flex-direction: column;
  //   flex-wrap: wrap;
  // }

  // .form_item {
  //   margin-bottom: 25px;
  // }

  // .contact_field {
  //   background: #F3F3F3;
  //   border-radius: 10px;
  //   padding: 0 10px;
  //   width: 394px;
  //   height: 40px
  // }


.valid {
  display: flex;
  flex-direction: column;

  .error {
    color: red;
    font-size: 13px;
  }
}


</style>