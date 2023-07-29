import Projects from "@/components/Projects";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

type SearchParams = {
  category?: string;
};

type Props = {
  searchParams: SearchParams;
};

const Home = ({ searchParams: { category } }: Props) => {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <Projects category={category} />
      <LoadMore />
    </section>
  );
};

export default Home;
