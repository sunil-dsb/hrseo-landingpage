import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export function HeroVideoSection() {
  return (
    <div className="relative px-6 md:px-24 mt-9">
      <div className="relative max-w-6xl mx-auto shadow-xl rounded-2xl overflow-hidden">
        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc="https://youtu.be/SeS00eJnguo?si=xUqj8MReFyLG9NPO"
          thumbnailSrc="https://cdn.dribbble.com/userupload/43922134/file/original-e6a3a73a1545162c075ef18d636a4616.png?resize=2048x1536&vertical=center"
          thumbnailAlt="HRSEO Demo Video"
        />
      </div>
    </div>
  );
}