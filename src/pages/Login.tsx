import Button from "../components/Button";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="bg-gray-200 flex flex-col justify-center items-center gap-10 w-1/2 h-1/2 rounded-3xl">
        <p className="text-2xl"> Login </p>
 
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username: </label>
              <input
                className="bg-white border rounded-lg p-2 w-full"
                type="text"
                id="username"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Senha: </label>
              <input
                className="bg-white border rounded-lg p-2 w-full"
                type="password"
                id="password"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button text="Voltar" screen="/" />
          <Button text="Criar conta" screen="/register" />
          <Button text="Entrar" screen="/todos" />
        </div>
      </div>
    </div>
  );
}
