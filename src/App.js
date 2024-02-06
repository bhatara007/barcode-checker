import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [result, setResult] = useState(null);
  const [evenEquation, setEvenEquation] = useState("");
  const [oddEquation, setOddEquation] = useState("");
  const [barcodeDigit, setBarcodeDigit] = useState("");
  const [checkdigit, setCheckdigit] = useState("");

  const onSubmit = (data) => {
    const barcode = data.barcode;
    let even = 0;
    let odd = 0;

    setEvenEquation("");
    setOddEquation("");

    const check = parseInt(barcode.charAt(barcode.length - 1));

    for (let index = 0; index < barcode.length - 1; index++) {
      const value = parseInt(barcode.charAt(index));
      if ((index + 1) % 2 === 0) {
        even += value;
        setEvenEquation((prev) => prev + (prev === "" ? "" : " + ") + value);
      } else {
        odd += value;
        setOddEquation((prev) => prev + (prev === "" ? "" : " + ") + value);
      }
    }

    setBarcodeDigit(barcode.charAt(barcode.length - 1));

    let result = even * 3 + odd;
    let count = 0;

    while (result % 10 !== 0) {
      result++;
      count++;
    }

    setCheckdigit(count);

    if (check === count) {
      setResult("Correct!!");
    } else {
      setResult("Incorrect!!");
    }
  };

  const handleClear = () => {
    reset();
    setEvenEquation("");
    setOddEquation("");
    setBarcodeDigit("");
    setCheckdigit("");
  };

  return (
    <div className=" flex justify-center items-center flex-row min-h-screen font-mono">
      <div className=" flex flex-col border border-black p-10 rounded-md text-center shadow-lg">
        <h1 className=" text-3xl mb-4">Barcode Checker</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col space-y-4"
        >
          <div>
            <input
              type="text"
              className=" border border-black w-full"
              {...register("barcode", { required: true })}
            />
            {errors.barcode && (
              <p className=" text-red-500 text-sm">Barcode is required.</p>
            )}
          </div>
          <div className=" space-x-4">
            <button
              type="submit"
              className=" bg-blue-400 px-4 py-1 rounded-md text-white shadow-md"
            >
              Submit
            </button>
            <button
              onClick={handleClear}
              className=" bg-blue-400 px-4 py-1 rounded-md text-white shadow-md"
            >
              Clear
            </button>
          </div>
        </form>
        <div className=" my-4">
          {result && <p>Result: {result}</p>}
          {evenEquation && (
            <p>
              Even: {evenEquation} ={" "}
              {evenEquation
                .split("+")
                .reduce((acc, curr) => acc + parseInt(curr.trim()), 0) * 3}
            </p>
          )}
          {oddEquation && (
            <p>
              Odd: {oddEquation} ={" "}
              {oddEquation
                .split("+")
                .reduce((acc, curr) => acc + parseInt(curr.trim()), 0)}
            </p>
          )}
          {barcodeDigit && <p> Barcode Digit: {barcodeDigit} </p>}
          {checkdigit && <p> Check Digit: {checkdigit} </p>}
        </div>
      </div>
    </div>
  );
}

export default App;
