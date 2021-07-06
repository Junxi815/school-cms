import { message } from 'antd'
import axios from 'axios'

export default function ajax (url, data={},type="GET") {
  return new Promise((resolve,reject)=>{
    let promise
    if(type==="GET"){
      promise = axios.get(url, {
        params: data
      })
    }else{
      promise = axios.post(url,data)
    }
    promise.then(function(response){
      resolve (response.data)
    }).catch(function(err){
      message.error(err.message)
    })
  })
  
}