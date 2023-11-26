  export const getColor = (cardColor) => {
    let color = "border-slate-700 ";
    switch (cardColor.toLowerCase()) {
      case "html":
        color = "border-[#ff7473] text-[#ff7473] ";
        return color;
      case "css":
        color = "border-[#38b7ea] text-[#38b7ea] ";
        return color;
      case "javascript":
        color = "border-[#ffc952] text-[#ffc952] ";
        return color;
      case "react":
        color = "border-[#087ea4] text-[#087ea4] ";
        return color;
      case "nodejs":
        color = " border-[#026e00] text-[#026e00] ";
        return color;
    }
    return color;
};
  
  export const getColorText = (bg) => {
    let color = `bg-gray-700`;

    switch (bg) {
      case "html":
        color = `bg-[#ff7473]`;
        return color;
      case "css":
        color = `bg-[#38b7ea]`;
        return color;
      case "javascript":
        color = ` bg-[#ffc952]`;
        return color;
      case "react":
        color = `bg-[#087ea4]`;
        return color;
      case "nodejs":
        color = `bg-[#026e00]`;
        return color;
    }
    return color;
  };
  export const borderColor = (bg) => {
    let color = `border-gray-700`;

    switch (bg) {
      case "framework":
        color = `border-[#38b7ea]`;
        return color;
      case "css":
        color = `border-[#38b7ea]`;
        return color;
      case "javascript":
        color = ` border-[#ffc952]`;
        return color;
      case "react":
        color = `border-[#087ea4]`;
        return color;
      case "nodejs":
        color = `border-[#026e00]`;
        return color;
    }
    return color;
  };