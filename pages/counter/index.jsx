import CounterButtons from "@/components/CounterButtons";
import { useSelector } from "react-redux";

export default function Counter() {
  const counterValue = useSelector((state) => state.counter.count);

  return (
    <>
      <CounterButtons counterValue={counterValue} />
    </>
  );
}
