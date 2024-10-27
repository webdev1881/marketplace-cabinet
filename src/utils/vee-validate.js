import Vue from 'vue';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure
} from 'vee-validate';
import {
  required,
  email,
  confirmed
} from 'vee-validate/dist/rules';

extend('required', { ...required, message: 'Не повинно бути пустим.'});
extend('email', { ...email, message: 'Email не коректний.'});
extend('confirmed', { ...confirmed, message: 'Паролі не співпадають.'});

// CUSTOM
extend('phone', {
  validate: value => {
    if (!value) return true
    const regex = /^[0-9\s- +]*$/g
    return Boolean(value.match(regex))
  },
  message: 'Телефон має складатися з чисел.'
});




configure({
  classes: {
    invalid: 'is-invalid'
  }
});



Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)