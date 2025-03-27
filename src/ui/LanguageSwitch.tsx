import { Dropdown, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import globe from "../assets/new_images/globe.svg";

function LanguageSwitch() {
  const { i18n } = useTranslation();
  
  function onLanguageChange(lng: string) {
    i18n.changeLanguage(lng);
    console.log("lang : ", )
    localStorage.setItem("languegChanger", lng); 
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (i18n.language === "fr" ? "Français" : "Français"),
      onClick: () => onLanguageChange("fr"),
    },
    {
      key: "2",
      label: (i18n.language === "ar" ? "English" : "English"),
      onClick: () => onLanguageChange("en"),
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <div className={`flex items-center cursor-pointer  gap-x-1 ${i18n.language === "fr" ? "md:border-l md:pl-[15px] " : " md:border-r md:pr-[15px]"} border-[#707070]`}>
        <img src={globe} alt="" />
        <span className="max-md:text-[12px] text-[13px]">
        {i18n.language === "fr" ? "Français"  : "English"}
          {/* {i18n.language === "ar" ? "ar" : "en"} */}
        </span>
        {/* <span className="w-[1px] h-4 bg-green-400 border"></span> */}
      </div>
    </Dropdown>
  );
}

export default LanguageSwitch;
