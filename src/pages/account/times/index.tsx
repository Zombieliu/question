import React, {useEffect, useState} from 'react'
import Link from "next/link";
import axios from "axios";
import router, {useRouter} from 'next/router';
import {useAtom} from "jotai";
import {PeopleEmail, SeasonName} from "../../../jotai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Record = () =>{
    const router = useRouter()
    const [Correct_number,setCorrect_number] = useState(0)
    //AllQuestionNumber
    const [AllQuestionNumber,setAllQuestionNumber] = useState(0)
    //
    const [participation_times,setParticipation_times] =useState(0)

    const [email,] = useAtom(PeopleEmail)
    const [seasonName,] =useAtom(SeasonName)
    const [info,setInfo] = useState([])
    useEffect(()=>{
        if (router.isReady){
            const fetchUserBounty = async () => {
                //
                const seasonNameData = await axios.get("http://127.0.0.1:7001/api/near/query/all_questions_number",{
                    params:{
                        season:seasonName,
                        email
                    }})
                setInfo(seasonNameData.data)
                let correct_number = 0
                let allQuestionNumber = 0
                for (let i=0;i<seasonNameData.data.length;i++){
                    correct_number = correct_number + seasonNameData.data[i].correct_number
                    allQuestionNumber = allQuestionNumber + seasonNameData.data[i].all_questions
                }
                setCorrect_number(correct_number)
                setAllQuestionNumber(allQuestionNumber)
                setParticipation_times(seasonNameData.data.length)
                console.log(seasonNameData)
            }
            fetchUserBounty()
        }
    },[router.isReady])
    return(
        <>

            <div className="flex py-20   px-8  ">
                <div>
                <div className="flex items-center text-white">
                    参加了
                    <div className="flex justify-center items-center text-2xl font-semibold mx-1 h-10 w-10 rounded-full bg-black bg-opacity-40 text-white"> {participation_times}  </div>
                    期！
                </div>
                    <div className="flex text-white">
                        <div className="mt-10">
                           一共答题次数 {AllQuestionNumber} 次！
                        </div>
                        <div className="mt-10">
                            正确答题次数 {Correct_number} 次！
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-8 h-big  overflow-auto py-2 pb-8 bg-white">
                {info.map((item=>(
                    <Link href={`times/seasonDetail/${item.season}`} key={item.season}>
                <div className="flex items-center border-b pb-4 justify-between">
                    <div className="flex items-center">
                    <img className="w-24" src={item.season_url} alt=""/>
                    <div className="ml-4">
                     <div>
                        一共答题次数 {item.all_questions} 次！
                        </div>
                     <div>
                        正确答题次数 {item.correct_number} 次！
                      </div>
                      </div>
                    </div>
                    <div className="text-xl font-semibold">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>

                </div>
                    </Link>
                )))}
                {info.map((item=>(
                    <Link href={`times/seasonDetail/${item.season}`} key={item.season}>
                        <div className="flex items-center border-b pb-4 justify-between">
                            <div className="flex items-center">
                                <img className="w-24" src={item.season_url} alt=""/>
                                <div className="ml-4">
                                    <div>
                                        一共答题次数 {item.all_questions} 次！
                                    </div>
                                    <div>
                                        正确答题次数 {item.correct_number} 次！
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl font-semibold">
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                            </div>

                        </div>
                    </Link>
                )))}
                {info.map((item=>(
                    <Link href={`times/seasonDetail/${item.season}`} key={item.season}>
                        <div className="flex items-center border-b pb-4 justify-between">
                            <div className="flex items-center">
                                <img className="w-24" src={item.season_url} alt=""/>
                                <div className="ml-4">
                                    <div>
                                        一共答题次数 {item.all_questions} 次！
                                    </div>
                                    <div>
                                        正确答题次数 {item.correct_number} 次！
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl font-semibold">
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                            </div>

                        </div>
                    </Link>
                )))}
            </div>

        </>
    )
}

const Times = () =>{

    return (
        <div className="relative">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984852405730558002/43ce9511e6ed0de5.png"
                    alt="People working on laptops"
                />
            </div>
            <div className="absolute inset-x-0 bottom-0    " />
            <div className="fixed z-20 inset-x-0 flex justify-between items-center ">
                <Link href="/account">
                    <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                </Link>
                <div className="flex justify-center font-semibold text-2xl items-center ">
                    <Link href="/wallet/external">
                        <a className=" text-white  ">
                            Learning Record
                        </a>
                    </Link>
                </div>
                <div className="  text-2xl text-gray-600 px-5">
                </div>
            </div>

            <div className=" mx-auto  ">
                <div className="max-w-7xl relative  h-screen  overflow-hidden mx-auto ">
                    <Record/>
                </div>
            </div>
        </div>
    )
}

export default Times
