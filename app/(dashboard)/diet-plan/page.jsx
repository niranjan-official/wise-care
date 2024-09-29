import { dietPlan, cleanDietPlan } from "@/app/Functions";
import React from "react";

const page = async () => {
  const data = await dietPlan();
  const cleanedData = cleanDietPlan(data.data);
  console.log(cleanedData);

  const formattedContent = cleanedData.split("\n").map((line, index) => (
    <p
      key={index}
      className={
        line.startsWith("*")
          ? "bullet"
          : line.startsWith("1.")
            ? "numbered"
            : ""
      }
    >
      {line}
    </p>
  ));

  return (
    <div className="dietary-plan p-4 bg-slate-200">
      <h1 className="text-2xl font-semibold">Dietary Plan</h1>
      <div className="p-2 font-medium pb-20">{formattedContent}</div>
    </div>
  );
};

export default page;
