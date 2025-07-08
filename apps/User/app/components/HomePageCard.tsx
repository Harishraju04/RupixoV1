"use client";

import Image from "next/image";
import ButtonCard from "./ButtonCard";
import { useRouter } from "next/navigation";

export default function HomePageCard({ username }: { username: string }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-zinc-900 text-white p-8 md:p-16">
      {/* Left Section – Welcome Text */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Welcome back,{" "}
          <span className="text-5xl font-bold text-purple-400 drop-shadow-[0_0_10px_#a855f7]">
            {username}
          </span>
        </h1>

        <p className="text-xl text-zinc-300 max-w-md">
          Pay effortlessly. Get things done.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-8">
          <div>
            <ButtonCard
              title="Add Money"
              onClick={() => router.push("/transfer")}
              icon={<AddMoneyIcon />}
            />
          </div>

          <div>
            <ButtonCard
              title="P2P Transfer"
              onClick={() => router.push("/p2pTransfers")}
              icon={<P2PIcon />}
            />
          </div>

          <div>
            <ButtonCard
              title="Transactions"
              onClick={() => router.push("/transactions")}
              icon={<TransactionsIcon />}
            />
          </div>
        </div>
      </div>

      {/* Right Section – SVG Image */}
      <div className="flex items-center justify-center">
        <Image
          src="/online-payment.svg"
          alt="Online Payment Illustration"
          width={400}
          height={400}
          className="w-full max-w-md"
          priority
        />
      </div>
    </div>
  );
}

function AddMoneyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10"
      aria-hidden="true"
      role="img"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function P2PIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10"
      aria-hidden="true"
      role="img"
    >
      <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
      aria-hidden="true"
      role="img"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
