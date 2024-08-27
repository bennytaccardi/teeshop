/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CheckCircle, XCircle } from "lucide-react";

interface TestCodeModalProps {
  handleCodingTestModal: (showModal: boolean) => void;
  handleBuyModal: (showModal: boolean) => void;
  showModal: boolean;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
  },
];

const TestCodeModal: React.FC<TestCodeModalProps> = ({
  handleCodingTestModal,
  handleBuyModal,
  showModal,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loose, setLoose] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const codeModalRef = useRef<any>();

  useEffect(() => {
    if (isCorrect !== null) {
      const timer = setTimeout(() => {
        moveToNextQuestion();
      }, 1500);
      return () => clearTimeout(timer);
    }
    document.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCorrect, codeModalRef]);

  const handleClickOutside = (e: any) => {
    if (
      !codeModalRef ||
      !codeModalRef.current ||
      !codeModalRef.current.contains(e.target)
    ) {
      handleCodingTestModal(true);
    }
  };

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    } else {
      setLoose(true);
    }
  };

  const keyDownHandler = (e: any) => {
    if (e.repeat) return;

    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  const moveToNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleBuyAction = () => {
    handleBuyModal(false);
    handleCodingTestModal(true);
  };

  const handleClose = () => {
    handleCodingTestModal(true);
    handleBuyModal(true);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md"
          ref={codeModalRef}
        >
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105">
                Sign in with Clerk
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-white">
              Coding Quiz
            </h2>

            {loose ? (
              <p className="text-center text-xl text-red-600">You lose</p>
            ) : showScore ? (
              <div className="text-center">
                <p className="text-xl sm:text-2xl mb-4 text-gray-700 dark:text-gray-300">
                  You scored{" "}
                  <span className="font-bold text-green-500">{score}</span> out
                  of <span className="font-bold">{questions.length}</span>
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleBuyAction}
                >
                  Buy your tee
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-2 sm:mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1}/{questions.length}
                </p>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-2 sm:p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-102 ${
                        selectedAnswer === index
                          ? isCorrect
                            ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                            : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                      {selectedAnswer === index && (
                        <span className="float-right">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 animate-bounce" />
                          ) : (
                            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 animate-bounce" />
                          )}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default TestCodeModal;
