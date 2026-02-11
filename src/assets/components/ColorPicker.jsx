import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#108981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={14} />
        <span className="max-lg:hidden">Colors</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 z-10 bg-white rounded-lg border border-gray-200 shadow-md p-3 flex flex-wrap gap-3 w-56">
          {colors.map((color) => (
            <div
              key={color.name}
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className={`relative p-2 cursor-pointer transition-all ${selectedColor === color.value ? "border-purple-300 bg-purple-100" : "text-gray-300 hover:text-gray-500 hover:bg-gray-100 border-gray-300"}`}
            >
              {selectedColor === color.value && (
                <div className="absolute top-2 right-2">
                  <div className="size-4 rounded-full flex items-center justify-center" style={{background:color.value}}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              <div className="flex-col items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color.value }}
                />
                <h3 className="text-sm font-medium text-gray-600">
                  {color.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
