import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {useAtom} from "jotai";
import {NearAccount, PeopleEmail, SeasonName} from "../../jotai";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Answer = ()=>{
    const [open,setOpen] = useState(false)
    const [email,] = useAtom(PeopleEmail)
    const [near_address,] =useAtom(NearAccount)
    const [seasonName,] =useAtom(SeasonName)
    const [questionState,SetQuestionState ] = useState(false)
    const router = useRouter()
    const info = {
        content:"",
        content_img:"",
        content_index:"",
        content_url:"",
    }
    const [Info,setInfo] = useState(info)

    const start = async () =>{

        await axios.post("http://127.0.0.1:7001/api/near/add_users_record",{
            email,
            near_address,
            season:seasonName,
            content:Info.content,
            content_index:Info.content_index,
        }) .then(function (response) {

            window.location.href = `/answer/questions/${Info.content_index}/${Info.content}`
        })
            .catch(function (error) {
                alert("网络错误")
            });
    }

    useEffect(()=>{
        if (router.isReady){
            const content = router.query.slug[0]
            console.log(router.query.slug[0])
            const fetchUserBounty = async (content) => {
                const data = await axios.get(`http://127.0.0.1:7001/api/near/query/content`,{
                    params:{
                        season:seasonName,
                        content
                    }
                })
                const info = {
                    content:data.data.content,
                    content_img:data.data.content_img,
                    content_index:data.data.content_index,
                    content_url:data.data.content_url,
                }
                setInfo(info)
                const result = await axios.get("http://127.0.0.1:7001/api/near/query/questions_number",{
                    params:{
                        season:seasonName,
                        email,
                        content:router.query.slug[0],
                        content_index:router.query.slug[1],
                    }
                })
                if(result.data){
                    SetQuestionState(false)
                }else {
                    SetQuestionState(true)
                }

            }
            fetchUserBounty(content)

        }
    },[router.isReady])
    return (
        <div className="relative ">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984844299080437810/c2343640971ac38f.png"
                    alt="People working on laptops"
                />
            </div>
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}}>
                        <img className="w-8 ml-5 -mt-8" src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </button>
                    <div className="text-2xl pt-12 font-semibold text-white">
                        {Info.content}
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative  py-10 px-4 h-screen pt-40 mx-auto ">
                    <Link href={Info.content_url} >
                        <a className=" justify-center py-32 text-blue-400" target="_blank">
                            <img className="rounded-2xl" src={Info.content_img} alt=""/>
                        </a>
                    </Link>
                    <div className={classNames(questionState?"flex justify-center items-center mt-10":"hidden")}>
                        <button onClick={()=>{setOpen(true)}}  className="py-1.5 px-8 w-6/12  border  rounded-full bg-blue-300 text-white">
                            Start
                        </button>
                    </div>
                    <div className={classNames(questionState?"hidden":"flex justify-center items-center   mt-10")}>
                        <img className="w-72" src="https://cdn.discordapp.com/attachments/876498266550853642/984844299344707634/61bc17b47fb7e382.png" alt=""/>
                    </div>
                </div>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto "  onClose={setOpen}>
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
                                        <div className="flex justify-end text-xl w-80"><button onClick={()=>{setOpen(false)}} >
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button></div>
                                        <div className=" text-center mt-2 ">
                                            <div className="font-semibold">
                                                Are you sure the inspection is done?
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <div className="flex justify-between">
                                            <button
                                                onClick={()=>{setOpen(false)}}
                                                type="button"
                                                className="w-36 flex mt-5  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white "
                                            >
                                                Cancel
                                            </button>
                                            <button onClick={start}>
                                                <div className="w-36 flex mt-5  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white ">
                                                    Start
                                                </div>
                                            </button>
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
export default Answer

