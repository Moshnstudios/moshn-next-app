import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black px-6">
      <Link
        href="/contact"
        className="glass mt-10 rounded-3xl p-10 text-center text-3xl tracking-tighter text-white duration-300 ease-in-out hover:scale-105 hover:opacity-85"
      >
        Get Your Brand In Moshn
      </Link>
    </section>
  );
}
