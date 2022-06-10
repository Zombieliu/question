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
    return (
        <div className="relative">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}}>
                        <div className=" text-2xl text-gray-600 px-5">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div className="text-xl font-semibold">
                        勋章
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-4  py-10  mx-auto ">
                    <div className="grid grid-cols-2 gap-3 mt-12">
                        {pet.map((item=>(
                            <Link href="/wallet/external/pets/detail"  key={item.near_pet_index} >
                                <a className=" rounded-2xl  text-center border border-gray-500 border-2 border-b-4 border-r-4">
                                    <div className=" px-4  pb-2 border-gray-500">
                                        <div className="flex justify-center items-center">
                                            <div className={classNames(PetStyle[item.near_pet_type],'rounded-b-xl w-5/6 ')}>
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
