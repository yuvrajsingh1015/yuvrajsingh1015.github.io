export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-4xl px-6 py-8 font-mono text-xs text-zinc-500">
        © {new Date().getFullYear()} Yuvraj Singh
      </div>
    </footer>
  );
}