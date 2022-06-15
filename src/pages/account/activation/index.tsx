import React, {useState} from 'react'
import Link from "next/link";

const Activation = () =>{
    const code = [
        {
            id:"1",
            data:"3123123",
        },
        {
            id:"2",
            data:"asdasd",
        },
    ]

    const Copy = (span) => {
        const spanText = document.getElementById(span).innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand('Copy');
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        alert("Copy done")
    }
    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0">
                <img
                    className=" w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/985946248148308009/Activation_code.png"
                     
                />
            </div>
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between items-center">
                    <button onClick={()=>{window.history.back()}}>
                        <div className="  text-2xl text-gray-600 pl-5">
                            <img className="w-8  " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                        </div>
                </button>
                    <div className="text-2xl font-semibold ">
                        Activation Code
                    </div>
                    <div>
                        <div className="text-2xl text-gray-600 px-5">
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl relative px-4 pt-20 py-10   mx-auto ">
                    <div className="pt-7">
                        <div className="border border-black bg-white px-10 py-10 rounded-xl">
                            <div className="flex justify-center">
                                Availabe/Total
                            </div>
                            <div className="flex justify-center mt-5 text-3xl font-semibold">
                                <div>
                                    1
                                </div>
                                /
                                <div>
                                    2
                                </div>
                            </div>
                        </div>

                        {/*Code List*/}
                        <div className="border border-black px-10 py-5 bg-white h-lg rounded-2xl mt-10">
                            {code.map((item=>(
                                <div key={item.id} className="flex justify-between">
                                    <div className="text-sm mb-2">
                                        {item.id}
                                    </div>
                                    <div id="address" className="text-sm">
                                        {item.data}
                                    </div>
                                    <div>
                                        <button onClick={() => {Copy('address') }} className="text-gray-400 font-light flex transition duration-300">
                                            <i className="fa fa-clone mt-1 ml-2" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            )))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activation
