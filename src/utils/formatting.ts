export const format = (number: number) => number.toLocaleString("nb-NO");
export const formatPlace = (place: string): string => {
  switch (place) {
    case "Europe":
      return "Europa";
    case "Africa":
      return "Afrika"
    case "South America":
      return "Sør-Amerika"
    case "North-America":
      return "Nord-Amerika"
  }

  return place;
};
