import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Link from "next/link";
import {Constant} from "../../../constant";
import axios from "axios";
import {useAtom} from "jotai";
import {LoadingState, NearAccount, NEARToken} from "../../../jotai";
import Loading from "../../../components/loading";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ToExternal = () =>{
    const router = useRouter()
    const [tokenName,setTokenName]=useState("")
    const [openload,setOpenload]=useAtom(LoadingState)
    const [near_address,setNear_hex_account] =useAtom(NearAccount)
    const [NEARtoken,setNEARtoken] = useAtom(NEARToken)
    const tokenInfo = Constant()
    useEffect(()=>{
        if(router.isReady){
            const name = router.query.slug[0]
            setTokenName(name)
            const fetchUserBounty = async () => {
                console.log(near_address)
                const data= await axios.get("http://127.0.0.1:7001/api/near/query/near_account_balance",{
                    params:{
                        near_address
                    }
                })
                console.log(data.data)
                const token = data.data -0.0001
                const near_balance = Number(token.toFixed(8))
                setNEARtoken(near_balance)
            }
            fetchUserBounty()
        }

    },[router.isReady])
    const all = ()=>{
        (document.getElementById("amount") as HTMLInputElement).value = classNames(tokenInfo.TokenData[tokenName])
    }
    const confirm =async ()=>{
        setOpenload(true)
        const receiverId =  (document.getElementById("address") as HTMLInputElement).value
        const amount =  (document.getElementById("amount") as HTMLInputElement).value
        await axios.post("http://127.0.0.1:7001/api/near/user/transfer/near",{
            near_address,receiverId,amount
        }).then(async function(response){
            setOpenload(false)
            alert("成功")
            await router.push("/wallet/external")
        }).catch(async function (error){
            setOpenload(false)
            alert("请重试")
        })


    }
    return (
        <div className="relative">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984775579536613446/send_to_.png"
                    alt="People working on laptops"
                />
            </div>
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <Link href="/wallet/external">
                        <img className="w-8 ml-5 " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </Link>
                    <div className="text-xl font-semibold">
                      SEND TO
                    </div>
                    <div>
                        <div className=" text-2xl  text-gray-600 px-8">

                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-8 py-20   mx-auto ">
                    <div>
                        <div className="flex justify-center mt-10">
                        <img className="w-12 rounded-full" src={classNames(tokenInfo.TokenImg[tokenName])} alt=""/>
                        </div>

                        <div className="mt-10 text-sm text-gray-500 mb-2">
                            To Address
                        </div>
                        <div className="flex">
                            <input type="text"
                                   className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700 border-2 border-r-4 border-b-4  transition duration-300  outline-none"
                                   id="address"
                            />
                           </div>

                        <div className="mt-10 text-sm text-gray-500 mb-2">
                            Amount
                        </div>
                        <div className="flex">
                            <input type="text"
                                   className="text-xs md:text-sm   rounded-lg p-2 py-3 w-full border-gray-700 border-2 border-r-4 border-b-4  transition duration-300  outline-none"
                                   id="amount"
                            />
                            <div className="-ml-20 text-sm flex items-center text-yellow-400">
                                <div className="mr-4 text-black font-semibold">
                                    {tokenName}
                                </div>
                                <button onClick={all}>
                                    All
                                </button>

                            </div></div>
                        <div className="flex text-xs mt-1">
                            Balance:
                            <div className="ml-0.5 flex">
                                {classNames(tokenInfo.ExternalData[tokenName])}
                                <div className="ml-0.5">{tokenName}</div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-2xl mt-8 text-sm">
                            Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
                        </div>
                        <div className="flex justify-center mt-10 ">
                            <button onClick={confirm} className=" flex mt-10  justify-center rounded-full  px-4 py-2  ">
                                <img className="w-72" src="https://cdn.discordapp.com/attachments/876498266550853642/984775497928015952/send_to_.png" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
                <Loading/>
            </div>
        </div>
    )
}

export default ToExternal
