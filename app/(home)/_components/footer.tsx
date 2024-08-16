import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <Image src="/logo.png" width="100" height="450" alt="Logo" />
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            &copy; Online Pathsala {currentYear}. All rights reserved |
            Developed by{" "}
            <a className="text-primary" href="github.com/birajparajuli">
              Biraj
            </a>{" "}
            and{" "}
            <a className="text-primary" href="">
              Aashish
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
