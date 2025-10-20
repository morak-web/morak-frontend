export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full h-12 rounded-xl border-2 border-neutral-200 px-4 py-3 text-base transition-all focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 placeholder:text-neutral-400 hover:border-neutral-300 bg-white"
    />
  );
}
