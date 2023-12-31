import * as prismic from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const FlagIcon = ({ lang }) => {
  const code = lang.substring(3).toLowerCase();

  return <span className={`fi fi-${code}`} />;
};

const localeLabels = {
  "en-us": "EN",
  "cs-cz": "CS",
  "fr-fr": "FR",
};

export function Header({ locales = [], navigation, settings }) {
  const [isOpen, setOpenState] = useState(false);
  const router = useRouter();
  console.log(navigation);
  return (
    <nav class="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-glass-600 backdrop-blur-3xl">
      <div
        onClick={() => {
          setOpenState(!isOpen);
        }}
        className={`${
          !isOpen && "hidden"
        } absolute -z-10 h-screen w-screen backdrop-blur-md md:hidden`}
      />
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between  p-4">
        <PrismicNextLink href="/">
          {prismic.isFilled.image(settings.data.logo) && (
            <PrismicNextImage field={settings.data.logo} />
          )}
        </PrismicNextLink>
        <div class="flex md:order-2">
          <PrismicNextLink field={navigation.data.button_link}>
            <Button>
              <PrismicRichText field={navigation.data.button_text} />
            </Button>
          </PrismicNextLink>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => {
              setOpenState(!isOpen);
            }}
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class={`${
            !isOpen && "hidden"
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul class="mt-4 flex flex-col rounded-lg   p-4 font-medium   md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 ">
            {navigation.data?.links.map((item) => {
              return (
                <li
                  key={prismic.asText(item.label)}
                  className="font-semibold tracking-tight text-slate-800"
                >
                  <PrismicNextLink
                    className={`block rounded py-2 pl-3 pr-4 ${
                      router.asPath === prismic.asLink(item.link)
                        ? "text-orange-700"
                        : "text-gray-900"
                    } hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-orange-500`}
                    field={item.link}
                  >
                    <PrismicText field={item.label} />
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap gap-3">
            <ul className="ml-8 flex flex-wrap gap-3">
              {locales.map((locale) => {
                if (locale.lang === settings.lang) return null;
                return (
                  <li key={locale.lang} className="first:font-semibold">
                    <PrismicNextLink
                      href={locale.url}
                      locale={locale.lang}
                      aria-label={`Change language to ${locale.lang_name}`}
                    >
                      <span className="sr-only">{locale.lang}</span>
                      <FlagIcon lang={locale.lang} />
                      {/* {localeLabels[locale.lang] || locale.lang} */}
                    </PrismicNextLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
