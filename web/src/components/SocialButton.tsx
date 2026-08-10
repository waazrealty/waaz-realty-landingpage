import { FaWhatsapp } from "react-icons/fa";
import { VscChevronRight } from "react-icons/vsc";

type SocialButtonProps = {
  socialType: string
  textColor: string
  bgColor: string
}

export default function SocialButton({ socialType, textColor, bgColor }: SocialButtonProps) {
  return (
    <div className={`flex items-center gap-1`}>
      <div className="flex items-center gap-1 font-medium capitalize p-3 bg-[#74C56B] border border-white">
        {socialType === "whatsapp" && (
          <FaWhatsapp size={21} className="text-white"/>
        )}
      </div>
      <div className={`flex items-center gap-2 font-medium capitalize px-6 py-[.77rem] text-${textColor} text-sm tracking-tight font-medium font-serifTwo captialize transition bg-[#74C56B] border border-white`}>
        <span>Send Message</span>
        <VscChevronRight size={14} className="text-white"/>
      </div>
    </div>
  )
}
