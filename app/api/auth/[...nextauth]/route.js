import connectMongoDB from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from 'bcryptjs';
import User from "@/models/register";
// import User from "@/models/user";

export const authOptions = {
  providers: [


     GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
     }),
     CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
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

   }
    
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}