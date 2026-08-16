import { VscChevronRight } from 'react-icons/vsc'

type PrimaryButtonProps = {
  children: React.ReactNode
  textColor: string
  bgColor: string
  iconColor: string
  onChangeClick?: () => void;
}

const normalizeColor = (value: string) => value.replace(/^[\[]|[\]]$/g, '')

export default function PrimaryButton({ children, textColor, bgColor, iconColor, onChangeClick }: PrimaryButtonProps) {
  return (
    <div
      onClick={onChangeClick}
      className="flex items-center gap-2 rounded-full font-medium capitalize px-6 py-3 text-sm tracking-tight transition hover:opacity-90 w-max cursor-pointer"
      style={{
        backgroundColor: normalizeColor(bgColor),
        color: normalizeColor(textColor),
      }}
    >
      {children}
      <VscChevronRight size={14} className="-mb-1" style={{ color: normalizeColor(iconColor) }} />
    </div>
  )
}
