import Button from "../components/Button";

export default function Register() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="bg-gray-200 flex flex-col justify-center items-center gap-10 w-1/2 min-h-fit h-1/2 p-5 rounded-3xl">
        <p className="text-2xl"> Criar uma conta </p>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg p-2 w-full"
                type="text"
                id="username"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">E-mail: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg p-2 w-full"
                type="text"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Senha: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg p-2 w-full"
                type="password"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="re-password">Confirmar senha: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg p-2 w-full"
                type="password"
                id="re-password"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button text="Voltar" screen="/login" />
          <Button text="Criar conta" screen="/register" />
          <Button text="Entrar" screen="/todos" />
        </div>
      </div>
    </div>
  );
}
