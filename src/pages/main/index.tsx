import React, {useEffect, useState} from 'react'
import Wallet from "../../components/wallet";
import {useAtom} from "jotai";
import {NearAccount, PeopleAvatar, PeopleEmail, pet_info, PetList, SeasonName} from "../../jotai";
import Navigation from "../../components/navigation";
import Link from 'next/link';
import Header from "../../components/header";
import { Transition } from '@headlessui/react';
import axios from "axios";
import {useRouter} from "next/router";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Main = () =>{
    const progress = [
        {
            state:"",
            img:"https://cdn.discordapp.com/attachments/876498266550853642/978213965781958696/3.png",
            progress:"progress1",
            h1:" I spend my time to make a 3d animated meme and the other guy gets it ",
        },
        {
            state:"",
            img:"https://cdn.discordapp.com/attachments/876498266550853642/978213965781958696/3.png",
            progress:"progress2",
            h1:" I spend my time to make a 3d animated meme and the other guy gets it ??A whole ",
        }
    ]
    const info_ob = {
        near_pet_index:'0',
        near_pet_image_url:"https://cdn.discordapp.com/attachments/876498266550853642/981828663366541352/xie.png",
        near_pet_level:""
    }
    const info = [
        {
            near_pet_index:'1',
            near_pet_image_url:"https://cdn.discordapp.com/attachments/876498266550853642/981828663366541352/xie.png",
            near_pet_level:""
        }
    ]
    const router = useRouter()
    //Correct_number
    const [Correct_number,setCorrect_number] = useState(0)
    //AllQuestionNumber
    const [AllQuestionNumber,setAllQuestionNumber] = useState(0)
    const [email,] = useAtom(PeopleEmail)
    const [seasonName,setSeasonName] =useAtom(SeasonName)
    const [Pet,setPetList] = useState(info)
    //Update Pet
    const [pet,setPet] = useState(info_ob)
    const [near_address,] =useAtom(NearAccount)
    useEffect(()=>{
        if (router.isReady){
            setSeasonName("王冠淇")
            const fetchUserBounty = async () => {
                //
                const seasonNameData = await axios.get("http://127.0.0.1:7001/api/near/query/season_questions_number",{
                    params:{
                        season:seasonName,
                        email
                    }})
                setCorrect_number(seasonNameData.data.correct_number)
                setAllQuestionNumber(seasonNameData.data.all_questions)
                console.log(seasonNameData)

                const data= await axios.get("http://127.0.0.1:7001/api/near/user/pet/all",{
                    params:{
                        near_address
                    }})
                setPetList(data.data)
                setPet(data.data[0])

            }
            fetchUserBounty()
        }
    },[router.isReady])

    if (Pet[0].near_pet_index != '0'){
        return (
            <div className="relative ">
                <div className="absolute inset-x-0 bottom-0    " />
                <div className=" mx-auto  ">

                    <Header/>
                    <div className="absolute inset-0">
                        <img
                            className=" w-full mx-auto"
                            src="https://cdn.discordapp.com/attachments/876498266550853642/984003929085988864/main_.png"
                            alt="People working on laptops"
                        />
                    </div>
                    <div className="max-w-7xl relative px-8  pt-20 pb-12 max-h-screen overflow-auto   mx-auto rounded-b-3xl ">
                        {/*Pet*/}
                        <Transition
                            show={true}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                        <div>
                                <div className=" mt-5 shadow-3xl   rounded-full ">
                                    <div className="flex  items-center text-2xl   ">
                                        <Link href={`/pet/${pet.near_pet_index}`}>
                                            <img className=" rounded-2xl mx-auto" src="https://cdn.discordapp.com/attachments/876498266550853642/984025747171713055/main_.png" alt=""/>
                                        </Link>
                                    </div>
                                </div>

                            <div className="flex justify-between mt-10  text-3xl text-blue-500 ">
                                <Link href="">
                                    <img className="w-12" src="https://cdn.discordapp.com/attachments/876498266550853642/984025746613891092/main_.png" alt=""/>
                                </Link>
                                <Link href="">
                                    <img className="w-12" src="https://cdn.discordapp.com/attachments/876498266550853642/984025746861326376/main_.png" alt=""/>
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-between w-full   overflow-auto pb-3 mt-8 ">

                            {progress.map((item=>(
                            <div key={item.progress} className="p-2 w-full mr-4  bg-white rounded-2xl ">
                                <div className=" flex  justify-end">
                                    <div  className="h-4 w-10 rounded-2xl bg-green-400">

                                    </div>
                                </div>
                                <div className="flex justify-between w-80 h-16 items-center px-2">
                                    <img className="w-20 mr-4" src={item.img} alt=""/>
                                    <div>
                                        <div className="font-semibold">
                                            {item.progress}
                                        </div>
                                        <div className="text-xs  overflow-hidden">
                                            {item.h1}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )))}
                        </div>

                            <div className="bg-white  p-3 rounded-2xl mt-5 shadow-2xl">
                                <div className="text-xl font-semibold">
                                    Toady Data
                                </div>
                                <div className="mt-2">
                                    Number Of Answers
                                </div>
                                <div className="flex justify-between mt-3 items-center" >
                                    <div className="flex w-72  bg-gray-200 h-4 rounded-full items-center">
                                        <div className="bg-green-300 h-4 rounded-full" style={{width:`${AllQuestionNumber*5}%`}}></div>
                                   </div>
                                <div className=" text-xs mr-5 px-1 py-0.5 border text-center">
                                    {AllQuestionNumber}
                                </div>
                                </div>

                                <div className="mt-2">
                                    Correct Number
                                </div>
                                <div className="flex justify-between mt-3 items-center">
                                    <div className="flex w-72  bg-gray-200 h-4 rounded-full items-center">
                                        <div className="bg-green-300 h-4 rounded-full" style={{width:`${Correct_number*5}%`}}></div>
                                    </div>
                                    <div className=" text-xs mr-5 px-1 py-0.5 border text-center">
                                        {Correct_number}
                                    </div>
                                </div>

                            </div>
                    </Transition>
                        {/*Start*/}
                        <div className="flex justify-center mt-10 items-center ">
                                <Link href="/articleList">
                                        <img className="w-72 shadow-2xl rounded-2xl" src="https://cdn.discordapp.com/attachments/876498266550853642/984025747649859604/main_.png" alt=""/>
                                </Link>
                            </div>
                    </div>
                    {/*<Navigation/>*/}
                </div>
            </div>
        )
    }else{
        return (
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0    " />
                <div className=" mx-auto  ">
                    <div className="absolute inset-0">
                        <img
                            className="h-screen w-full mx-auto"
                            src="https://cdn.discordapp.com/attachments/876498266550853642/969529054967529522/5.png"
                            alt="People working on laptops"
                        />
                    </div>
                    <Header/>
                    <div className="max-w-7xl relative px-8 pt-20 pb-7 max-h-screen    mx-auto rounded-b-3xl ">
                        <div>
                            <Transition
                                show={true}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="border-2 border-gray-400 bg-white rounded-2xl border-b-4 border-r-4">
                                    <div className="text-center mt-4 mb-10">

                                    </div>
                                    <div className="flex px-4 items-center text-2xl h-56 text-gray-400">
                                        <div className="">

                                        </div>

                                        <div>

                                        </div>
                                    </div>

                                    <div className="flex justify-between px-4 mt-16 mb-3">
                                        <div className="rounded-full border border-gray-400 w-20 h-5">
                                        </div>
                                        <div>

                                        </div>
                                        <div className="rounded-full border border-gray-400 w-20 h-5">
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                        <div className="flex justify-between mt-10 text-3xl text-blue-500 ">
                            <button>
                                <i className="fa fa-gift" aria-hidden="true"></i>
                            </button>
                            <button>
                                <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="flex justify-center mt-28 items-center ">
                            <div className="">
                                <img className="w-32" src="https://cdn.discordapp.com/attachments/876498266550853642/969501553935405076/LEARN.png" alt=""/>
                            </div>
                            <div>
                                <Link href="/answer">
                                    <div className="">
                                        <img className="w-32" src="https://cdn.discordapp.com/attachments/876498266550853642/969501554119933962/REVIEW.png" alt=""/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="text-xs mt-2 flex justify-end pr-10">

                        </div>
                    </div>
                    {/*<Navigation/>*/}
                </div>
            </div>
        )
    }
}

export default Main
