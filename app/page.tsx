import { deals } from "@/data/deals";
import DealsClient from "./_components/DealsClient";

export default function Home() {
  return <DealsClient allDeals={deals} />;
}
