import { Dispatch, SetStateAction } from "react";
import { postAuthenticated } from "./auth";

export default function handleSubmit(
    phase: number,
    length: number, 
    setMessage: Dispatch<SetStateAction<string>>,
    setPending: Dispatch<SetStateAction<boolean>>,
    setMessageColor: Dispatch<SetStateAction<string>>,
    setCount: Dispatch<SetStateAction<number>>,
    setTotalCount: Dispatch<SetStateAction<number>>,
    setHasDone: Dispatch<SetStateAction<boolean>>
) {
    return async function submit(formData: FormData) {
        setPending(true);
        setMessage('正在送出...');
        setMessageColor('info');
        const answer: (FormDataEntryValue | null)[] = [];
        for (let i = 1; i <= length; i++)
            answer.push(formData.get(i.toString()));
        for (const ans of answer)
            if (ans === '') {
                setPending(false);
                setMessage('五格都要填寫！');
                setMessageColor('warning');
                return;
            }
        try {
            const res = await postAuthenticated(`guess/${phase}`, { answer: answer })
            setPending(false);
            setMessage(res.data.message);
            setMessageColor(['error', 'warning', 'success'][res.data.result]);
            setCount(res.data.count);
            setTotalCount(res.data.total_stamp);
            if (res.data.result === 2)
                setHasDone(true);
        }
        catch (exception) {
            setPending(false);
            setMessage('系統錯誤');
            setMessageColor('error');
            setCount(0);
            setTotalCount(0);
        }
    }
}