import Button from "../components/Button";
import TodoCard from "../components/TodoCard";

export default function Todos() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">

      <div className="flex flex-col w-2/3 h-1/2 overflow-y-auto justify-around items-center gap-6 p-3 rounded-xl bg-gray-200">
        <p className="text-start text-3xl">Meu app de "todos"</p>

        <div className="flex w-2/3 justify-between items-center">
        <input className="bg-white w-5/6 p-2 border-1 rounded-lg" type="text" />
        <button className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105">Adicionar</button>
        </div>

        <div className="flex flex-col gap-3 w-2/3">
          <TodoCard text="text" />
          
        </div>

        <Button text="Sair" screen="/" />
      </div>
    </div>
  );
}
