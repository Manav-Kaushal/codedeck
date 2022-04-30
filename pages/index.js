import { SeoContainer } from "@components/SeoContainer";
import { app } from "@utils/config";
import { offers } from "@utils/Mocks/HomeData";

export default function Home() {
  return (
    <div>
      <SeoContainer
        title="Best coding merchandise to buy online!"
        description="Best coding merchandise to buy online!"
      />
      <main>
        <section className="w-full">
          <img
            src={`${app.cloudinaryBaseUrl}/c_fill,g_auto,h_645,w_1920/v1649599012/web/hero_banner_codedeck_nmuqok.jpg`}
            alt=""
            className="mx-auto min-h-[345px] object-cover"
          />
        </section>

        <section className="bg-white">
          <div className="flex flex-col border-b border-gray-200 lg:border-0">
            <div aria-label="Offers" className="order-last lg:order-first">
              <ul
                role="list"
                className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
              >
                {offers.map((offer) => (
                  <li key={offer.name} className="flex flex-col">
                    <a
                      href={offer.href}
                      className="relative flex-1 flex flex-col justify-center bg-white py-6 px-4 text-center focus:z-10"
                    >
                      <p className="text-sm text-gray-500">{offer.name}</p>
                      <p className="font-semibold text-primary">
                        {offer.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="hidden absolute w-1/2 h-full bg-primary/10 lg:block"
              />
              <div className="relative bg-[#EFEFEF] lg:bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
                  <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
                    <div className="lg:pr-16">
                      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                        <span className="text-primary">Focus</span> On Coding
                      </h1>
                      <p className="mt-4 text-xl text-gray-600">
                        All the charts, datepickers, and notifications in the
                        world can&apos;t beat checking off some items on a paper
                        card.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="inline-block bg-gray-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-gray-800 transition-200"
                        >
                          Shop
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
                <img
                  src="https://res.cloudinary.com/codedeck/image/upload/v1650357199/web/focus_on_code_bfsj7n.jpg"
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
