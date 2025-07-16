import React from "react";

interface FooterProps {
  className?: string;
}

import facebookIcon from "../assets/images/icons/facebook.jpg";
import twitterIcon from "../assets/images/icons/twitter.jpg";
import instagramIcon from "../assets/images/icons/instagram.jpg";

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const aboutLinks = [
    { label: "About Us", href: "#" },
    { label: "Responsible Gaming", href: "#" },
    { label: "Affiliate", href: "#" },
  ];

  const helpLinks = [
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const regulationsLinks = [
    { label: "General Terms and Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "AML & KYC Policy", href: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: facebookIcon, href: "#" },
    { name: "Twitter", icon: twitterIcon, href: "#" },
    { name: "Instagram", icon: instagramIcon, href: "#" },
  ];

  return (
    <footer
      className={` bg-custom-dark border-t border-slate-800 text-white ${className}`}
    >
      <div className="max-w-[1240px] container mx-auto sm:px-12 px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="max-w-[200px]">
            <h3 className="text-base font-semibold mb-4 text-white">About</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="max-w-[200px] lg:ml-20">
            <h3 className="text-base font-semibold mb-4 text-white">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regulations Section */}
          <div className="max-w-[200px] lg:ml-20">
            <h3 className="text-base font-semibold mb-4 text-white">
              Regulations
            </h3>
            <ul className="space-y-2">
              {regulationsLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div className="max-w-[200px] lg:ml-20">
            <h3 className="text-base font-semibold mb-4 text-white">Social</h3>
            <ul className="flex flex-col gap-4">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    key={index}
                    href={social.href}
                    className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors duration-200"
                    title={social.name}
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-4 h-4"
                    />{" "}
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Copyright */}
      <div className="border-t bg-[#2A253A] border-slate-800 py-4 text-center">
        <p className="text-gray-400 text-sm">
          Copyright ©2022, Zorrobet. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
