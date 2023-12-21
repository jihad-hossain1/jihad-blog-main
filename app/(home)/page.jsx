import BlogArticles from "@/components/BlogArticles/BlogArticles";
import Container from "@/components/Container/Container";
import OneBlogItem from "@/components/OneBlogItem/OneBlogItem";
import CV from "@/components/SideBar/CV";
import CategoryList from "@/components/SideBar/CategoryList";
import LastProject from "@/components/SideBar/LastProject";
import { getResume } from "@/utils/fetchResume";

const Home = async () => {
  const { resumes } = await getResume();
  const lastElem = await resumes?.at(-1);
  // console.log(lastElem);
  return (
    <Container>
      <div className="min-h-full pb-3">
        <div className="px-2 md:px-6">
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className=" col-span-2  ">
              <OneBlogItem />
            </div>
            <div className="">
              <aside className=" space-y-4">
                <CV lastElem={lastElem?.link} />
                <CategoryList />
                <LastProject />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
