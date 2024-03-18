"use client";

import Model from "@/app/components/Model";
import Image from "next/image";

interface ImageModalProps{
    src?:string|null,
    isOpen?:boolean,
    onClose:()=>void,
}
const ImageModal:React.FC<ImageModalProps>=({
    src,
    isOpen,
    onClose
})=>{
    if(!src){
        return null;
    }

    return(
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image
                alt="Image"
                className="object-cover"
                fill
                src={src}
                />
            </div>
        </Model>
    )
}
export default ImageModal;