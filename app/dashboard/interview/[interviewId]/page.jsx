// app/dashboard/interview/[interviewId]/page.jsx
import InterviewClient from "./InterviewClient";

export default function Interview({ params }) {
  return <InterviewClient interviewId={params.interviewId} />;
}
