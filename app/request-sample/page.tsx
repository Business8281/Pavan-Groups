"use client";
import SampleRequest from "@/components/SampleRequest";
import Link from "next/link";

export default function RequestSamplePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen pt-16 sm:pt-20 text-[#003049] selection:bg-[#ff5500] selection:text-white">
      <SampleRequest />
    </div>
  );
}
