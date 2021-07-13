import axios from '../axios';
const handleLoginApi=(Useremail, userpassword)=>{
return axios.post('/api/login',{email: Useremail,password: userpassword});
}

export {handleLoginApi}