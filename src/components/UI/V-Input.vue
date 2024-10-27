<template>
  <p class="v_input">
    <span class="label"> {{ label  }} </span>

    <!-- <ValidationProvider v-slot="v"> -->
    <input
      :disabled="disabled"
      autocomplete="off"
      :onpaste="onpaste"
      :rules="rules"
      name="v-input"
      ref="input_focus"
      :type="typeval"
      :class="{ mob: isMob }"
      :value="value"
      @input="update($event.target.value)"
      :placeholder="placeholder"
      v-on:keypress="latin ? isLatin($event) : kiryl ? isKiryl($event) : kirylNum ? isKirylNum($event) : number ? isNumber($event) : vin ? isVin($event) : '' "
    />

    <!-- <span class="error_message">{{ errors.first("v-input")  }}</span> -->

  </p>
</template>



<script>
export default {

  name: "v-input",

  data: () => ({
    search_text: "",
    focused: false,
    new_error: "",
  }),
  // model: {
  //   prop: "value",
  //   event: "update",
  // },

  props: {
    disabled: { type: Boolean, default: false },
    vin: { type: Boolean, default: false },
    onpaste: { type: String, default: "return true" },
    isMob: { type: Boolean, default: false },
    number: { type: Boolean, default: false },
    max: { type: Number, default: null },
    upper: { type: Boolean, default: false },
    latin: { type: Boolean, default: false },
    kiryl: { type: Boolean, default: false },
    kirylNum: { type: Boolean, default: false },
    typeval: { type: String },
    rules: { type: Object },
    error: { type: Array },
    error_message: { type: Array },
    id: { type: String },
    label: { type: String, default: "" },
    placeholder: { type: String, required: true },
    value: { type: String, default: ""  },
  },
  methods: {
    update(v) {
      if( this.upper ) {
        this.$emit("update", v.toUpperCase())
      } else {
        this.$emit("update", v)
      }
    },

    isVin(e) {
      // console.log( e )
      let char = String.fromCharCode(e.keyCode);
      // char.toUpperCase()
      // console.log( char.toUpperCase() )
      if (/[0-9A-HJ-NPR-ZБГДЭЖЗИЛПФЦЧШЩЮЯ]/.test(char.toUpperCase())) return true;
      // /([0-9A-HJ-NPR-ZБГДЭЖЗИЛПФЦЧШЩЮЯ])/
      else e.preventDefault();
    },

    isLatin(e) {
      // console.log( e )
      let char = String.fromCharCode(e.keyCode);
      if (/[A-Z0-9a-z@\._]/.test(char)) return true;
      else e.preventDefault();
    },
    isKiryl(e) {
      // console.log(e);
      let char = String.fromCharCode(e.keyCode);
      if ( /[А-Яа-яёЁЇїІіЄєҐґ\s]/.test(char) ) {
        return true
      } else {
        e.preventDefault()
      } 
    },
    isKirylNum(e) {
      // console.log(e);
      let char = String.fromCharCode(e.keyCode);
      if ( /[0-9А-Яа-яёЁЇїІіЄєҐґ\s]/.test(char) ) {
        return true
      } else {
        e.preventDefault()
      } 
    },
    isNumber(e) {
      // console.log(e);
      let char = String.fromCharCode(e.keyCode);
      if ( /[0-9]/.test(char) && e.target.value.length < this.max ) {
        return true
      } else {
        e.preventDefault()
      } 
    },
  },
  mounted() {
    this.new_error = this.error;
  },
  watch: {
    error: function (val) {
      this.new_error = this.error;
      // console.log( this.new_error )
    },
  },
};
</script>



<style lang='scss' scoped>




.error_message {
  position: absolute;
  bottom: -14px;
  color: red;
  font-size: 13px;
}

.error_class {
  color: red !important;
  border: 1px solid red !important;
}

.wrap_input {
  width: 100%;
  position: relative;
  margin-right: 25px;
}
.label {
  position: absolute;
  line-height: 20.7px;
  color: #001528;
  font-size: 15px;
  font-weight: 500;
  left: 0;
  top: -35px;
  cursor: default;
  @media (max-width: 960px) {
    // padding: 9px;
    top: 35px;
  }
}

.mob {
  // padding-left: 35px!important;
  // margin-left: 0px;
  // position: relative!important;
  // box-sizing:border-box;
  &::before {
    content: "+38";
    position: absolute;
    z-index: 1;
    font-size: 17px;
    font-weight: 300;
    left: 4px;
    top: 16px;
    // width: 1em;
    // height: 1em;
    // margin-left: 10px;
    // margin-top: 3px;
    // text-align: center;
  }
}


.v_input {
  display: flex;
  width: 100%;
  position: relative;
  margin-right: 25px;

  .mob {
    padding-left: 34px!important;
    margin-left: 0px;
    position: relative!important;
    box-sizing:border-box;
    &::before {
      // content: "+38";
      // position: absolute;
      // z-index: 1;
      // font-size: 17px;
      // left: 4px;
      // top: 16px;
      // width: 1em;
      // height: 1em;
      // margin-left: 10px;
      // margin-top: 3px;
      // text-align: center;
    }
  }

  // margin-top: 70px;
  input {
    width: 100%;
    height: 50px;
    background: #ffffff;
    border: 1px solid #b7d2e1;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 1.05em;
    appearance: textfield;

    line-height: 22px !important;
    padding: 5px 6px 5px 6px;
    font-weight: 400;
    font-size: 17px;
    text-align: left;
    color: #4f6c81;
    

    &:focus {
      border: 1px solid #f08f25;
      outline: none;
    }

    @media (max-width: 960px) {
      // padding: 9px;
      margin-top: 70px;
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

// input::before {
//   content: '555';
//   position: absolute;
//   top: 4px;
//   left: 96px;
//   font-family: arial, helvetica, sans-serif;
//   font-size: 12px;
//   display: block;
//   color: rgba(0, 0, 0, 0.6);
//   font-weight: bold;
// }

::placeholder {
  color: #b6b6b6;
  opacity: 1; /* Firefox */
}
</style>