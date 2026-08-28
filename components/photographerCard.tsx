import Image from "next/image";
import Link from "next/link";

type Photographer = {
  id: number;
  name: string;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;
};

export default function PhotographerCard({
  photographer,
  priority = false,
}: {
  photographer: Photographer;
  priority?: boolean;
}) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <article className="flex flex-col items-center text-center gap-1">
      <Link
        href={`/photographer/${id}`}
        className="flex flex-col items-center p-2 rounded-xl hover:bg-white transition-colors"
      >
        <Image
          src={`/${portrait}`}
          alt=""
          width={180}
          height={180}
          priority={priority}
          className="w-44 h-44 rounded-full object-cover mb-3"
        />
        <h2 className="text-xl font-serif text-[#D3573C] m-0">{name}</h2>
      </Link>
      <p className="text-[#901C1C] font-semibold m-0">
        {city}, {country}
      </p>
      <p className="text-gray-500 max-w-[220px] m-0">{tagline}</p>
      <p className="font-bold mt-1">{price}€/jour</p>
    </article>
  );
}