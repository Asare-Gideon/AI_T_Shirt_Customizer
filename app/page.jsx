"use client";
import CanvasModel from "@/canvas";
import Customizer from "@/screens/customizer/Customizer";
import HomeContent from "@/screens/home/Home";
import React from "react";

export default function Home() {
  return (
    <main className="transition-all ease-in app">
      <HomeContent />
      <CanvasModel />
      <Customizer />
    </main>
  );
}
