import * as request from '../utils/request'


export async function getShippingIds(){

  const url = "http://3.83.156.163:3030/orientation";

  return await request.sendGETRequest(url)
}

export async function getData(shippingId){

  const url = "http://3.83.156.163:3030/orientation/" + shippingId;

  return await request.sendGETRequest(url)

}