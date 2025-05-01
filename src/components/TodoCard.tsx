type Props = {
  text: string;
};

export default function TodoCard({ text }: Props) {
  return (
    <div className="bg-gray-500 rounded-2xl flex justify-between items-center p-5">
      <p className="text-lg text-white font-extralight">{text}</p>
      <div className="flex gap-2 px-5">
        <button className="bg-yellow-500 px-4 py-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105">
          Editar
        </button>
        <button className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105">
          Apagar
        </button>
      </div>
    </div>
  );
}
