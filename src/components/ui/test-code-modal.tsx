import React from "react";

interface TestCodeModalProps {
  handleModal: () => void;
  handleLogin: () => void;
  loggedIn: boolean;
}

const TestCodeModal: React.FC<TestCodeModalProps> = ({
  handleModal,
  handleLogin,
  loggedIn,
}) => (
  <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-background p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Test Your Code</h2>
        {!loggedIn ? (
          <form onSubmit={handleLogin}>{/* Login form fields ... */}</form>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4">Coding Quiz</h3>
            <p className="mb-4">
              Test your coding skills with our multiple-choice quiz. Good luck!
            </p>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full"
              onClick={() =>
                (window.location.href = "https://example.com/coding-quiz")
              }
            >
              Start Quiz
            </button>
          </div>
        )}
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground focus:outline-none"
          onClick={handleModal}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  </div>
);

export default TestCodeModal;
