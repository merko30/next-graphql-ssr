import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/continents">Go to continents</Link>
      <br />
      <Link href="/continents-with-props">
        Go to continents with passed props
      </Link>
    </div>
  );
}
