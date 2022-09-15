interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  adsCount: number;
}

export function GameCard({ id, title, imageUrl, adsCount }: GameCardProps) {
  return (
    <a href="" className="relative bg-violet-500 rounded-lg overflow-hidden">
      <img src={imageUrl} title={title} className="w-44" />

      <div className="w-full bg-subtitle-gradient pb-4 px-4 pt-16 absolute bottom-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-500 text-sm block">{adsCount} anúncios</span>
      </div>
    </a>
  );
}
