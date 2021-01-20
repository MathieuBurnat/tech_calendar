import axios from "axios";

function verifyAuthenticity(){
    console.log(" ~ Is someone here ? ~");

    var ui =  JSON.parse(localStorage.getItem("userInformations"));
    var TockenValid = false;

    let authURL = 'http://localhost:4000/auth/verify-authenticity';
    axios.post(authURL, ui).then((res) => {
      TockenValid = res.data.isTockenMatches;
      if(TockenValid){
        return true;
      }else{ 
        return false;
      }
    }).catch(error => {
        console.log(error);
    });
}

export { verifyAuthenticity };