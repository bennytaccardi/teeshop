import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CheckCircle, XCircle } from "lucide-react";

interface TestCodeModalProps {
  handleModal: (showModal: boolean) => void;
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
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["Number", "Boolean", "String", "Float"],
    correctAnswer: 3,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 1,
  },
];

const TestCodeModal: React.FC<TestCodeModalProps> = ({
  handleModal,
  showModal,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (isCorrect !== null) {
      const timer = setTimeout(() => {
        moveToNextQuestion();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect]);

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
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

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleClose = () => {
    handleModal(true);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105">
                Sign in with Clerk
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Coding Quiz
            </h2>

            {showScore ? (
              <div className="text-center">
                <p className="text-2xl mb-4 text-gray-700 dark:text-gray-300">
                  You scored{" "}
                  <span className="font-bold text-green-500">{score}</span> out
                  of <span className="font-bold">{questions.length}</span>
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleRestartQuiz}
                >
                  Restart Quiz
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1}/{questions.length}
                </p>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-102 ${
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
                            <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-500 animate-bounce" />
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
