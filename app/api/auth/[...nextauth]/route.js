import connectMongoDB from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      profile: async (profile) => {
        await connectMongoDB();
        const foundUser = await User.findOne({ email: profile?.email });

        if (!foundUser) {
          const savedOnDatabase = new User({
            name: profile?.name,
            image: profile?.picture,
            email: profile?.email,
          });
          await savedOnDatabase.save();
          return {
            ...profile,
            id: _new?._id,
            role: _new?.role,
            email: _new?.email,
          };
        }

        return {
          ...profile,
          id: foundUser?._id,
          role: foundUser?.role,
          email: foundUser?.email,
        };
      },
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
          const _user = await User.findOne({ email });
          console.log(_user);
          if (!_user) {
            return null;
          }
          const user = {
            id: _user?._id,
            email: _user?.email,
            name: _user.name,
            role: _user?.role,
          };
          if (_user) {
            const passwordsMatch = await bcrypt.compare(
              password,
              _user?.password
            );

            if (!passwordsMatch) {
              return null;
            }
            // delete _user?.password;
            return user;
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Use a type guard to check if the 'role' property exists on 'user'
        const role = "role" in user ? user?.role : "defaultRole";
        token.role = role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        // Ensure 'role' is of type 'Role' by casting it
        const role = "role" in token ? token.role : "defaultRole";
        session.user.role = role;
        session.user.id = token?.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}