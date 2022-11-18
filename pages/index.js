import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { classNames, Input } from "../components/Input";

const LangameIcon = ({ className = "" }) => {
  return (
    <Image
      className={classNames(className)}
      src="/langame.png"
      alt="langame"
      width="48"
      height="48"
    />
  );
};
const QuestionCard = ({ className }) => {
  return (
    <div className={classNames("rounded-lg bg-white shadow-lg h-[330px] w-[232px] border-4 border-indigo-600 flex flex-col p-4 font-bold", className)}>
      <LangameIcon />
      <div className="m-auto text-center">
        What do you think about Hackers & Painters from Paul Graham?
      </div>

      <LangameIcon className="ml-auto" />
    </div>
  );
};

const Header = () => (
  <div>
    <h1 className="text-4xl leading-10 font-extrabold text-gray-900 ">
      AI-generated <br />
      card game to <br />
      enjoy with your <br />
      friends family
    </h1>
  </div>
);

const PrimaryButton = ({ children, className = "" }) => {
  return (
    <button
      type="button"
      className={classNames("inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", className)}
    >
      {children}
    </button>
  );
};
const SecondaryButton = ({ children, className = "" }) => {
  return (
    <button
      type="button"
      className={classNames('inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2', className)}
    >
      {children}
    </button>
  );
};




const GenerateQuestionButton = () => {
  return <PrimaryButton>🤖 Press to generate question about</PrimaryButton>;
};

const AddToDeckButton = () => {
  return <PrimaryButton>Add to Deck 🃏</PrimaryButton>;
};

const ScrollToDeckButton = () => {
  return <SecondaryButton>See Your Deck</SecondaryButton>;
}

const Main = () => {
  return (
    <div>
      <Input />
      <GenerateQuestionButton />
      <div className="m-auto">
        <QuestionCard className="m-auto" />
      </div>
      <div className="flex justify-between">
        <AddToDeckButton />
        <ScrollToDeckButton />
      </div>
    </div>
  );
};
const Footer = () => {
  return <div></div>;
};

export default function Home() {
  return (
    <div className="m-auto p-8 ">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
