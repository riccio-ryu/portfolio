
let address = '';
const devAdd = true;//tr => dev // fls => pro

const nowAdd = (dev:boolean) => {
    if(dev){
        address = `http://localhost:4000/`;
    }else{
        address = `http://3.87.90.33:4000/`;
    }
}

nowAdd(devAdd)
export const Mode = {
  add: address
}