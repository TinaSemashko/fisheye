import { getAllPhotographers } from "@/lib/db";
import PhotographerCard from "@/components/photographerCard";

const HomePage = async () => {
  const photographers = await getAllPhotographers();

  return (
    <main className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-serif text-[#901C1C] mb-8">
        Nos photographes
      </h1>

      <ul className="list-none m-0 p-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-10">
        {photographers.map((photographer, index) => (
          <li key={photographer.id}>
            <PhotographerCard photographer={photographer} priority={index === 0} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;