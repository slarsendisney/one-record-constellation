"use client";
import { Guide, GuideStep } from "@/components/guide";
import { StepOne } from "@/components/guide-steps/StepOne";
import { StepTwo } from "@/components/guide-steps/StepTwo";
import { StepThree } from "@/components/guide-steps/StepThree";
import { DataIsland } from "@/components/guide-steps/DataIsland";

export default function GuidePage() {
  return (
    <div className="p-10">
      <Guide sidebar={<DataIsland />}>
        <GuideStep title="Personalize your guide">
          <StepOne />
        </GuideStep>
        <GuideStep title="Authenticate">
          <StepTwo />
        </GuideStep>
        <GuideStep title="Define Logistics Objects">
          <StepThree />
        </GuideStep>
      </Guide>
    </div>
  );
}
