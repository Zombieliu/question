import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {PetStyle} from "../../../../constant";
import axios from "axios";
import {useAtom} from "jotai";
import {NearAccount} from "../../../../jotai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Pets = () =>{
    const [near_address,] =useAtom(NearAccount)
    const [pet,setPet] = useState([])


    useEffect(()=>{
        const fetchUserBounty = async () => {
            console.log(near_address)
            const data= await axios.get("http://127.0.0.1:7001/api/near/user/pet/all",{
                params:{
                    near_address
                }}
            )
            setPet(data.data)
            console.log(data)
        }
        fetchUserBounty()
    },[])

    const Pet = [
        {
            near_pet_index:"1",
            near_pet_image_url:"https://cdn.discordapp.com/attachments/876498266550853642/974572686225313802/1.png",
        }
    ]
    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="absolute inset-0">
                    <img
                        className=" w-full mx-auto"
                        src="https://cdn.discordapp.com/attachments/876498266550853642/986209079057854504/ce0e88d6abba21f2.png"
                         
                    />
                </div>
                <div className="fixed z-20 inset-x-0 flex justify-between ">
                    <button onClick={()=>{window.history.back()}} className="pl-5">
                        <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </button>
                    <div className="text-xl font-semibold text-white">
                        勋章
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-4  py-10  mx-auto ">
                    <div className="grid grid-cols-2 gap-3 mt-12">
                        {Pet.map((item=>(
                            <Link href="/wallet/external/pets/detail"  key={item.near_pet_index} >
                                <a className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">
                                    <div className=" px-4  pb-2 border-gray-500">
                                        <div className="flex justify-center items-center">
                                            <div className={classNames(PetStyle.Uncommon,'rounded-b-xl w-5/6 ')}>
                                                Defi 达人
                                            </div>
                                        </div>
                                        <img className="mx-auto  py-3" src={item.near_pet_image_url} alt=""/>
                                    </div>
                                </a>
                            </Link>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pets
