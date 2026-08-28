import { getPhotographer, getAllMediasForPhotographer } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import MediaGallery from "@/components/mediaGallery";
import ContactButton from '@/components/contactButton';

type Props = {
  params: Promise<{ id: string }>;
};

const PhotographerPage = async ({ params }: Props) => {
  const { id } = await params;
  const photographer = await getPhotographer(id);
  if (!photographer) return notFound();

  const medias = await getAllMediasForPhotographer(id);


  const { name, city, country, tagline, portrait } = photographer;

  return (
    <main className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between gap-8 border-b border-[#e7ded3] pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#901C1C] m-0">{name}</h1>
          <p className="text-[#D3573C] font-semibold mt-2 mb-1">
            {city}, {country}
          </p>
          <p className="text-gray-500 m-0">{tagline}</p>
        </div>

        <ContactButton photographerName={name} />

        <Image
          src={`/${portrait}`}
          alt={name}
          width={150}
          height={150}
          priority
          className="w-[150px] h-[150px] rounded-full object-cover"
        />
      </div>

      <MediaGallery medias={medias} />
    </main>
  );
};

export default PhotographerPage;