"use client";
import { data } from "@/listData";
import Image from "next/image";
import React, {  ChangeEvent, useState } from "react";

interface Item {
  name: string;
  img: string;
  email: string;
  items: string[];
}

const Chips = () => {
  const [items, setItems] = useState<Item[]>(data);
  const [input, setInput] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<
    { name: string; img: string }[]
  >([]);
  const [highlightedChip, setHighlightedChip] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsListOpen(true);

    if (e.target.value === "" && selectedTag.length > 0) {
      setHighlightedChip(selectedTag[selectedTag.length - 1].name);
    } else {
      setHighlightedChip(null);
    }
  };

  const handleTag = (selectedItem: Item) => {
    setSelectedTag([
      ...selectedTag,
      { name: selectedItem.name, img: selectedItem.img },
    ]);
    setInput("");
    setIsListOpen(false);
  };

  const handleBackspace = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && input === "" && highlightedChip) {
      setSelectedTag(
        selectedTag.filter((chip) => chip.name !== highlightedChip)
      );
      setHighlightedChip(null);
    }
  };

  const removeTag = (tag: { name: string; img: string }) => {
    setSelectedTag(selectedTag.filter((t) => t !== tag));
  };

  const filteredItems = items.filter(
    (item) => !selectedTag.some((tag) => tag.name === item.name)
  );

  return (
    <>
      <div
        className="w-screen h-screen overflow-hidden"
        onClick={() => setIsListOpen(false)}
      >
        <h1 className="text-center text-3xl mt-2 text-blue-500">Pick Users</h1>
        <div className="flex justify-center mt-5">
          <div className="w-1/2 h-48 p-2 relative">
            <div className="w-auto flex flex-wrap h-auto mt-2 border-b-4 border-blue-800 space-x-2 p-1 gap-2">
              {selectedTag.map((tag, index) => (
                <span
                  key={index}
                  className={`flex justify-center items-center gap-1  bg-gray-200 rounded-xl px-2 ${
                    highlightedChip === tag.name
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                >
                  <Image
                    className="rounded-full w-8 h-8"
                    src={tag.img}
                    alt=""
                    width={30}
                    height={30}
                  />
                  {tag.name} <button onClick={() => removeTag(tag)}>x</button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add New User"
                className="bg-white outline-none border-none"
                value={input}
                onChange={handleInput}
                onKeyDown={handleBackspace}
              />
            </div>
            {isListOpen && (
              <ul className="absolute z-10 w-96 bg-white shadow-md mt-6 rounded-md max-h-auto overflow-auto max-h-60">
                {filteredItems.map((item: Item, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                    onClick={() => handleTag(item)}
                  >
                    <div className="flex items-center gap-10 justify-start text-left">
                      <Image
                        className="rounded-full w-10 h-10"
                        src={item.img}
                        alt=""
                        width={30}
                        height={30}
                      />
                      <p className="flex">{item.name}</p>
                      <span className="text-sm">{item.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chips;
