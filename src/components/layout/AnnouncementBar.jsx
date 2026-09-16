import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#3f4a29] text-white text-center py-2 px-4 text-xs sm:text-sm">
      <div className="flex items-center justify-center gap-2">
        <Sparkles size={14} />

        <span>
          Pure Ingredients • Traditional Goodness •
          Free Shipping above ₹999
        </span>
      </div>
    </div>
  );
}