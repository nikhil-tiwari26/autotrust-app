export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
      {message || "Something went wrong. Please try again."}
    </div>
  );
}
