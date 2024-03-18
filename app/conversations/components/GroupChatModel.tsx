"use client";

import Button from "@/app/components/Button";
import Model from "@/app/components/Model";
import Input from "@/app/components/input/Input";
import Select from "@/app/components/input/Select";
import { User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModelProps{
    users:User[],
    isOpen?:boolean,
    onClose:()=>void
}
const GroupChatModel:React.FC<GroupChatModelProps>=({
    users,
    isOpen,
    onClose
})=>{ 

    const router=useRouter();
    const [isLoading,setIsLoading]=useState(false);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:"",
            members:[]
        }
    })

    const members=watch("members");
    // console.log(members)

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios.post("/api/conversations",{
            ...data,
            isGroup:true
        })
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(()=>{
            toast.error("Something went wrong")
        })
        .finally(()=>setIsLoading(false))
    }

    return(
        <Model
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                        ">
                            Create a group chat
                        </h2>
                        <p className="
                            mt-1
                            text-sm
                            leading-6
                            text-gray-600
                        ">
                            Create a chat with more than 2 people
                        </p>
                        <div className="
                        mt-10
                        flex
                        flex-col
                        gap-y-8
                        ">
                            <Input 
                                register={register}
                                label="Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select 
                            disabled={isLoading}
                            label="Members"
                            options={
                                users.map((user)=>({
                                    value:user.id,
                                    label:user.name
                                }))
                            }
                            onChange={(value)=>(
                                setValue("members",value,{shouldValidate:true})
                                // console.log( value )
                                )
                            }
                            value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="
                    mt-6
                    flex
                    items-center
                    justify-end
                    gap-x-6
                ">
                    <Button 
                    disabled={isLoading}
                    onClick={onClose}
                    type="button"
                    secondary
                    >
                        Cancel
                    </Button>
                    <Button 
                    disabled={isLoading}
                    type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>            
        </Model>
    )
}

export default GroupChatModel;