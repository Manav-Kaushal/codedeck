import { app } from "@utils/config";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Codedeck | Best coding merchandise to buy online!</title>
        <meta
          name="description"
          content="Best coding merchandise to buy online!"
        />
        <link rel="icon" type="image/png" href="/code.png" />
      </Head>

      <main>
        <div className="w-full">
          <img
            src={`${app.cloudinaryBaseUrl}/c_fill,g_auto,h_450,w_1920/v1649599012/web/hero_banner_codedeck_nmuqok.jpg`}
            alt=""
            className="mx-auto"
          />
        </div>
      </main>
    </div>
  );
}
