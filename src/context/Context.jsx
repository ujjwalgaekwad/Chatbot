import { createContext, useState } from "react";
import run from "../api/api";


export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPromot, setRecentPromt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPromt(input)
        const response = await run(input)
        setResultData(response);
        setLoading(false)
        setInput("");
    }

    const contextValue = {
        input,
        recentPromot,
        prevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        setPrevPrompts,
        setRecentPromt,
        setInput,
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}


export default ContextProvider;