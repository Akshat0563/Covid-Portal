const fs = require('fs')

const BedsAtRandom = ()=>{
    let total = Math.floor(Math.random() * 100) * 5
    let occupied = Math.floor(Math.random() * total)
    let available = total - occupied
    return {total, occupied, available}
}

var finalData = []
var rawData = JSON.parse(fs.readFileSync('raw/hospitals_raw.json'))
for(let center of rawData){
    let beds = BedsAtRandom()
    let hospital = {
        Hospital: center.name,
        address: center.address,
        district: center.district_name,
        pincode: center.pincode,
        Beds_total: beds.total,
        Beds_occupied: beds.occupied,
        Beds_available: beds.available
    }

    finalData.push(hospital)
}

fs.writeFileSync('hospitals.json', JSON.stringify(finalData, null, 2))