"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: delegate } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "delegate",
  });

  const { data: owner } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "owner",
  });

  const [newDelegate, setNewDelegate] = useState("");

  const { writeContractAsync: setDelegate } = useScaffoldWriteContract("YourContract");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <div className="block text-4xl font-bold">
              <div className="inline-block relative w-10 h-10 align-bottom mr-2">
                <Image alt="Base logo" className="cursor-pointer" fill src="/Base_Symbol_Blue.svg" />
              </div>
              Scaffold-Base
            </div>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Delegate Address:</p>
            <Address address={delegate} />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Owner:</p>
            <Address address={owner} />
          </div>

          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Set New Delegate:</p>
            <AddressInput
              value={newDelegate}
              onChange={v => {
                setNewDelegate(v);
              }}
            />
          </div>
          <div className="flex justify-center items-center space-x-2 p-4">
            <button
              onClick={async () => {
                try {
                  await setDelegate({
                    functionName: "setDelegate",
                    args: [newDelegate],
                  });
                } catch (e) {
                  console.error("Error setting greeting:", e);
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Set Delegate
            </button>
          </div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
