export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-8 font-mono text-xs text-fg0">
        © {new Date().getFullYear()} Yuvraj Singh
      </div>
    </footer>
  );
}