"use client";

import Card from "@repo/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { P2PhistoryHandler } from "../lib/P2PhistoryHandler";

export default function P2PhistoryComponent({ initialHistory }: { initialHistory: any[] }) {
  const { data: session } = useSession();
  const [history, setHistory] = useState(initialHistory);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (loading || !hasMore) return;
    startTransition(async () => {
      const res = await P2PhistoryHandler(cursor ?? undefined);
      setHistory(prev => [...prev, ...res.transactions]);
      setCursor(res.nextCursor);
      setHasMore(!!res.nextCursor);
    });
  };

  if (!history.length) {
    return (
      <Card title="Recent P2P Transfers">
        <div className="text-center text-zinc-400 py-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent P2P Transfers">
      <div className="pt-2 space-y-4">
        {history.map((val) => {
          const isSent = val.from === session?.user?.id;
          return (
            <div
              key={val.id}
              className="flex justify-between items-center border-b border-zinc-700 pb-2 text-zinc-200"
            >
              <div>
                <div className="text-sm">
                  {isSent ? "Sent" : "Received"} ₹{val.amount / 100}
                </div>
                <div className="text-zinc-500 text-xs">
                  {new Date(val.time).toLocaleString()}
                </div>
              </div>

              <div className="text-xs px-2 py-1 rounded-md bg-zinc-800 border border-zinc-600">
                {isSent ? `To: ${val.to}` : `From: ${val.from}`}
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="pt-4 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-zinc-700 text-zinc-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </Card>
  );
}
