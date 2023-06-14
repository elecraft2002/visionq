import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { getLocales } from "@/lib/getLocales";
import { createClient } from "@/prismicio";
import { components } from "@/slices/";
import { Layout } from "@/components/Layout";
// Import Swiper React components
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/Button";
import Play from "@/assets/svg/Play";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Article from "@/components/Article";

export default function Home({
  page,
  navigation,
  settings,
  locales,
  realizace,
  reference,
}) {
  console.log("reference",reference);
  return (
    <Layout locales={locales} navigation={navigation} settings={settings}>
      <Head>
        <title>{prismic.asText(page.data.title)}</title>
      </Head>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={true}
      >
        {realizace.map((project) => {
          return (
            <SwiperSlide key={project.id}>
              <article className="grid min-h-[80vh]  grid-cols-1 grid-rows-2  bg-glass-400 sm:grid-cols-2 sm:grid-rows-1">
                <div className="items-middle m-x-3 flex h-full flex-col justify-evenly text-center">
                  <h2 className="text-3xl font-bold">Název projektu</h2>
                  <span>
                    Krátký popis projektu, proč byste ho chtěli, a bližší
                    informace...
                  </span>
                  <div className="items-middle flex justify-evenly">
                    <PrismicNextLink document={project}>
                      <Button type={"primary"}>VÍCE INFO</Button>
                    </PrismicNextLink>
                    <span className="inline-flex items-center">
                      <a className="mr-4 underline">Video</a>
                      <Play />
                    </span>
                  </div>
                </div>
                <div>
                  <figure className="h-full">
                    <PrismicNextImage
                      className="h-full w-full object-cover"
                      field={project.data.image.Big}
                    />
                  </figure>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <section className="flex flex-col items-center">
        <h2>REALIZACE</h2>
       <div  className="flex flex-wrap place-content-around w-full">
          {realizace.map((project) => {
            return <Article key={project.id} data={project} />;
          })}
       </div>
        <PrismicLink document={null}>
          <Button type={"secondary"}>DALŠÍ PROJEKTY</Button>
        </PrismicLink>
      </section> */}
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ realizace, reference }}
      />
    </Layout>
  );
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const realizace = await client.getAllByType("realizace", { lang: locale });
  const reference = await client.getAllByType("reference", { lang: locale });

  const locales = await getLocales(page, client);

  return {
    props: {
      page,
      navigation,
      settings,
      locales,
      realizace,
      reference,
    },
  };
}
