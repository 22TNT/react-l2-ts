import React from 'react';
import {
    useState,
    useEffect,
    useRef,
} from "react";
import './App.css';

type RangeCounterTypes = {
    initialCount: number;
    initialIncrement: number;
}

function RangeCounter({initialCount, initialIncrement}: RangeCounterTypes) {
    const [increment, setIncrement] = useState(initialIncrement);
    const [count, setCount] = useState(initialCount);

    function DecrementHandler() {
        return (count - increment > 0) ? setCount(count => count - increment) : {};
    }

    return <>
        <input type="range"
               min={1}
               max={10}
               value={increment}
               onChange={(e) => setIncrement(parseInt(e.target.value))}/>
        <br/>
        {increment}
        <br/>
        <button onClick={DecrementHandler}>
            -
        </button>
        {count}
        <button onClick={() => setCount(count => count + increment)}>
            +
        </button>
    </>
}

type RangeTimerTypes = {
    initialTime: number;
    initialIncrement: number;
}

function RangeTimer({initialTime, initialIncrement}: RangeTimerTypes) {
    const [time, setTime] = useState(initialTime);
    const [increment, setIncrement] = useState(initialIncrement);
    const incrementContainer = useRef(initialIncrement);

    function TimeHandler() {
        return setTime(time => time + incrementContainer.current);
    }

    useEffect(() => {
        const timerId = setInterval(
            TimeHandler, 1000
        );
        return () => clearInterval(timerId);
    }, []);
    return <>
        <input type="range"
               min={1}
               max={10}
               id={"range"}
               value={increment}
               onChange={(e) =>
               {
                   incrementContainer.current = parseInt(e.target.value);
                   setIncrement(incrementContainer.current);
               }}/>
        <br/>
        {increment}
        <br/>
        <span>{time}</span>
    </>
}

type CountdownTimerTypes = {
    initialTime: number;
}

function CountdownTimer({initialTime}: CountdownTimerTypes) {
    const [time, setTime] = useState(initialTime);
    useEffect(() => {
        if (time !== 0)
        {
            const timerId = setInterval(() => setTime(time => time - 1), 1000);
            return () => clearInterval(timerId);
        }
    }, [time]);
    return <>{time}</>
}

// TODO: fix the generator triggering in pairs
function PrimeNumbers(){
    const [output, setOutput] = useState("");

    function IsPrime(number: number){
        const sqrt = Math.sqrt(number);
        for (let i = 2; i<=sqrt; i++){
            if (number % i === 0){
                return false;
            }
        }
        return true;
    }
    function* PrimeGenerator(){
        let number = 2;
        while (true){
            if (IsPrime(number)){
                yield number;
                console.log(number)
            }
            number++;
        }
    }

    const primeGenerator = PrimeGenerator();
    useEffect(() => {
        setInterval(() => {
            let next = primeGenerator.next().value;
            setOutput(output => output + (next + ", ") ?? (0 + ", "));
        }, 1000);
    }, []);

    return <>{output.toString()}</>

}

function App() {
    return (
        <div className="App">
            <RangeCounter initialCount={0} initialIncrement={1}/>
            <br/><br/>
            <RangeTimer initialTime={0} initialIncrement={1}/>
            <br/><br/>
            <CountdownTimer initialTime={10}/>
            <br/><br/>
            <PrimeNumbers/>
        </div>
    );
}

export default App;
