import { Link } from 'react-router-dom'

interface FooterProps {
  blurb: string
  linkText: string
  linkPath: string
}

const Footer = ({ blurb, linkPath, linkText }: FooterProps) => {
  return (
    <footer className="pb-6 text-center text-gray-500 bg-[#EDF1F3]">
      {blurb}{" "}
      <Link to={linkPath} className="text-blue-600 font-medium underline hover:text-blue-900">{linkText}</Link>
    </footer>
  )
}

export default Footer