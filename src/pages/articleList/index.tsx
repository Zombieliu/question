import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {PetStyle} from "../../constant";
import axios from "axios";
import {useAtom} from "jotai";
import {NearAccount, PeopleEmail, SeasonName, SeasonPhase} from "../../jotai";
import {useRouter} from "next/router";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ArticleList = () =>{
    const router = useRouter()
    const [near_address,] =useAtom(NearAccount)
    const [seasonName,] =useAtom(SeasonName)
    const [season_phase,] = useAtom(SeasonPhase)
    const [email,] = useAtom(PeopleEmail)
    const [list,setList] = useState([])
    useEffect(()=>{
        if(router.isReady){
            const fetchUserBounty = async () => {

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
                console.log(near_address)
                console.log(seasonName)
                const data= await axios.get("http://127.0.0.1:7001/api/near/query/contentList",
                    {
                        params:{season:seasonName}
                    })
                setList(data.data)
                console.log(data)
            }
            fetchUserBounty()
        }
    },[router.isReady])
    return (
        <div className="relative">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984843756513673286/e1ba6b7943c6586f.png"
                     
                />
            </div>

            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}}>
                        <img className="w-8 ml-5 " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </button>
                    <div className="text-xl text-white font-semibold">
                        文章列表
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-4  py-10  mx-auto ">
                    <div className="grid grid-cols-1 gap-3 mt-12">
                        {list.map((item=>(
                            <Link href={`/answer/${item.content}/${item.content_index}`}  key={item.content_index} >
                                <a className="h-56 rounded-2xl bg-white text-center border border-gray-500 border-2 border-b-4 border-r-4 transform transition duration-300 hover:-translate-y-2 hover:border-blue-600">
                                    <div className=" px-4  pb-2 border-gray-500">
                                        <div className="flex justify-center items-center">
                                            <div className={'rounded-b-xl w-5/6 '}>
                                                {item.content}
                                            </div>
                                        </div>
                                        <div className="h-48">
                                            <img className="mx-auto w-full h-full  py-3" src={item.content_img} alt=""/>
                                        </div>
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

export default ArticleList
