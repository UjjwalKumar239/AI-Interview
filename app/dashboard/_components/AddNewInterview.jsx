"use client";

import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { isSignedIn, user, isLoaded } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setQuestions([]);
    setErrorMessage("");

    const inputPrompt = `Generate ${
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5
    } mock interview questions and answers for the position of "${jobPosition}" based on the job description and experience below.
    
    Job Description: ${jobDesc}  
    Candidate experience: ${jobExperience} years
    
    Return only a JSON array of objects like this:  
    [
      { "question": "Question 1?", "answer": "Answer 1" },
      { "question": "Question 2?", "answer": "Answer 2" }
    ]  
    
    Do not include any text or explanation outside the JSON.`;

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      });

      const result = await ai.models.generateContentStream({
        model: "models/gemini-1.5-flash",
        config: {
          responseMimeType: "text/plain",
        },
        contents: [
          {
            role: "user",
            parts: [{ text: inputPrompt }],
          },
        ],
      });

      let fullText = "";
      for await (const chunk of result) {
        const part = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (part) fullText += part;
      }

      const cleanedText = fullText
        .replace("```json", "")
        .replace("```", "")
        .trim();

      const parsedQuestions = JSON.parse(cleanedText);
      setQuestions(parsedQuestions);

      // Save to database
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: jobPosition,
          description: jobDesc,
          experience: jobExperience,
          questions: parsedQuestions,
          clientEmail: userEmail,
        }),
      });

      const resultData = await response.json();
      if (!resultData.success) {
        setErrorMessage("DB save failed: " + resultData.error);
        setLoading(false);
        return;
      }

      const mockId = resultData.data?.mockId;
      if (!mockId) {
        setErrorMessage("mockId not returned from server");
        setLoading(false);
        return;
      }

      router.push(`/dashboard/interview/${mockId}`);
    } catch (error) {
      console.error("❌ Error:", error);
      setErrorMessage("Something went wrong. Try again.");
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative animate-fadeIn overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Interview
            </h2>

            <form className="space-y-4" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Job Position"
                className="w-full border px-4 py-2 rounded"
                onChange={(e) => setJobPosition(e.target.value)}
                required
              />
              <textarea
                placeholder="Job Description"
                rows={3}
                className="w-full border px-4 py-2 rounded"
                onChange={(e) => setJobDesc(e.target.value)}
                required
              ></textarea>
              <input
                type="number"
                placeholder="Years of Experience"
                className="w-full border px-4 py-2 rounded"
                onChange={(e) => setJobExperience(e.target.value)}
                required
              />

              {errorMessage && (
                <p className="text-red-600 text-sm">{errorMessage}</p>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded text-white ${
                    loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </form>

            {questions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Generated Questions:
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewInterview;
