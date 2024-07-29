import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => (
  <footer className="bg-muted py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Image
            src="/placeholder.svg"
            alt="Code Tee"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="text-lg font-bold">Code Tee</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <i className="fas fa-globe" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Footer links ... */}
      </div>
    </div>
  </footer>
);

export default Footer;
