import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in',
    headers: {
        'x-api-key': 'reqres-free-v1'  
    }
});

instance.interceptors.response.use(
    function (response) {
        return response.data ? response.data : { statusCode: response.status };
    },
    function (error) {
       let res = {};
       if(error.response){
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
       }else if(error.request){
        console.log(error.request);
       }else{
        console.log("Errorr",error.message);
       }
    }
);

export default instance;
