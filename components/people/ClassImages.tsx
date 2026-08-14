const CLASS_IMAGES: Record<string, string> = {
   barbarian: "/img/lan-blade.png",
   bard: "/img/lan-gold.png",
   cleric: "/img/lan-wizard.png",
   druid: "/img/lan-wizard.png",
   fighter: "/img/peter-blade.png",
   monk: "/img/lan-blade.png",
   paladin: "/img/peter-blade.png",
   ranger: "/img/peter-blade.png",
   rogue: "/img/lan-gold.png",
   sorcerer: "/img/lan-wizard.png",
   warlock: "/img/lan-wizard.png",
   wizard: "/img/lan-wizard.png",
};

export default function ClassImages({ className }: { className: string }) {
   const src = CLASS_IMAGES[className];
   if (!src) return null;

   return (
      <img
         src={src}
         alt={className}
         className="h-40 w-fit object-contain"
      />
   );
}
