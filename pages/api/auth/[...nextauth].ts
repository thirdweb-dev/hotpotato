import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// eslint-disable-next-line new-cap
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // eslint-disable-next-line new-cap
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY,
      clientSecret: process.env.TWITTER_API_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    signIn: async (ctx) => {
      console.log("*** ctx account", ctx.account);

      return new Promise((resolve) => {
        return resolve(true);
      });
    },
  },
});
