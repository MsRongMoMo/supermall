import axios from 'axios'

export function request(config){
  const instance=axios.create({
    baseURL:'http://xxx.xx.xx.xxx:8000/xxx/xx',
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