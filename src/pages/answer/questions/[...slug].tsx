import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from "@headlessui/react";
import Link from "next/link";
import {useAtom} from "jotai";
import {GSTToken, NearAccount, PeopleEmail, SeasonName, SeasonPhase} from "../../../jotai";
import axios from "axios";
import {useRouter} from "next/router";
import svg from "../../../../public/popbox.svg"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Questions = () =>{
    const router = useRouter()

    const [near_address,] =useAtom(NearAccount)

    const [season_phase,] = useAtom(SeasonPhase)
    const [email,] = useAtom(PeopleEmail)
    //Successful answer
    const [openSuccess,setOpenSuccess] = useState(false)
    //Failed to answer
    const [openError,setOpenError] = useState(false)
    //end answer
    const [openEnd,setOpenEnd] = useState(false)
    //
    const [openEndTwo,setOpenEndTwo] = useState(false)
    //Correct_number
    const [Correct_number,setCorrect_number] = useState(0)
    //AllQuestionNumber
    const [AllQuestionNumber,setAllQuestionNumber] = useState(0)
    //QuestionNumber
    const [questionNumber,setQuestionNumber] =useState(0)
    //AllQuestion
    const [AllQuestion,setAllQuestions] = useState([])
    //SeasonName
    const [seasonName,] =useAtom(SeasonName)
    const Question =  {
            content:"",
            content_index:"",
            question:" ",
            options:[
                {
                    option:"",
                },
            ],
        }
    //
    const [question,setQuestion] = useState(Question)


    useEffect(()=>{
        if (router.isReady){
            const content_index =Number(router.query.slug[0])
            const content =router.query.slug[1]
            console.log(router.query.slug[0],router.query.slug[1])
            const fetchUserBounty = async (content_index) => {

                const seasonNameData = await axios.get("http://127.0.0.1:7001/api/near/query/season_questions_number",{
                    params:{
                        near_address,
                        season_phase,
                        email
                    }})
                console.log(seasonNameData.data)
                if(seasonNameData.data == ""){
                    window.location.replace('/main')
                }

                const result = await axios.get("http://127.0.0.1:7001/api/near/query/questions_number",{
                    params:{
                        season:seasonName,
                        content,
                        content_index,
                        email,
                    }
                })

                if(result.data.correct_number>=1){
                    window.location.replace('/main')
                }

                const data = await axios.get("http://127.0.0.1:7001/api/near/query/content_Question",{
                    params: {content,content_index,season:seasonName}
                })
                console.log(seasonName,content,content_index)
                setAllQuestions(data.data)
                console.log(data.data)
                const QuestionNumber=data.data[0]
                const info = {
                    content:QuestionNumber.content,
                    question:QuestionNumber.question,
                    content_index:QuestionNumber.content_index,
                    options:[
                        {
                            option:QuestionNumber.answer_1,
                        },
                        {
                            option:QuestionNumber.answer_2,
                        },
                        {
                            option:QuestionNumber.answer_3,
                        },
                        {
                            option:QuestionNumber.answer_4,
                        },
                    ],
                }
                setQuestion(info)
            }
            fetchUserBounty(content_index)

        }
    },[router.isReady])


    //
    const QueryCorrectNumber = async () =>{
        const data = await axios.get("http://127.0.0.1:7001/api/near/query/questions_number",{
            params:{
                season:seasonName,
                content:question.content,
                content_index:question.content_index,
                email,
            }
        })
        setCorrect_number(data.data.correct_number)
        setAllQuestionNumber(data.data.all_questions)
    }
    //end button
    const end = async () =>{
        await QueryCorrectNumber()
        setOpenEnd(true)
    }
    //nextQuestion
    const nextQuestion =async (e) =>{
        await QueryCorrectNumber()
        if(e<5){
            setQuestionNumber(questionNumber+1)
        const QuestionNumber=AllQuestion[e]
        const info = {
            content:QuestionNumber.content,
            content_index:QuestionNumber.content_index,
            question:QuestionNumber.question,
            options:[
                {
                    option:QuestionNumber.answer_1,
                },
                {
                    option:QuestionNumber.answer_2,
                },
                {
                    option:QuestionNumber.answer_3,
                },
                {
                    option:QuestionNumber.answer_4,
                },
            ],
        }
        setQuestion(info)
        setOpenSuccess(false)
        setOpenError(false)
        }else {
            setQuestionNumber(5)
            setOpenSuccess(false)
            setOpenEndTwo(true)
        }
    }

    //selected
    const success = async (option)=>{
        console.log(question.question)
        //get the correct answer
        const data = await axios.get("http://127.0.0.1:7001/api/near/query/content_CorrectQuestion",{
            params:{
                season:seasonName,
                content:question.content,
                content_index:question.content_index,
                question:question.question,
                selected:option
            }
        })
        console.log(data.data)
        //post add history record
        await axios.post("http://127.0.0.1:7001/api/near/renew_all_questions",{
            email,
            season:seasonName,
            content:question.content,
            content_index:question.content_index,
        })
        if(data.data){
            //true
                await axios.post("http://127.0.0.1:7001/api/near/renew_correct_number",{
                    email,
                    season:seasonName,
                    content:question.content,
                    content_index:question.content_index,
                })
                setOpenSuccess(true)
        }else {
            setOpenError(true)
        }
        //task_one
        await axios.post("http://127.0.0.1:7001/api/near/post/task_one",{
            email,
            task_one:question.question,
        })

    }



    return (
        <div className="relative bg-purple-600">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984852405730558002/43ce9511e6ed0de5.png"
                     
                />
            </div>
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-center bg-purple-600 ">
                    <div className="text-xl pt-10 pb-4 font-semibold text-2xl text-white">
                        ????????????
                    </div>
                </div>
                <div className="max-w-7xl relative h-screen pb-20   mx-auto ">
                    <div className="pt-10 ">
                        <div className="h-80 border-t border-b border-gray-500 p-8 text-sm bg-white flex items-center justify-center">
                            {question.question}
                        </div>
                        <div className=" flex justify-center   items-center h-14 text-sm" >
                            <div className=' rounded-full bg-white py-2 px-8 flex'>
                                ?????????????????? <div className="px-1">
                                {5-AllQuestionNumber}
                            </div>  ???
                            </div>
                        </div>
                        <div className="flex grid grid-cols-2 mt-2 border-t border-b border-gray-500 bg-white">
                            {question.options.map((item=>(
                                <div key={item.option} onClick={()=> success(item.option)} className="flex items-center justify-center text-xs border-gray-500 border-r border-b h-32 px-2">
                                    {item.option}
                                </div>
                            )))}
                        </div>
                        <div className="flex justify-center  ">
                            <button onClick={end}>
                                <img className="w-56 mt-20" src="https://cdn.discordapp.com/attachments/876498266550853642/984845101354328114/end.png" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
                <Transition.Root show={openSuccess} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={()=>{return  false}}>
                        <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="relative  inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                                >
                                    <div className="absolute inset-0 ">
                                        <img
                                            className=" w-full mx-auto "
                                            src="https://cdn.discordapp.com/attachments/876498266550853642/984846878451580999/b9ae8a64bc7bfadb.png"
                                             
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className=" text-center mt-2 w-80">
                                            <div className="font-semibold">
                                                Congratulations??? ????
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center my-10">
                                            {/*<img className="w-10" src="https://s2.coinmarketcap.com/static/img/coins/64x64/16352.png" alt=""/>*/}
                                            {/*<div className="ml-3 flex">*/}
                                            {/*    +*/}
                                            {/*    <div className="ml-1 text-red-600 text-xl font-semibold">*/}
                                            {/*        2*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="mt-5 relative">
                                        <div className="flex justify-center  ">
                                            <button onClick={()=>{nextQuestion(questionNumber+1)}}>
                                                <img className="w-36" src="https://cdn.discordapp.com/attachments/876498266550853642/984846878250246164/congratulations_.png" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={openError} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={()=>{return  false}}>
                        <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="relative inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                        <div className="relative text-center mt-2 w-80">
                                            <div className="font-semibold">
                                                ?????????????????????
                                            </div>
                                        </div>
                                    <div className="mt-10 relative">
                                        <div className="flex justify-center  ">
                                            <button onClick={()=>{nextQuestion(questionNumber+1)}}>
                                                <img className="w-36" src="https://cdn.discordapp.com/attachments/876498266550853642/984846878250246164/congratulations_.png" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={openEnd} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={()=>{return  false}}>
                        <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="flex justify-end text-xl w-72"><button onClick={()=>{setOpenEnd(false)}} >
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button></div>
                                        <div className=" text-center mt-2 w-80">
                                            <div className="font-semibold">
                                                ??????????????? {AllQuestionNumber} ??? ?????? {5-AllQuestionNumber} ?????????
                                            </div>
                                            <div className="font-semibold">
                                               ????????????{Correct_number}??????
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <div className="flex justify-between  ">
                                            <button onClick={()=>{setOpenEnd(false)}}>
                                                <div className="w-36 flex mt-5  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white ">
                                                    Cancel
                                                </div>
                                            </button>
                                            <Link href="/main">
                                                <div className="w-36 flex mt-5  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white ">
                                                    END
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <Transition.Root show={openEndTwo} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={()=>{return  false}}>
                        <div className="flex items-center justify-center min-h-screen -mt-20  px-4  text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
              </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="flex justify-end text-xl w-72"></div>
                                        <div className=" text-center mt-2 w-80">
                                            <div className="font-semibold">
                                                ??????????????? {questionNumber} ??? ?????? {5-questionNumber} ?????????
                                            </div>
                                            <div className="font-semibold">
                                                ????????????{Correct_number}??????
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <div className="flex justify-center  ">
                                            <Link href="/main">
                                                <img className="w-36" src="https://cdn.discordapp.com/attachments/876498266550853642/984845101354328114/end.png" alt=""/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    )
}

export default Questions
