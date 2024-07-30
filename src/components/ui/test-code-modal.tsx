import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

interface TestCodeModalProps {
  handleModal: (showModal: boolean) => void;
  showModal: boolean;
  handleLogin: () => void;
  loggedIn: boolean;
}

const TestCodeModal: React.FC<TestCodeModalProps> = ({
  handleModal,
  showModal,
  handleLogin,
  loggedIn,
}) => {
  const handleClick = () => {
    handleModal(showModal);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-background p-8 rounded-md shadow-md w-full max-w-md">
          <SignedOut>
            <SignInButton>
              <button>Sign in with Clerk</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <h2 className="text-2xl font-bold mb-4">Test Your Code</h2>
            {!loggedIn ? (
              <form onSubmit={handleLogin}>{/* Login form fields ... */}</form>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4">Coding Quiz</h3>
                <p className="mb-4">
                  Test your coding skills with our multiple-choice quiz. Good
                  luck!
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
              onClick={handleClick}
            >
              <i className="fas fa-times" />
            </button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default TestCodeModal;
