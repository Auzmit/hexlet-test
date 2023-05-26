export default function solution(content){
  // BEGIN

  // step 1
  let arrData = content.split('\n');
  arrData = arrData.slice(1, arrData.length - 1);
  const rows = arrData.length;
  

  // step 2
  const cities = arrData.map((row) => row.split(',')[7]);
  let uniqCities = [];
  for (let city of cities) {
    if (!uniqCities.includes(city)) {
      uniqCities.push(city);
    }
  }


  // step 3
  let minHumidity = arrData[0].split(',')[3];
  let maxHumidity = arrData[0].split(',')[3];
  for (let row of arrData) {
    if (row.split(',')[3] > maxHumidity) {
      maxHumidity = row.split(',')[3];
    } else if (row.split(',')[3] < minHumidity) {
      minHumidity = row.split(',')[3];
    }
  }


  // step 4
  let hottestTemp = arrData[0].split(',')[1];
  let hottestDate = arrData[0].split(',')[0];
  let hottestCity = arrData[0].split(',')[7];
  for (let row of arrData) {
    if (row.split(',')[1] > hottestTemp) {
      hottestTemp = row.split(',')[1];
      hottestDate = row.split(',')[0];
      hottestCity = row.split(',')[7];
    }
  }


  // step 5
  let arrCitiesTemps = [];
  for (let city of uniqCities) {
    arrCitiesTemps.push([city, []]);
  }

  let currCity = '';
  for (let row of arrData) {
    currCity = row.split(',')[7];
    for (let arr of arrCitiesTemps) {
      if (arr[0] === currCity) {
        arr[1].push(Number(row.split(',')[1]));
      }
    }
  }

  for (let arrCurCityTemps of arrCitiesTemps) {
    let sumTemps = 0;
    for (let temp of arrCurCityTemps[1]) {
      sumTemps += temp;
    }
    arrCurCityTemps[1] = sumTemps/(arrCurCityTemps[1].length);
  }

  let averageHottestTemp = arrCitiesTemps[0][1];
  let averageHottestCity = arrCitiesTemps[0][0];
  for (let currCityTemp of arrCitiesTemps) {
    if (currCityTemp[1] > averageHottestTemp) {
      averageHottestTemp = currCityTemp[1];
      averageHottestCity = currCityTemp[0];
    }
  }


  // Output answers
  console.log(`Count: ${rows}`);
  console.log(`Cities: ${uniqCities.sort().join(', ')}`);
  console.log(`Humidity: Min: ${minHumidity}, Max: ${maxHumidity}`);
  console.log(`HottestDay: ${hottestDate} ${hottestCity}`);
  console.log(`HottestCity: ${averageHottestCity}`);

  // END
}