"use client";
import Link from "next/link";
import Lottie from "react-lottie-player";
import lottieJson from "./success.json";
import { FaRegCheckCircle } from "react-icons/fa";
const Success = () => {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center p-4">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: -90,
          zIndex: -1,
        }}
      />
      <FaRegCheckCircle color="limegreen" size={100} className="mb-4" />
      <h1 className="text-3xl sm:text-5xl mb-5 text-center font-bold">
        Congratulations!
      </h1>
      <p className="text-center mb-4">
        Your order placed successfully. We will contact you soon, thanks for
        using our services.
      </p>
      <Link href="../" className="text-green-400 underline">
        Go back to the store
      </Link>
    </div>
  );
};

export default Success;

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
