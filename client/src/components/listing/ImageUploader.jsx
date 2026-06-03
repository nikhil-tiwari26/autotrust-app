import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

export default function ImageUploader({ onChange }) {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const remove = (idx) => {
    const updated = previews.filter((_, i) => i !== idx);
    setPreviews(updated);
  };

  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-electric-500 transition-colors">
        <FiUpload className="text-2xl text-gray-400 mb-2" />
        <span className="text-gray-400 text-sm">Click to upload images (max 6)</span>
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
      </label>
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button onClick={() => remove(i)} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 text-white hover:bg-red-500">
                <FiX className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
