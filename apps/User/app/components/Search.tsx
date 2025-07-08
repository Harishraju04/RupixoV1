"use client"

import { useRef, useState } from "react"
import searchHandler from "../lib/searchHandler";
import { clear } from "console";

export default function Searchbar() {
  const [results, setResults] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout|null>(null);

  const debouncer = async(value:string)=>{
    if(timerRef.current){
        clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(()=>{
        handleonChange(value);
    },500);
  };

  const handleonChange = async (value: string) => {
    const res = await searchHandler(value);
    
    if (!res || !res.res || res.res.length === 0) {
      setResults([]);
      return;
    }

    setResults(res.res); // ✅ correctly update with the array only
  };

  return (
    <div className="p-4">
      <input
        onChange={(e)=>{
            debouncer(e.target.value);
        }}
        type="text"
        className="border border-red-200 bg-slate-900 text-white p-2 rounded"
        placeholder="Enter mobile number"
      />

      <div className="mt-4 space-y-2">
        {results.map((user, index) => (
          <div key={index} className="p-2 bg-zinc-800 text-white rounded-lg">
            <p className="text-red-50"><strong>Name:</strong> {user.username}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
