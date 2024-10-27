export default function dateFilter( val, format = 'date' ) {

    // console.log( val )
    val = new Date(val)

    if(!val) {
        return
    }

    return (val.toISOString().slice(0,10) + ' | ' + val.toISOString().slice(12,16)) || ''
  
}