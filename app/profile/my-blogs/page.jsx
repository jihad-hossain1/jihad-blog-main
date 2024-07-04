import { getCookieData } from "@/utils/fetch/session/fetchSession";
import { fetchUserBlogs } from "@/utils/fetch/user/userblogs";
import React from "react";
import MyBlogs from "./_compo/MyBlogs";

const MyBlogsPage = async () => {
  const sessionData = await getCookieData();
  const blogs = await fetchUserBlogs(sessionData?.sub);

  return (
    <div>
      <MyBlogs blogs={blogs?.blogs} />
    </div>
  );
};

export default MyBlogsPage;
