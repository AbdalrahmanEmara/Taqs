export default function Card({ name, value, children }) {
  return (
    <div className="flex flex-1 justify-center items-center flex-col px-4 text-lg py-3 gap-2 bg-[#0E1421] rounded-lg">
      {children}
      <p>{name}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
