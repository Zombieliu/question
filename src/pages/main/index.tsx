import React, {useEffect, useState} from 'react'
import {useAtom} from "jotai";
import {NearAccount,PeopleAvatar,PeopleEmail,SeasonName,SeasonPhase} from "../../jotai";
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

    const router = useRouter()
    //Correct_number
    const [Correct_number,setCorrect_number] = useState(0)
    //AllQuestionNumber
    const [AllQuestionNumber,setAllQuestionNumber] = useState(0)
    //seasonImg
    const [seasonImg,SetSeasonImg] = useState("https://cdn.discordapp.com/attachments/876498266550853642/984025747171713055/main_.png")
    //
    const [email,] = useAtom(PeopleEmail)
    const [seasonName,setSeasonName] =useAtom(SeasonName)
    const [season_phase,] = useAtom(SeasonPhase)

    const [near_address,] =useAtom(NearAccount)
    useEffect(()=>{
        if (router.isReady){

            const fetchUserBounty = async () => {

                //
                const seasonNameData = await axios.get("http://127.0.0.1:7001/api/near/query/season_questions_number",{
                    params:{
                        near_address,
                        season_phase,
                        email
                    }})
                if(seasonNameData.data){
                    setSeasonName(seasonNameData.data.season)
                    setCorrect_number(seasonNameData.data.correct_number)
                    setAllQuestionNumber(seasonNameData.data.all_questions)
                    SetSeasonImg(seasonNameData.data.season_url)
                    console.log(seasonName)
                }

            }
            fetchUserBounty()
        }
    },[router.isReady])


        return (
            <div className="relative ">
                <div className="absolute inset-x-0 bottom-0    " />
                <div className=" mx-auto  ">

                    <Header/>
                    <div className="absolute inset-0">
                        <img
                            className=" w-full mx-auto"
                            src="https://cdn.discordapp.com/attachments/876498266550853642/984003929085988864/main_.png"
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
                                        <Link href={`/season`}>
                                            <img className=" rounded-2xl mx-auto" src={seasonImg} alt=""/>
                                        </Link>
                                    </div>
                                </div>

                            <div className="flex justify-between mt-10  text-3xl text-blue-500 ">
                                <Link href="https://web3games.com">
                                    <img className="w-12" src="https://cdn.discordapp.com/attachments/876498266550853642/984025746613891092/main_.png" alt=""/>
                                </Link>
                                <Link href="https://www.tailwindcss.cn/docs/background-image">
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

}

export default Main
