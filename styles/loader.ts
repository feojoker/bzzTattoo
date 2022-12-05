export default `
body{
display: block;
}
#globalLoader{
    position: fixed;
    z-index: 1700;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000000;
    display: flex;
    right: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
.loader {
    width: 65px;
    height: 65px;
    border: 8px solid #ee9b00a6;
    border-radius: 50px;
    position: relative;
   }
   
   .loader span {
    display: block;
    background: #ee9b00;
   }
   
   .loader .hour ,
   .loader .min {
    width: 6px;
    height: 22px;
    border-radius: 50px;
    position: absolute;
    top: 24.5px;
    left: 21px;
    animation: load9243 1.2s linear infinite;
    transform-origin: top center;
   }
   
   .loader .min {
    height: 17px;
    animation: load9243 4s linear infinite;
   }
   
   .loader .circel {
    width: 10px;
    height: 10px;
    border-radius: 50px;
    position: absolute;
    top: 19px;
    left: 19px;
   }
   
   @keyframes load9243 {
    0% {
     transform: rotate(0deg);
    }
   
    100% {
     transform: rotate(360deg);
    }
   }`;