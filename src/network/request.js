import axios from 'axios'

export function request(config){
  const instance=axios.create({
    baseURL:'http://106.54.54.237:8000/api/h3',
    timeout:5000
  })
  instance.interceptors.request.use(
    config=>{
    // console.log(config)
    return config
  },
    err=>{
      console.log(err)
      return err
    }
  )
  instance.interceptors.response.use(
    config=>{
    // console.log(config)
    return config.data
  },
    err=>{
      console.log(err)
      return err
    })
 
  return instance(config)

}