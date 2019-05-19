import * as ElGamal from './elgamal'
import * as JSBN from 'jsbn'

const BigInt = JSBN.BigInteger;
const sk = "22042594234080394";
const g = "23114357934155028";
const p = "170141183460469231731690190877448458819";

export async function decryptDataSet(data, decryptedData, index){


  return new Promise(async (resolve, reject) => {

    try{

      if(index < data.length){


        const timestamp = ElGamal.decryptMessage(
          data[index].timestamp.c1,
          data[index].timestamp.c2,
          sk,
          p
        );

        const orientation = ElGamal.decryptMessage(
          data[index].orientation.c1,
          data[index].orientation.c2,
          sk,
          p
        );

        const orientationEphemeralKey = ElGamal.decryptMessage(
          data[index].orientationEphemeralKey.c1,
          data[index].orientationEphemeralKey.c2,
          sk,
          p
        );

        console.log("ORIENTAION " + orientation);
        console.log(orientation == 5);

        let formattedOrientation;
        if(orientation == 5){
          formattedOrientation = "Upside-Down!";
        } else {
          formattedOrientation = "Ok";
        }

        decryptedData.push({
          timestamp,
          orientation: formattedOrientation,
          orientationEphemeralKey
          // timestampEphemeralKey
        });

        resolve(decryptDataSet(data, decryptedData, index + 1))

      } else {
        console.log(decryptedData);
        resolve (decryptedData)
      }

    } catch(e){ reject(e) }

  })
}

export function aggregateEphemeralKeys(data){

  let aggregatedEphemeralKey = null;

  console.log(data);

  data.forEach((dataPoint) => {
    if(!aggregatedEphemeralKey){
      console.log("AGG")

      console.log(dataPoint.orientationEphemeralKey)
      console.log(aggregatedEphemeralKey)
      aggregatedEphemeralKey = new BigInt(dataPoint.orientationEphemeralKey, 10);
      console.log(aggregatedEphemeralKey.toString(10))

    } else {
      console.log("AGG")
      console.log(dataPoint.orientationEphemeralKey)
      console.log(aggregatedEphemeralKey.toString(10))
      aggregatedEphemeralKey = aggregatedEphemeralKey.add(new BigInt(dataPoint.orientationEphemeralKey,10))
      console.log(aggregatedEphemeralKey.toString(10))

    }
  });

  console.log(aggregatedEphemeralKey.toString(10))

  return aggregatedEphemeralKey.toString(10)

}


export function aggregateData(data){

  let C1 = new BigInt('1');
  let C2 = new BigInt('1');

  data.forEach((dataPoint) => {
    console.log(dataPoint.orientation.c1);
    C1 = C1.multiply(new BigInt(dataPoint.orientation.c1, 10));
    C2 = C2.multiply(new BigInt(dataPoint.orientation.c2, 10));
  });

  console.log('okok')

  console.log(C1.toString(10));
  console.log(C2.toString(10));

  const decryptedAggregatedData = ElGamal.decryptMessage(C1.toString(10), C2.toString(10), sk, p);
    console.log('okokok');


  return {
    aggregatedData: {
      c1: C1.toString(10),
      c2: C2.toString(10)
    },
    decryptedAggregatedData
  }


}