'use client';
import Button from "../button"
export default function ButtonBar() {
    function handleClick() {
        console.log("Button clicked")
    }
    return (
        <>
            <div className="flex gap-2 py-[6px] pl-4 border-b border-slate-200">
                <Button icon="back" onClick={() => window.history.back()} className=" md:hidden"/>
                <Button icon="heart" onClick={handleClick} className=""/>
                <Button icon="heart" onClick={handleClick} className=""/>
                <Button icon="heart" onClick={handleClick} className=""/>
            </div> 
        </>
    )
}    