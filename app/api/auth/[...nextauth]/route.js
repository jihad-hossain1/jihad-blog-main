import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

 const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
   ],
   callbacks: {
     async signIn({ user, account }) {
       const { name, email,image } = user;
       if (account.provider === 'google') {
         try {
           await connectMongoDB();
           const userAlreadyExists = await User.findOne({email})
           if (!userAlreadyExists) {
            const res = await fetch(`${process.env.NEXT_BASE_URL}/api/user`, {
             method: 'POST',
             headers: {
               "Content-Type": "application/json"
             },
             body: JSON.stringify({ name, email,image })
            })
             if (res.ok) {
             return user;
           }
          }
           
           
         } catch (error) {
          console.log(error);
         }
       }
       return user
     }
   }
    
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}