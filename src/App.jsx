import "./App.css";
import Otp from "./components/Otp";

function App() {
  return (
    <div className="h-screen bg-blue-700 flex flex-col gap-y-10 justify-center items-center">
      <Otp number={5} />
    </div>
  );
}

export default App;
