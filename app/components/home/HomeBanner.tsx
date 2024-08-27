import Image from "next/image";
const HomeBanner = () => {
  return (
    <div className="lg:flex items-center px-4 py-11 bg-gradient-to-r from-sky-500 to-sky-700  text-white">
      <div className="lg:flex-1 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold">Summer Sale!</h1>
        <p className="mt-2 mb-1 sm:mt-4 sm:mb-3 text-lg sm:text-xl">
          Enjoy discounts on selected items
        </p>
        <p className="text-3xl sm:text-5xl font-bold text-yellow-400 ">
          GET 50% OFF
        </p>
      </div>
      <div className="lg:flex-1 max-lg:mt-6">
        <Image
          src={"/banner-image.webp"}
          alt="Banner"
          width={360}
          height={360}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
