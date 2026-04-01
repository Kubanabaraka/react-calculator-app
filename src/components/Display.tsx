type DisplayProps = {
  value: string;
};

export default function Display({ value }: DisplayProps) {
  return (
    <div className="h-32 bg-[#7f8291] px-4 text-right text-[50px] leading-16 font-light text-white">
      {value}
    </div>
  );
}
