export default function SearchBar({ setSearch }) {
  return (
    <input
      placeholder="Search notes..."
      className="border p-2 w-full mb-4"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}