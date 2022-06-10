import React, {useState} from 'react'
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import {Tab} from "@headlessui/react";
import {useAtom} from "jotai";
import {PeopleAvatar, PeopleName} from "../../jotai";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Week = () =>{
    const [Avatar,]=useAtom(PeopleAvatar)
    const [name,] = useAtom(PeopleName)
    const week =[
        {
         rank:"1",
         avatar:Avatar,
         name:"Henry",
         data:"36",
        },
        {
            rank:"2",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"3",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"4",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"5",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"6",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"7",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },{
            rank:"8",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"9",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"10",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"11",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },



    ]
    return(
        <>
            <div className="border border-gray-500  h-xl overflow-auto ">
                <div className="flex p-1.5 px-4  bg-gray-200 justify-between items-center">
                    <div className="w-8">
                        3rd
                    </div>
                        <img className="rounded-full w-10" src={Avatar} alt=""/>
                    <div className="w-20 mr-2">
                        <div className="text-center truncate">
                            {name}
                        </div>
                    </div>
                    <div>
                        24
                    </div>
                </div>
                {week.map(item=>(
                    <div key={item.rank} className="flex p-1 px-4 justify-between border-b   border-gray-500 items-center">
                        <div className="w-8">
                            {item.rank}
                        </div>
                        <img className="rounded-full w-10" src={item.avatar} alt=""/>
                        <div className="w-20 mr-2">
                            <div className="text-center truncate">
                                {item.name}
                            </div>
                        </div>
                        <div>
                            {item.data}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
const Month = () => {
    const [Avatar,]=useAtom(PeopleAvatar)
    const [name,] = useAtom(PeopleName)
    const month =[
        {
            rank:"1",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"2",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"3",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"4",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"5",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },


    ]
    return(
        <>
            <div className="border border-gray-500  h-xl overflow-auto ">
                <div className="flex p-1.5 px-4  bg-gray-200 justify-between items-center">
                    <div className="w-8">
                        3rd
                    </div>
                    <img className="rounded-full w-10" src={Avatar} alt=""/>
                    <div className="w-20 mr-2">
                        <div className="text-center truncate">
                            {name}
                        </div>
                    </div>
                    <div>
                        24
                    </div>
                </div>
                {month.map(item=>(
                    <div key={item.rank} className="flex p-1 px-4 justify-between border-b   border-gray-500 items-center">
                        <div className="w-8">
                            {item.rank}
                        </div>
                        <img className="rounded-full w-10" src={item.avatar} alt=""/>
                        <div className="w-20 mr-2">
                            <div className="text-center truncate">
                                {item.name}
                            </div>
                        </div>
                        <div>
                            {item.data}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
const Season = () => {
    const [Avatar,]=useAtom(PeopleAvatar)
    const [name,] = useAtom(PeopleName)
    const season =[
        {
            rank:"1",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"2",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"3",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"4",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"5",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },
        {
            rank:"6",
            avatar:Avatar,
            name:"Henry",
            data:"36",
        },


    ]
    return(
        <>
            <div className="border border-gray-500  h-xl overflow-auto ">
                <div className="flex p-1.5 px-4  bg-gray-200 justify-between items-center">
                    <div className="w-8">
                        3rd
                    </div>
                    <img className="rounded-full w-10" src={Avatar} alt=""/>
                    <div className="w-20 mr-2">
                        <div className="text-center truncate">
                            {name}
                        </div>
                    </div>
                    <div>
                        24
                    </div>
                </div>
                {season.map(item=>(
                    <div key={item.rank} className="flex p-1 px-4 justify-between border-b   border-gray-500 items-center">
                        <div className="w-8">
                            {item.rank}
                        </div>
                        <img className="rounded-full w-10" src={item.avatar} alt=""/>
                        <div className="w-20 mr-2">
                            <div className="text-center truncate">
                                {item.name}
                            </div>
                        </div>
                        <div>
                            {item.data}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


const Leaderboard = () =>{
    //title type
    const [title] = useState({
        Week: [],
        Month: [],
        Season:[],
    })
    return (
        <div className="relative ">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className=" mx-auto  ">
                <Header/>
                <div className="max-w-7xl relative px-8 pt-20 py-10   mx-auto ">
                    <div>
                        <Tab.Group>
                            <Tab.List className=" p-1  bg-blue-900/20 rounded-xl mx-auto">
                                {/*list*/}
                                <div className="rounded-full overflow-hidden border border-gray-500 flex items-center">
                                    {Object.keys(title).map((category) => (
                                        <Tab
                                            key={category}
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full  py-1.5  text-sm  font-medium  ',
                                                    selected ? 'bg-gray-500 text-gray-50' : '')}>
                                            {category}
                                        </Tab>
                                    ))}
                                </div>
                            </Tab.List>
                            {/*content*/}
                            <Tab.Panels className="mt-5 ">
                                <Tab.Panel className={classNames(
                                    '')}>
                                    <Week/>
                                </Tab.Panel>
                                <Tab.Panel
                                    className={classNames('')}>
                                    <Month/>
                                </Tab.Panel>
                                <Tab.Panel
                                    className={classNames('')}>
                                    <Season/>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
                <Navigation></Navigation>
            </div>
        </div>
    )
}

export default Leaderboard
