import Projects from "@/components/Projects";
import Categories from "@/components/Categories";
import { type } from "os";

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
      <h1>Load More</h1>
    </section>
  );
};

export default Home;
