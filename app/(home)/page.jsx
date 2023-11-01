import BlogArticles from "@/components/BlogArticles/BlogArticles";
import Container from "@/components/Container/Container";
import OneBlogItem from "@/components/OneBlogItem/OneBlogItem";
import CV from "@/components/SideBar/CV";
import CategoryList from "@/components/SideBar/CategoryList";
import LastProject from "@/components/SideBar/LastProject";
import TopicsList from "@/components/TopicsList";



const Home = () => {
  return (
    <Container>
      <div className="min-h-full pb-3">
        <BlogArticles />
        {/* <TopicsList /> */}
        <div className="px-2 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="col-span-2  ">
              <OneBlogItem />
              {/* <div className="flex justify-end">
                <PaginationContent />
              </div> */}
            </div>
            <aside className="space-y-4">
              <CV />
              <CategoryList />
              <LastProject />
            </aside>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
