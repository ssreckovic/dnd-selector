import { assetPath } from "@/lib/asset-path";

export default function WizardIain({ flip=false, className, headClass }: { flip?:boolean, className:string|undefined, headClass?: string }) {
   return (
      <div className={`flex flex-col w-fit ${className}`}>
         <img
            src={assetPath("/img/lan-wizard.png")}
            className={`h-full w-fit object-contain ${flip ? "ml-[17%]" : "ml-[4%]"} ${headClass || ""}`}
         />
         <img
            src={assetPath("/img/sticks.png")}
            className={`h-full w-fit object-contain ${flip && "scale-x-[-1]"}`}
         />
      </div>
   )
}