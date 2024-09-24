import QuestionCall from "./QuestionCall";
import Addques from "./New";

function App() {
  return (
    <div className="flex flex-col items-center  p-6 w-full ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">LeetCode Revision</h1>
        <p className="text-lg text-gray-700 mb-6 ">
          Level up your coding skills and prepare for your next interview! by-{" "}
          <a href="https://github.com/konhito" target="_blank">
            <span className=" animate-bounce font-mono text-blue-500 font-bold text-black cursor-pointer ">
              Konhito
            </span>
          </a>
        </p>
      </div>
      <div className="w-full">
        <Addques />
      </div>
      <div className="w-full">
        <QuestionCall />
      </div>
    </div>
  );
}

export default App;
