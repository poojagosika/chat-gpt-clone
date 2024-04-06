import React, { createContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_API_KEY);

  const getAnswers = async (questions) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = questions;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  };

  return (
    <Context.Provider value={{ input, setInput, getAnswers }}>
      {children}
    </Context.Provider>
  );
};
