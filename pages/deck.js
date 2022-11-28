import { QuestionGenerator } from "../components/QuestionGenerator";
import CardList from "../components/CardList";
import CheckoutForm from "../components/CheckoutForm";
import { CardCounter } from "../components/CardCounter";
import { Pattern2 } from "../components/Pattern2";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <Pattern2 />

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 ">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
              <CheckoutForm />
              <CardCounter />
              <QuestionGenerator />
            </div>
            <CardList />
          </div>
        </main>
      </div>
    </div>
  );
}
