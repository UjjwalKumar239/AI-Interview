// app/dashboard/interview/[interviewId]/InterviewClient.jsx
"use client";

import React, { useEffect, useState } from "react";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";

export default function InterviewClient({ interviewId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(`/api/interview/${interviewId}`);
        const data = await res.json();
        const parsed = Array.isArray(data?.data?.jsonMocResp)
          ? data.data.jsonMocResp
          : JSON.parse(data.data?.jsonMocResp || "[]");
        setQuestions(parsed);
      } catch (err) {
        console.error("Failed to load interview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl mb-4">Let's get started</h2>
      <Webcam className="rounded-md mb-6" />

      <h3 className="text-lg font-semibold mb-2">Questions JSON:</h3>
      <pre className="bg-gray-100 p-4 rounded max-w-lg text-sm text-left whitespace-pre-wrap">
        {loading ? "Loading..." : JSON.stringify(questions, null, 2)}
      </pre>
    </div>
  );
}
