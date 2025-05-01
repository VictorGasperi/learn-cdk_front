import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  screen?: string;
};

export default function Button({ text, screen }: Props) {

    const navigate = useNavigate()

    return(

        <>
            <button onClick={() => screen && navigate( screen ) } className="px-3 py-2 font-extralight cursor-pointer text-white rounded-2xl bg-gray-500">{text}  </ button>
        </>

    )

}
