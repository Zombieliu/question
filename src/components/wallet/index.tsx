import React, {useEffect} from 'react'
import {useAtom} from "jotai";
import {ExternalUSNToken, GMTToken, GSTToken, NearAccount, NEARToken} from "../../jotai";
import Link from "next/link";
import axios from "axios";
import {formatDecimal} from "../../utils";
const Wallet = () =>{

   // const [GSTtoken,setGSTtoken] = useAtom(GSTToken)
   // const [GMTtoken,setGMTtoken] = useAtom(GMTToken)
   const [NEARtoken,setNEARtoken] = useAtom(NEARToken)
   const [externalUSNtoken,setExternalUSNtoken] = useAtom(ExternalUSNToken)
   const [near_address,setNear_hex_account] =useAtom(NearAccount)
    useEffect(() =>{
        const fetchUserBounty = async () => {
            console.log(near_address)
            const data= await axios.get("http://127.0.0.1:7001/api/near/query/near_internal_account_balance",{
                params:{
                    near_address
                }
                })
            const near_balance = Number(formatDecimal(data.data,4))
            setNEARtoken(near_balance)
            const USN = await axios.get("http://127.0.0.1:7001/api/near/query/near_account_usn_balance",
                {
                    params:{
                        near_address
                    }
                })
            const USN_balance =Number(formatDecimal(USN.data/1000000000000000000,8))
            setExternalUSNtoken(USN_balance)
        }
       fetchUserBounty()
    },[])
    return (
        <div className="flex h-10">
            {/*tokens*/}
        <div className="flex   justify-between border border-gray-400 bg-white px-2 py-1.5 rounded-full pr-10">
            <div className="flex items-center pr-2">
                <img className="rounded-full w-6"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU" alt=""/>
               <div className="pl-1 truncate text-xs">
                {externalUSNtoken}
               </div>
            </div>
            <div className="flex items-center pr-2">
                <img className="rounded-full w-6"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1onspODOPj_-mr_lbWFWTt6SFO69mMdG6eT-tnkCiaBy97s2i-1KauNPVv4nN_L1bYkA&usqp=CAU" alt=""/>
              <div className="pl-1 truncate text-xs">
                {NEARtoken}
              </div>
            </div>
        </div>
            {/*wallet*/}
            <div className="flex items-center -ml-10">
                <Link href="/wallet/external">
                    <a>
                <img className="rounded-full w-10   border "
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkvtQAreQJ8OmKHJ9UvXI5ELYj5ayETZvwQ&usqp=CAU" alt=""/>
                    </a></Link></div>

        </div>
    )
}

export default Wallet
