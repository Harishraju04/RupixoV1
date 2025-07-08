export default function ButtonCard({
  title,
  onClick,
  icon,
}: {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className="relative w-40 h-40 rounded-3xl p-1 cursor-pointer group
                 bg-gradient-to-br from-purple-700 via-zinc-800 to-purple-900
                 hover:from-purple-600 hover:to-purple-800
                 transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_#a855f7]"
    >
      {/* Inner Card */}
      <div
        className="w-full h-full rounded-2xl bg-zinc-950 
                   group-hover:bg-zinc-900 transition-all duration-300
                   flex flex-col justify-between p-4"
      >
        {/* Title */}
        <div className="text-lg font-semibold text-purple-300 group-hover:text-purple-400">
          {title}
        </div>

        {/* Icon */}
        <div className="self-end text text-purple-400 group-hover:text-purple-300">
          {icon}
        </div>
      </div>

      {/* Glowing Ring */}
      <div className="absolute inset-0 rounded-3xl border-2 border-purple-500 opacity-20 group-hover:opacity-40 group-hover:animate-pulse" />
    </div>
  );
}
