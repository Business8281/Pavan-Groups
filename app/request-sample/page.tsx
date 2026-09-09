"use client";
import SampleRequest from "@/components/SampleRequest";
import Link from "next/link";

export default function RequestSamplePage() {
  return (
    <div className="bg-white min-h-screen pt-20 text-[#140d0a] selection:bg-[#3e352a] selection:text-white">
      <SampleRequest />
    </div>
  );
}
