import Button from "../components/Button";

export default function Initial() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex flex-col w-1/2 h-1/2 justify-around items-center gap-6 p-3 rounded-xl bg-gray-200">

        <p className="text-start text-3xl">Meu app de "todos"</p>

        <Button text='Ir para login' screen="/login" />

      </div>
    </div>
  );
}
