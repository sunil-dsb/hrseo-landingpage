"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdPlayArrow, MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";

interface HeroVideoDialogProps {
  className?: string;
  animationStyle?: "from-center" | "from-top" | "from-bottom" | "fade";
  videoSrc: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}

export function HeroVideoDialog({
  className,
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
}: HeroVideoDialogProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  const animationVariants = {
    "from-center": {
      initial: { scale: 0.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.5, opacity: 0 },
    },
    "from-top": {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 },
    },
    "from-bottom": {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  return (
    <div className={cn("relative cursor-pointer group", className)}>
      {/* Video Thumbnail */}
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden"
        onClick={openVideo}
      >
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F15A29]/10 to-[#D14924]/10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#F15A29] rounded-full flex items-center justify-center">
                <MdPlayArrow className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-muted-foreground font-medium">
                Watch HRSEO in Action
              </p>
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
          <div className="w-16 h-16 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <MdPlayArrow className="w-6 h-6 text-foreground ml-1" />
          </div>
        </div>

        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border" />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              variants={animationVariants[animationStyle]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                onClick={closeVideo}
              >
                <MdClose className="w-5 h-5 text-white" />
              </button>

              {/* Video Iframe */}
              <iframe
                src={videoSrc}
                title="Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
