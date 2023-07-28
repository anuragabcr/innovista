import Projects from "@/components/Projects";

const Home = () => {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <Projects />
      <h1>Load More</h1>
    </section>
  );
};

export default Home;
