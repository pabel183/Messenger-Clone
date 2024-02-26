import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById=async(conversationById:string)=>{
    try{

        const currentUser=await getCurrentUser();
        
        if(!currentUser?.email){
            return null;
        }
        
        const conversation=await prisma.conversation.findUnique({
            where:{
                id:conversationById
            },
            include:{
                users:true
            }
        });
        
        return conversation;
    }catch(error:any){
        return null;
    }
    
}

export default getConversationById;