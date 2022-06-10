import {useAtom} from "jotai";
import {
    ExternalGMTToken,
    ExternalGSTToken,
    ExternalNEARToken,
    ExternalUSNToken,
    GMTToken,
    GSTToken,
    NEARToken
} from "../jotai";

const Constant = ()=>{
    //TokenData
    const [GST,] = useAtom(GSTToken)
    const [GMT,] = useAtom(GMTToken)
    const [NEAR,] = useAtom(NEARToken)
    const [externalGSTtoken,] = useAtom(ExternalGSTToken)
    const [externalGMTtoken,] = useAtom(ExternalGMTToken)
    const [externalNEARtoken,] = useAtom(ExternalNEARToken)
    const [externalUSNtoken,] = useAtom(ExternalUSNToken)
    //InternalTokensData
    const TokenData= { GST, GMT, NEAR}
    //ExternalTokensData
    const ExternalData = {
        GST:externalGSTtoken,
        GMT:externalGMTtoken,
        NEAR:externalNEARtoken,
        USN:externalUSNtoken
    }
    const TokenImg = {
        GST:"https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png",
        GMT:"https://s2.coinmarketcap.com/static/img/coins/200x200/18069.png",
        NEAR:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU",
    }
    return {TokenData,TokenImg,ExternalData}
}

   //PetBackground
   const PetStyle=
    {
        Common:"bg-gray-500 text-white",
        Uncommon:"bg-green-600 text-white",
        Rare:"bg-blue-400 text-white" ,
        Epic:"bg-indigo-400 text-white",
        Legendary:"bg-yellow-400 text-black" ,
    }
//PetTextStyle
    const PetTextStyle=
        {
            Common:"text-black",
            Uncommon:"text-green-600 ",
            Rare:"text-blue-400" ,
            Epic:"text-indigo-400",
            Legendary:"text-yellow-400",
        }
export {Constant,PetStyle,PetTextStyle}
