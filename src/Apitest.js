import { useEffect } from "react"
function Apitest(){
    function load(){
    fetch("http://localhost:5000/").then((res) => res.json()).then(response=>console.log(response))
    .catch((err) => {
        console.error("ERROR!", err);
    });
    }
    useEffect(()=>{load()});
}

export default Apitest