"use client"

import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { Center } from "./centre";

import { useState } from "react";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <div className="max-w-sm mx-auto mt-10 p-6 bg-[#857b9ca4] rounded-2xl shadow-2xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Send Money</h2>
                <div className="text-lg text-red-500 mb-6 text-center">{message}</div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" placeholder="Enter number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            setNumber(e.target.value);
                        }} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input type="number" placeholder="Enter amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>{
                            setAmount(e.target.value);
                        }} />
                </div>

                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    onClick={async () => {
                        await p2pTransfer(number, Number(amount)*100).then((res) => {
                            if (res && res.message) {
                                setMessage(res.message);
                            }
                    })}}>
                    Send
                </button>
            </div>

        </Center>
    </div>
}