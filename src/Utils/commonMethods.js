import errorIcon from "../assets/error.svg";
import checkIcon from "../assets/check.svg";

export const setToastProperties = (message,type,setList,list) => {
    let toastProperties = null;
    const id = Math.floor(Math.random() * 101 + 1);
    switch(type){
      case 'success':
         toastProperties = {
          id,
          title: "Success",
          description: message,
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        }
        break;
      case 'error':
         toastProperties = {
          id,
          title: "Danger",
          description: message,
          backgroundColor: "#d9534f",
          icon: errorIcon,
        }
        break;
      default:
        setList([])
        break;
    }
    setList([...list, toastProperties]);
  };

  export const  timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
}