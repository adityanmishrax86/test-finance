const axios=require('axios');

const fetchInsights=async()=>{
    try{
        const response=await axios.get('http://127.0.0.1:5000');
        return response.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}

module.exports=fetchInsights;
