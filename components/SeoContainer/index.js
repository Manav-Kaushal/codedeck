import { app } from "@utils/config";
import Head from "next/head";
import React from "react";

export const SeoContainer = ({ title, description, keywords, noPrefix }) => {
  return (
    <Head>
      <title>{!noPrefix ? title : `${app.name} | ${title}`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
};
