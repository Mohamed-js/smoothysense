import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { userSignup } from "../../helpers";
import { useRouter } from "next/router";
import { setToken } from "../../auth";

const SignUp = () => {
  const [credentials, setCredentials] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await userSignup(credentials);

    if (res.message) {
      setLoading(false);
      setToken(res.token);
      router.push("/");
      return;
    }
    setError(res.error);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[91vh]">
      <div className="flex items-center h-48 relative w-full">
        <Link href="/">
          <Image
            alt={"SmoothySense"}
            className="rounded-lg max-h-28 object-contain sm:max-h-none mb-10"
            src="/logoo2.png"
            fill
          />
        </Link>
      </div>
      <h1 className="text-center text-4xl font-bold mb-3 text-green-500">
        SignUp
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-3 rounded border border-gray-400 m-4"
      >
        {error && (
          <h2 className="text-base text-red-700 bg-red-200 outline outline-red-700 outline-1 p-3 rounded mb-2 capitalize">
            {error}
          </h2>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="p-2 border border-gray-300 rounded mt-1 mb-4 w-full"
          name="email"
          placeholder="user@example.com"
          required
          onChange={(e) => {
            setCredentials((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="p-2 border border-gray-300 rounded mt-1 mb-4 w-full"
          name="password"
          placeholder="******"
          minLength={6}
          required
          onChange={(e) => {
            setCredentials((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />

        <div className="flex justify-center">
          {loading && (
            <input
              disabled
              type="submit"
              className="p-1 px-3 bg-gray-400 text-black rounded cursor-pointer"
              value="SignUp"
            />
          )}
          {!loading && (
            <input
              type="submit"
              className="p-1 px-3 bg-green-400 text-white rounded cursor-pointer"
              value="SignUp"
            />
          )}
        </div>
        <br />
        <Link href="/login" className="underline">
          <small>Already have account?</small> | Login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
