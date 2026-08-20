import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface SelectProps {
  name?: string;
  value?: string | null;
  title?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  recordList?: string[] | null;
  onChangeText?: (value: string) => void;
}

const SelectAltField: React.FC<SelectProps> = ({
  recordList = [],
  onChangeText,
  placeholder,
  title,
  value,
  className,
}) => {
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(value||null);

  const componentRef = useRef<HTMLDivElement>(null);
  const showRef = useRef(show);

  useEffect(() => {
    showRef.current = show;
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        if (showRef.current) {
          setShow(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setShow(false);
    if (onChangeText) {
      onChangeText(value);
    }
  };

  useEffect(() => {
    setSelectedValue(value ?? null)
  }, [value]);

  return (
    <div ref={componentRef} className={`${className}  flex flex-col relative text-sm w-full`}>
      {title && <div className="pb-1 text-sm italic tracking-wide">{title}</div>}      

      <div
        onClick={() => setShow(!show)}
        className="flex flex-row justify-between items-center w-full bg-[#ECEFF3] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#506437] focus:ring-2 focus:ring-[#E6ECD9] rounded-lg cursor-pointer"
      >
        <span className={`text-sm line-clamp-1 capitalize ${selectedValue ? "text-black" : "text-gray-500"}`}>{selectedValue || placeholder}</span>
        
        <MdKeyboardArrowDown className={`text-xl ${show ? 'hidden' : 'block'}`} />
        <MdKeyboardArrowUp className={`text-xl ${show ? 'block' : 'hidden'}`} />
      </div>
      {show && (
        <div className="flex flex-col bg-black/80 shadow-2xl w-full max-h-40 overflow-auto absolute top-14 z-10 scrollbar-none rounded-2xl">
          {recordList && recordList.length === 0 ? (
            <div className="text-center text-gray-500 py-2">No options</div>
          ) : (
            recordList &&
            recordList.map((el) => (
              <div
                key={el}
                onClick={() => handleSelect(el)}
                className={`${
                  el === recordList.at(-1) ? "" : "border-b border-[#616D43]"
                } flex flex-row capitalize justify-between items-center text-primary px-3 py-2 cursor-pointer text-white hover:bg-[#616D43]  hover:text-black ${
                  selectedValue === el ? "cursor-not-allowed text-[#616D43]" : ""
                }`}
              >
                {el}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SelectAltField;
