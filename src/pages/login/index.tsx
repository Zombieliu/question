import React, {useEffect, useState} from 'react'
import {useAtom} from "jotai";
import {HiddenReciprocal, NearAccount, PeopleEmail} from "../../jotai";
import axios from "axios";
const Login = () =>{
    const[email,setEmail] = useAtom(PeopleEmail)
    //Open waiting time 10s
    const [hidden,setHidden] = useState(false)
    const [time,setTime] = useState(0)
    const [near_address,setNear_hex_account] = useAtom(NearAccount)
    useEffect(() => {
        setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }else {
                setHidden(false)
            }
        }, 1000);
    }, [time]);

    //get verification code

    const send = async () =>{
        const Email = (document.getElementById("email") as HTMLInputElement).value
        await axios.post("http://127.0.0.1:7001/api/email/send",{
            email:Email
        })
            .then(function (response) {
                countdown(10)
            })
            .catch(function (error) {
                alert("请检查邮箱")
            });

    }

    //Disable clicks

    const countdown = (e)=>{
            setHidden(true)
            setTime(e)
        }

    const login = async () =>{
        const code = (document.getElementById("code") as HTMLInputElement).value
        const Email = (document.getElementById("email") as HTMLInputElement).value.toString()
        const data = await axios.get("http://127.0.0.1:7001/api/email/check_code",{
            params:{
                email:Email,
                code:code
           }
        })
            .then(function (response) {
            console.log(response.data)
                if( response.data == "no code"){
                    alert("请输入正确的验证码")
                }else {
                    if(response.data.length == 0){

                        // new account

                        setEmail(Email)
                        console.log(email)
                        window.location.replace('/login/activation')
                    }else {

                        //have an account

                        console.log("New address")
                        console.log(response.data[0].near_address)
                        setEmail(Email)
                        setNear_hex_account(response.data[0].near_address)
                        window.location.replace('/main')
                    }
                }
        })
            .catch(function (error) {
                alert("网络错误")
            });

    }

    return (
        <div className="relative ">
            <div className="absolute inset-x-0 bottom-0    " />
            <div className="absolute inset-0">
                <img
                    className="h-screen w-full mx-auto"
                    src="https://cdn.discordapp.com/attachments/876498266550853642/984032771808854016/Login.png"
                />
                </div>
            <div className=" mx-auto  ">
                <div className="fixed z-20 inset-x-0 flex justify-between">
                    <button onClick={()=>{window.history.back()}}>
                        <img className="w-8 ml-5 " src="https://cdn.discordapp.com/attachments/876498266550853642/984029778149523466/Login.png" alt=""/>
                    </button>
                </div>
                <div className="max-w-7xl relative px-12 py-16 h-screen  sm:px-6  mx-auto ">
                    <div className="mt-36 ">
                        <div className="flex justify-between items-center">
                            <div>
                                <input type="text"
                                       className="  text-xs md:text-sm   rounded-lg p-2 py-4 w-full border-gray-700 border   focus:border-blue-500 transition duration-300  outline-none"
                                       placeholder="Email address"
                                       id="email"
                                />
                            </div>
                            <div>
                                <button onClick={send} className={hidden?"hidden":""}>
                                    <div className="w-24 rounded-lg px-5 py-3 bg-white">
                                        Spend
                                    </div></button>
                                <button className={hidden?" rounded-lg px-5 py-3 bg-white":"hidden"}>
                                    Resend {time} s
                                    </button>
                            </div>
                        </div>
                        <div>
                            <div className="mt-24">
                                <input type="text"
                                       className="  text-xs md:text-sm   rounded-lg p-2 py-4  border-gray-700 border   focus:border-blue-600 transition duration-300  outline-none"
                                       placeholder="Email  code"
                                       id="code"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-32">
                            <button onClick={login}  className="">
                                <img className="w-32" src="https://cdn.discordapp.com/attachments/876498266550853642/984032796328738826/Login.png" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
