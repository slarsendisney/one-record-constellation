"use client";
import { Guide, GuideStep } from "@/components/guide";
import { StepOne } from "@/components/guide-steps/StepOne";
import { StepTwo } from "@/components/guide-steps/StepTwo";
import { StepThree } from "@/components/guide-steps/StepThree";
import { DataIsland } from "@/components/guide-steps/DataIsland";
import { StepFour } from "@/components/guide-steps/StepFour";
import { StepFive } from "@/components/guide-steps/StepFive";

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
        <GuideStep title="Send Logistics Events">
          <StepFour />
        </GuideStep>
        <GuideStep title="Next Steps">
          <StepFive />
        </GuideStep>
      </Guide>
    </div>
  );
}
