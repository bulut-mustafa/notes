'use client';
import Button from "../button";
export const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
];

export default function ButtonBar() {

    function handleClick() {
        console.log("Button clicked")
    }
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <>
            <div className="flex gap-2 py-[6px] pl-4 border-b border-slate-200">
                <Button icon="back" onClick={() => window.history.back()} className=" md:hidden" />
                <Button icon="reminder" onClick={handleClick} className="" />
                {/* <Button icon="new-tag" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative" />
                {isDropdownOpen && (
                    <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-2 w-60 border border-gray-200">

                        <Select
                            className="max-w-xs"
                            label="Favorite Animal"
                            placeholder="Select an animal"
                            selectionMode="multiple"
                        >
                            {animals.map((animal) => (
                                <SelectItem key={animal.key}>{animal.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                )} */}
            </div>
        </>
    )
}



