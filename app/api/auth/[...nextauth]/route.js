import connectMongoDB from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import User from "@/models/user";

export const authOptions = {
  providers: [
     GoogleProvider({
      // profile(profile) {
      //   console.log("Profile Google: ", profile);

      //   let userRole = "Google User";
      //   if (profile?.email == "jihadkhan934@gmail.com") {
      //     userRole = "admin";
      //   }

      //   return {
      //     ...profile,
      //     role: userRole,
      //   };
      // },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
     }),
     CredentialsProvider({
       name: 'credentials',
       credentials: {},

       async authorize(credentials) {
         const { email, password } = credentials;

         try {
           await connectMongoDB();
           const user =  await User.findOne({email})
          
           if (!user) {
             return null;
           }

           const passwordMatch = await bcrypt.compare(password, user.password);

           if (!passwordMatch) {
             return null;
           }
           return user;
         } catch (error) {
          console.log('error: ',error);
         }
       }
    })
   ],
   session: {
     strategy: 'jwt'
   },
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
     signIn: '/login'
   } ,
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
     },
    //   async jwt({ token, user }) {
    //   if (user) token.role = user.role;
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (session?.user) session.user.role = token.role;
    //   return session;
    // },
   }
    
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}