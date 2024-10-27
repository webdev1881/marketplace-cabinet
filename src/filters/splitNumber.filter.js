export default function splitNumber( value ) {
    let reg = Math.ceil(value) 
    return reg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}