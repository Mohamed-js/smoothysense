"use client";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    question: "ايه طبيعة نوع شعرك؟",
    answers: [
      { value: "curly", body: "كيرلي بطبيعته", image: "/curly.jpg" },
      { value: "wavy", body: "مموج بطبيعته", image: "/wavy.jpg" },
      { value: "straight", body: "مفرود بطبيعته", image: "/straight.jpeg" },
    ],
  },
  {
    id: 2,
    question: "مسامية شعرك عالية ولا منخفضة؟",
    answers: [
      {
        value: "high porosity",
        body: "شعري عالي المسامية",
        image: "/high-porus.jpg",
      },
      {
        value: "low porosity",
        body: "شعري منخفض المسامية",
        image: "/low-porus.jpg",
      },
    ],
    refer: {
      link: "https://www.webteb.com/articles/%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1-%D9%85%D8%B3%D8%A7%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%B4%D8%B9%D8%B1_34820",
      body: "اضغطي هنا لو مش عارفة مسامية شعرك...",
    },
  },
  {
    id: 3,
    question: "فروة راسك دهنية ولا جافة؟",
    answers: [
      { value: "oily scalp", body: "فروة راسي دهنية" },
      { value: "dry scalp", body: "فروة راسي جافة" },
    ],
  },
  {
    id: 4,
    question: "بتعاني من مشكلة هيشان الشعر؟",
    answers: [
      { value: "fizzy hair", body: "أيوة شعري بيهيش", image: "/fizzy.jpeg" },
      {
        value: "not fizzy hair",
        body: "لا شعري مش بيهيش",
        image: "/straight.jpeg",
      },
    ],
  },
  {
    id: 5,
    question: "شعرك تالف أو متضرر من الفرد أو الصبغات؟",
    answers: [
      { value: "damaged", body: "أيوة شعري تالف", image: "/damaged.webp" },
      {
        value: "not damaged",
        body: "لا شعري مش تالف",
        image: "/straight.jpeg",
      },
    ],
  },
  {
    id: 6,
    question: "بتعاني من مشكلة القشرة؟",
    answers: [
      { value: "dandruff", body: "أيوة عندي قشرة كتير في شعري" },
      { value: "no dandruff", body: "لا مش بعاني منها" },
    ],
  },
  {
    id: 7,
    question: "شعرك بيجف وينشف وبيحتاج ترطيب؟",
    answers: [
      {
        value: "dry",
        body: "أيوة بعاني من مشكلة الجفاف في الشعر",
        image: "/dry.webp",
      },
      {
        value: "not dry",
        body: "لا مش بعاني من المشكلة دي",
        image: "/straight.jpeg",
      },
    ],
  },
  {
    id: 8,
    question: "بتعاني من تساقط الشعر أو عاوزة تزودي كثافة شعرك؟",
    answers: [
      { value: "hairloss", body: "أيوة" },
      { value: "no hairloss", body: "لا" },
    ],
  },
  {
    id: 9,
    question: "عندك مشكلة في استخدام منتجات ال ليف ان الللي بتفضل على الشعر؟",
    answers: [
      {
        value: "leave in",
        body: "معنديش مشكلة طالما ريحته حلوة والمنتج من بيلزق ويضايقني",
      },
      { value: "no leave in", body: "لا مش بحب أسيب حاجة على شعري" },
    ],
  },
];

const Hair = () => {
  const [userAnswers, setUserAnswers] = useState({});
  return (
    <>
      <h1 className="text-center pt-4">اختبار الشعر من</h1>
      <h1 className="text-center pb-4 text-green-600 text-xl">SmoothySense</h1>
      <div className="multistep-container flex flex-col" dir="rtl">
        <br />
        {steps.map((step) => (
          <Question
            key={step.id}
            question={step.question}
            answers={step.answers}
            stepId={step.id}
            setUserAnswers={setUserAnswers}
            userAnswers={userAnswers}
            refer={step.refer}
          />
        ))}

        <button
          className="bg-green-600 text-white p-4"
          onClick={() => prompt(Object.values(userAnswers).join("\n"))}
        >
          عرض النتايج
        </button>
      </div>
    </>
  );
};

export default Hair;

const Question = ({
  question,
  answers,
  stepId,
  setUserAnswers,
  userAnswers,
  refer,
}) => {
  return (
    <div className="p-4 border-t-2">
      <h2 className="p-2">{question}</h2>
      <div className="grid grid-cols-3 gap-3 w-full">
        {answers.map((answer) => (
          <Answer
            key={answer.body}
            stepId={stepId}
            body={answer.body}
            image={answer.image}
            value={answer.value}
            setUserAnswers={setUserAnswers}
            userAnswers={userAnswers}
          />
        ))}
      </div>
      {refer && (
        <a
          className="text-green-400 mt-2 block"
          href={refer.link}
          target="_blank"
        >
          <small>{refer.body}</small>
        </a>
      )}
    </div>
  );
};

const Answer = ({
  stepId,
  body,
  image,
  value,
  setUserAnswers,
  userAnswers,
}) => {
  let baseBath = "";
  useEffect(() => {
    baseBath =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
  }, [baseBath]);

  const handleClick = () => {
    setUserAnswers({
      ...userAnswers,
      [stepId]: value,
    });
  };
  const active = userAnswers[stepId] == value ? true : false;
  return (
    <>
      <div
        className={`flex flex-col cursor-pointer relative items-center rounded-lg overflow-hidden bg-orange-100 ${
          active ? "border-green-400 border-4" : "border-gray-200 border"
        }`}
        onClick={handleClick}
      >
        {image && (
          <img src={`${baseBath}${image}`} className="object-cover h-36" />
        )}

        <h2 className="p-3 text-sm sm:text-base">{body}</h2>
      </div>
    </>
  );
};
