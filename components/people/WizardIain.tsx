import { assetPath } from "@/lib/asset-path";

export default function WizardIain({ flip=false, className }: { flip?:boolean, className:string|undefined }) {
   return (
      <div className={`flex flex-col w-fit ${className}`}>
         <img
            src={assetPath("/img/lan-wizard.png")}
            className={`h-full w-fit object-contain ${flip ? "ml-[17%]" : "ml-[4%]"}`}
         />
         <img
            src={assetPath("/img/sticks.png")}
            className={`h-full w-fit object-contain ${flip && "scale-x-[-1]"}`}
         />
      </div>
   )
}