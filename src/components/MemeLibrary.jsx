import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "lucide-react"; // adjust import if you already have <Image />

function MemeLibrary({ categories, memeLibrary }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="meme-library">
      <h2 className="section-title">
        <Image className="section-icon" />
        Meme Library
      </h2>

      <div className="meme-list">
        {categories.map((cat, index) => (
          <div key={index} className="meme-item">
            {/* Header row */}
            <div
              className="meme-item-content cursor-pointer"
              onClick={() => toggleCategory(index)}
            >
              <div className="meme-info">
                <div className="meme-item-name">{cat.name}</div>
                <div className="meme-item-desc">{cat.desc}</div>
              </div>
              <div className={`meme-type-badge ${cat.color}`}>
                {cat.type}
              </div>
            </div>

            {/* Animated dropdown */}
            <AnimatePresence initial={false}>
              {openCategory === index && (
                <motion.div
                  className="meme-thumbnails"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-2">
                    {memeLibrary[cat.type].slice(0, 15).map((file, idx) => (
                      <img
                        key={idx}
                        src={`/memes/${cat.type}/${file}`}
                        alt={file}
                        className="meme-thumbnail rounded-lg shadow-sm hover:scale-105 transition-transform"
                      />
                    ))}
                    {memeLibrary[cat.type].length > 15 && (
                      <span className="text-sm text-gray-500">
                        +{memeLibrary[cat.type].length - 15} more
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemeLibrary;
